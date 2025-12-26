// Twitter Proxy Server
// This server handles Twitter API calls to avoid CORS issues
// Related files: src/twitter/
const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3002;

// Simple in-memory cache to reduce API calls
const cache = new Map();
const CACHE_DURATION = 15 * 60 * 1000; // 15 minutes

// Enable CORS for your React app
app.use(cors({
  origin: 'http://localhost:3001' // Your React app URL
}));

app.use(express.json());

// Twitter API proxy endpoint
app.get('/api/twitter/tweets/:username', async (req, res) => {
  const { username } = req.params;
  const cacheKey = `tweets_${username}`;
  
  try {
    const bearerToken = process.env.REACT_APP_TWITTER_BEARER_TOKEN;

    if (!bearerToken) {
      return res.status(401).json({ error: 'Twitter Bearer Token not configured' });
    }

    // Check cache first
    const cached = cache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
      console.log('Returning cached tweets for', username);
      return res.json(cached.data);
    }

    // Get user ID first
    const userResponse = await fetch(
      `https://api.twitter.com/2/users/by/username/${username}`,
      {
        headers: {
          'Authorization': `Bearer ${bearerToken}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (!userResponse.ok) {
      throw new Error(`Failed to get user ID: ${userResponse.statusText}`);
    }

    const userData = await userResponse.json();
    const userId = userData.data.id;

    // Get user's tweets (exclude replies, get only original tweets)
    const tweetsResponse = await fetch(
      `https://api.twitter.com/2/users/${userId}/tweets?` +
      `tweet.fields=public_metrics,created_at,text,attachments&` +
      `expansions=attachments.media_keys&` +
      `media.fields=type,url,preview_image_url&` +
      `exclude=replies&` +
      `max_results=5`,
      {
        headers: {
          'Authorization': `Bearer ${bearerToken}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (!tweetsResponse.ok) {
      throw new Error(`Failed to get tweets: ${tweetsResponse.statusText}`);
    }

    const tweetsData = await tweetsResponse.json();
    const tweets = tweetsData.data || [];
    const media = tweetsData.includes?.media || [];

    // Create a media lookup map
    const mediaMap = {};
    media.forEach(m => {
      mediaMap[m.media_key] = m;
    });

    // Return tweets in chronological order (most recent first - already sorted by Twitter API)
    const recentTweets = tweets
      .map(tweet => {
        // Get media attachments for this tweet
        const tweetMedia = [];
        if (tweet.attachments?.media_keys) {
          tweet.attachments.media_keys.forEach(key => {
            const mediaItem = mediaMap[key];
            if (mediaItem) {
              tweetMedia.push({
                type: mediaItem.type,
                url: mediaItem.url || mediaItem.preview_image_url,
                preview_image_url: mediaItem.preview_image_url
              });
            }
          });
        }

        return {
          id: tweet.id,
          text: tweet.text,
          likes: tweet.public_metrics.like_count,
          retweets: tweet.public_metrics.retweet_count,
          replies: tweet.public_metrics.reply_count,
          created_at: tweet.created_at,
          url: `https://twitter.com/${username}/status/${tweet.id}`,
          media: tweetMedia
        };
      });

    // Cache the results
    cache.set(cacheKey, {
      data: recentTweets,
      timestamp: Date.now()
    });

    res.json(recentTweets);
  } catch (error) {
    console.error('Twitter API Error:', error);
    
    // If rate limited, return cached data if available
    if (error.message.includes('Too Many Requests')) {
      const cached = cache.get(cacheKey);
      if (cached) {
        console.log('Rate limited, returning cached tweets for', username);
        return res.json(cached.data);
      }
    }
    
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Twitter proxy server running on port ${PORT}`);
});

module.exports = app;