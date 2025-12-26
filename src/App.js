import React from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom"
import './App.css';
import Navbar from "./Pages/Home/navbar";
import Home from "./Pages/Home/Homescreen";
import Starfield from "./Pages/Home/Starfield";
import { Helmet } from 'react-helmet';
import useHoverImageDisplay from "./hooks/useHoverImageDisplay";
import { TwitterViewer } from "./twitter";
import ScreenDimensions from "./components/ScreenDimensions";

function App() {
  const { currentImage, currentSection, showTwitterViewer, refs, hoverHandlers, handleLeave, showTwitter, hideTwitter } = useHoverImageDisplay();

  return (
    <div className="App">
      <Helmet>
        <title>Emad's Portfolio</title>
        <meta name="description" content="Emad's Portfolio"/>
        <link rel="icon" href="/favicon.ico" />
      </Helmet>
      
      {/* Starfield background */}
      <Starfield />
      
      {/* Left Column - Content */}
      <div className="content-column" id="scroll-container">
        <Router>
          <Navbar hoverHandlers={hoverHandlers} handleLeave={handleLeave} />
          <Routes>
            <Route path="/" element={<Home refs={refs} hoverHandlers={hoverHandlers} handleLeave={handleLeave} showTwitter={showTwitter} hideTwitter={hideTwitter} />}></Route>
            <Route path="*" element={<div>404 Not Found</div>}></Route>
          </Routes>
        </Router>
      </div>

      {/* Right Column - Dynamic Image Display or Twitter Viewer */}
      <div className="image-column">
        <div className="image-display">
          {showTwitterViewer ? (
            <TwitterViewer isEmbedded={true} onClose={hideTwitter} />
          ) : currentImage ? (
            <img src={currentImage} alt={currentSection} />
          ) : (
            <div className="terminal-text">
              <div className="prompt">$ display image.png</div>
              <div>[Image space]</div>
            </div>
          )}
        </div>
      </div>
      
      {/* Screen dimensions display */}
      <ScreenDimensions />
    </div>
  );
}

export default App;
