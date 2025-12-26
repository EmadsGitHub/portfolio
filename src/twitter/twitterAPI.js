// Twitter API utility functions
const TWITTER_API_BASE = 'https://api.twitter.com/2';

class TwitterAPI {
  constructor(bearerToken) {
    this.bearerToken = bearerToken;
  }

  async getUserId(username) {
    const response = await fetch(
      `${TWITTER_API_BASE}/users/by/username/${username}`,
      {
        headers: {
          'Authorization': `Bearer ${this.bearerToken}`,
          'Content-Type': 'application/json',
        },
      }
    );
    
    if (!response.ok) {
      throw new Error(`Failed to get user ID: ${response.statusText}`);
    }
    
    const data = await response.json();
    return data.data.id;
  }

  async getUserTweets(userId, maxResults = 100) {
    const response = await fetch(
      `${TWITTER_API_BASE}/users/${userId}/tweets?` +
      `tweet.fields=public_metrics,created_at,text&` +
      `max_results=${maxResults}`,
      {
        headers: {
          'Authorization': `Bearer ${this.bearerToken}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to get tweets: ${response.statusText}`);
    }

    const data = await response.json();
    return data.data || [];
  }

  async getMostLikedTweets(username, maxResults = 5) {
    // Note: This now fetches recent tweets (not most liked) excluding replies
    try {
      // Check if we're in development and have a local proxy server
      const isDevelopment = process.env.NODE_ENV === 'development';
      const proxyUrl = isDevelopment ? 'http://localhost:3002' : '';
      
      if (proxyUrl) {
        // Use local proxy server to avoid CORS
        const response = await fetch(`${proxyUrl}/api/twitter/tweets/${username}`);
        
        if (!response.ok) {
          throw new Error(`Proxy server error: ${response.statusText}`);
        }
        
        const tweets = await response.json();
        return tweets.slice(0, maxResults);
      } else {
        // Direct API call (will likely fail due to CORS in browser)
        const userId = await this.getUserId(username);
        const tweets = await this.getUserTweets(userId, maxResults);
        
        // Return recent tweets in chronological order (already sorted by API)
        const recentTweets = tweets
          .map(tweet => ({
            id: tweet.id,
            text: tweet.text,
            likes: tweet.public_metrics.like_count,
            retweets: tweet.public_metrics.retweet_count,
            replies: tweet.public_metrics.reply_count,
            created_at: tweet.created_at,
            url: `https://twitter.com/${username}/status/${tweet.id}`
          }));

        return recentTweets;
      }
    } catch (error) {
      console.error('Error fetching tweets:', error);
      throw error; // Re-throw to handle in component
    }
  }
}

export default TwitterAPI;