# Twitter Integration Module

This folder contains all Twitter-related functionality for the portfolio website.

## Files Structure

```
src/twitter/
├── index.js           # Main exports for the Twitter module
├── TwitterViewer.jsx  # React component for displaying tweets
├── TwitterViewer.css  # Styles for the Twitter viewer
├── twitterAPI.js      # Twitter API utility functions
└── README.md          # This documentation
```

## Components

### TwitterViewer
- **Purpose:** Displays tweets in a carousel interface
- **Features:** 
  - Embedded in right-side column
  - Navigation with Previous/Next buttons
  - Dot indicators for quick navigation
  - Terminal-themed design
  - Mock data fallback

### TwitterAPI
- **Purpose:** Handles Twitter API calls
- **Features:**
  - Bearer token authentication
  - Fetches user tweets
  - Sorts by engagement (likes)
  - CORS-aware (uses proxy server in development)

## Usage

```jsx
import { TwitterViewer } from '../twitter';

<TwitterViewer 
  isEmbedded={true} 
  onClose={handleClose} 
/>
```

## Configuration

1. Create `.env` file with:
```bash
REACT_APP_TWITTER_BEARER_TOKEN=your_bearer_token_here
REACT_APP_TWITTER_USERNAME=emadddd_r
```

2. Run development server:
```bash
npm run dev  # Runs both React app and Twitter proxy server
```

## Deployment

- **Development:** Uses local proxy server (`twitter-server.js`)
- **Production:** Requires serverless functions or full-stack deployment
- **Fallback:** Uses mock data if no API access

## Dependencies

- `react-icons` - For UI icons
- `express` - Proxy server
- `cors` - CORS handling
- `node-fetch` - API requests