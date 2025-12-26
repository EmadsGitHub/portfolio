// Twitter Proxy Server
// This server handles Twitter API calls to avoid CORS issues
// Related files: src/twitter/
const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Enable CORS for your React app
app.use(cors({
  origin: 'http://localhost:3000' // Your React app URL
}));

app.use(express.json());

// Twitter API proxy endpoint
app.get('/api/twitter/tweets/:username', async (req, res) => {
  try {
    const { username } = req.params;
    const bearerToken = process.env.REACT_APP_TWITTER_BEARER_TOKEN;

    if (!bearerToken) {
      return res.status(401).json({ error: 'Twitter Bearer Token not configured' });
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

    // Get user's tweets
    const tweetsResponse = await fetch(
      `https://api.twitter.com/2/users/${userId}/tweets?` +
      `tweet.fields=public_metrics,created_at,text&` +
      `max_results=100`,
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

    // Sort by like count and return top tweets
    const sortedTweets = tweets
      .sort((a, b) => b.public_metrics.like_count - a.public_metrics.like_count)
      .slice(0, 10)
      .map(tweet => ({
        id: tweet.id,
        text: tweet.text,
        likes: tweet.public_metrics.like_count,
        retweets: tweet.public_metrics.retweet_count,
        replies: tweet.public_metrics.reply_count,
        created_at: tweet.created_at,
        url: `https://twitter.com/${username}/status/${tweet.id}`
      }));

    res.json(sortedTweets);
  } catch (error) {
    console.error('Twitter API Error:', error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Twitter proxy server running on port ${PORT}`);
});

module.exports = app;