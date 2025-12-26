import React, { useState, useEffect } from 'react';
import { FaHeart, FaRetweet, FaReply, FaChevronLeft, FaChevronRight, FaTimes } from 'react-icons/fa';
import TwitterAPI from './twitterAPI';

export default function TwitterViewer({ isOpen, onClose, isEmbedded = false }) {
  const [tweets, setTweets] = useState([]);
  const [currentTweetIndex, setCurrentTweetIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isOpen || isEmbedded) {
      fetchTweets();
    }
  }, [isOpen, isEmbedded]);

  const fetchTweets = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Check if we have a bearer token
      if (!process.env.REACT_APP_TWITTER_BEARER_TOKEN || process.env.REACT_APP_TWITTER_BEARER_TOKEN === '') {
        // Fall back to mock data if no token
        console.warn('No Twitter Bearer Token found, using mock data');
        const mockTweets = [
          {
            id: '1',
            text: 'Just finished debugging a complex CAN protocol issue at Geotab! The satisfaction of solving embedded systems problems never gets old 🚗⚡',
            likes: 45,
            retweets: 12,
            replies: 8,
            created_at: '2024-12-20T10:30:00.000Z',
            url: 'https://twitter.com/emadddd_r/status/1',
            media: [
              {
                type: 'photo',
                url: './img/geotab.png',
                preview_image_url: './img/geotab.png'
              }
            ]
          },
          {
            id: '2',
            text: 'Working on STM32 firmware for UW Formula Electric. PID controllers are beautiful when they work perfectly 🏎️ #EmbeddedSystems #UWFE',
            likes: 38,
            retweets: 15,
            replies: 6,
            created_at: '2024-12-18T14:22:00.000Z',
            url: 'https://twitter.com/emadddd_r/status/2',
            media: [
              {
                type: 'photo',
                url: './img/me_racing.jpeg',
                preview_image_url: './img/me_racing.jpeg'
              }
            ]
          },
          {
            id: '3',
            text: 'Excited to share that our team won first place at HackThe6ix with SAGE-Rover! AI-powered disaster relief robotics 🤖🏆',
            likes: 67,
            retweets: 23,
            replies: 14,
            created_at: '2024-12-15T09:45:00.000Z',
            url: 'https://twitter.com/emadddd_r/status/3',
            media: [
              {
                type: 'photo',
                url: './img/hackthe6ixrobot.png',
                preview_image_url: './img/hackthe6ixrobot.png'
              }
            ]
          },
          {
            id: '4',
            text: 'PCB design session with Altium Designer. There\'s something therapeutic about routing traces perfectly ⚡🔌',
            likes: 29,
            retweets: 8,
            replies: 4,
            created_at: '2024-12-12T16:18:00.000Z',
            url: 'https://twitter.com/emadddd_r/status/4'
          },
          {
            id: '5',
            text: 'Late night coding session working on TrackMyThreads. React Native + OpenCV + ESP32 = magic ✨ #FullStack #IoT',
            likes: 52,
            retweets: 18,
            replies: 11,
            created_at: '2024-12-10T23:30:00.000Z',
            url: 'https://twitter.com/emadddd_r/status/5'
          }
        ];
        // Mock tweets are already in chronological order (most recent first)
        const recentTweets = mockTweets.slice(0, 5);
        setTweets(recentTweets);
        setCurrentTweetIndex(0);
        return;
      }

      // Use real Twitter API
      try {
        const api = new TwitterAPI(process.env.REACT_APP_TWITTER_BEARER_TOKEN);
        const recentTweets = await api.getMostLikedTweets(
          process.env.REACT_APP_TWITTER_USERNAME || 'emadddd_r', 
          5
        );
        setTweets(recentTweets);
        setCurrentTweetIndex(0);
      } catch (apiError) {
        console.error('Twitter API Error:', apiError);
        // If API fails, show a helpful error message
        if (apiError.message.includes('CORS') || apiError.message.includes('Failed to fetch')) {
          setError('Twitter API blocked by CORS. You need a backend server to fetch tweets.');
        } else if (apiError.message.includes('Unauthorized')) {
          setError('Invalid Twitter Bearer Token. Please check your credentials.');
        } else {
          setError('Failed to load tweets from Twitter API.');
        }
      }
      
    } catch (err) {
      setError('Failed to load tweets');
      console.error('Error fetching tweets:', err);
    } finally {
      setLoading(false);
    }
  };

  const nextTweet = () => {
    if (currentTweetIndex < tweets.length - 1) {
      setCurrentTweetIndex(currentTweetIndex + 1);
    }
  };

  const prevTweet = () => {
    if (currentTweetIndex > 0) {
      setCurrentTweetIndex(currentTweetIndex - 1);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  if (!isOpen && !isEmbedded) return null;

  const currentTweet = tweets[currentTweetIndex];

  const containerClass = isEmbedded ? "twitter-viewer-embedded" : "twitter-viewer-overlay";
  const viewerClass = isEmbedded ? "twitter-viewer embedded" : "twitter-viewer";

  return (
    <div className={containerClass}>
      <div className={viewerClass}>
        <div className="twitter-viewer-header">
          <h3>Recent Tweets</h3>
          {onClose && (
            <button className="close-button" onClick={onClose}>
              <FaTimes />
            </button>
          )}
        </div>

        <div className="twitter-viewer-content">
          {loading ? (
            <div className="loading-state">
              <div className="terminal_prompt">$ loading tweets...</div>
              <div className="loading-dots">Loading...</div>
            </div>
          ) : error ? (
            <div className="error-state">
              <div className="terminal_prompt">$ error</div>
              <p>{error}</p>
              <button onClick={fetchTweets}>Retry</button>
            </div>
          ) : tweets.length > 0 ? (
            <>
              <div className="tweet-display">
                <div className="tweet-header">
                  <div className="terminal_prompt">$ cat tweet_{currentTweetIndex + 1}.txt</div>
                  <div className="tweet-counter">
                    {currentTweetIndex + 1} of {tweets.length}
                  </div>
                </div>
                
                <div className="tweet-content">
                  <p className="tweet-text">{currentTweet.text}</p>
                  
                  {/* Display tweet media if available */}
                  {currentTweet.media && currentTweet.media.length > 0 && (
                    <div className="tweet-media">
                      {currentTweet.media.map((mediaItem, index) => (
                        <div key={index} className="media-item">
                          {mediaItem.type === 'photo' && (
                            <img 
                              src={mediaItem.url} 
                              alt="Tweet media"
                              className="tweet-image"
                              onError={(e) => {
                                // Fallback to preview image if main image fails
                                if (mediaItem.preview_image_url && e.target.src !== mediaItem.preview_image_url) {
                                  e.target.src = mediaItem.preview_image_url;
                                }
                              }}
                            />
                          )}
                          {mediaItem.type === 'video' && (
                            <div className="video-placeholder">
                              <img 
                                src={mediaItem.preview_image_url} 
                                alt="Video thumbnail"
                                className="tweet-video-thumbnail"
                              />
                              <div className="video-overlay">▶ Video</div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                  
                  <div className="tweet-stats">
                    <span className="stat">
                      <FaHeart className="heart-icon" />
                      {currentTweet.likes}
                    </span>
                    <span className="stat">
                      <FaRetweet className="retweet-icon" />
                      {currentTweet.retweets}
                    </span>
                    <span className="stat">
                      <FaReply className="reply-icon" />
                      {currentTweet.replies}
                    </span>
                    <span className="tweet-date">
                      {formatDate(currentTweet.created_at)}
                    </span>
                  </div>

                  <div className="tweet-actions">
                    <a 
                      href={currentTweet.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="view-tweet-link"
                    >
                      View on X/Twitter →
                    </a>
                  </div>
                </div>
              </div>

              <div className="tweet-navigation">
                <button 
                  className="nav-button prev" 
                  onClick={prevTweet}
                  disabled={currentTweetIndex === 0}
                >
                  <FaChevronLeft /> Previous
                </button>
                
                <div className="tweet-indicators">
                  {tweets.map((_, index) => (
                    <button
                      key={index}
                      className={`indicator ${index === currentTweetIndex ? 'active' : ''}`}
                      onClick={() => setCurrentTweetIndex(index)}
                    />
                  ))}
                </div>

                <button 
                  className="nav-button next" 
                  onClick={nextTweet}
                  disabled={currentTweetIndex === tweets.length - 1}
                >
                  Next <FaChevronRight />
                </button>
              </div>
            </>
          ) : (
            <div className="empty-state">
              <div className="terminal_prompt">$ no tweets found</div>
              <p>No tweets available</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}