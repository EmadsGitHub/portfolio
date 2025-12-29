import React from "react";
import {BrowserRouter as Router, Route, Routes, useLocation} from "react-router-dom"
import './App.css';
import Navbar from "./Pages/Home/navbar";
import Home from "./Pages/Home/Homescreen";
import BlogList from "./Pages/Blog/BlogList";
import BlogPost from "./Pages/Blog/BlogPost";
import Starfield from "./Pages/Home/Starfield";
import { Helmet } from 'react-helmet';
import useHoverImageDisplay from "./hooks/useHoverImageDisplay";
import OscilloscopeEffect from "./components/DigitalRain";

function AppContent() {
  const { currentImage, currentSection, refs, hoverHandlers, handleLeave } = useHoverImageDisplay();
  const location = useLocation();
  
  // Check if we're on a blog page
  const isBlogPage = location.pathname.startsWith('/blogs');

  return (
    <div className={`App ${isBlogPage ? 'blog-layout' : ''}`}>
      <Helmet>
        <title>Emad's Portfolio</title>
        <meta name="description" content="Emad's Portfolio"/>
        <link rel="icon" href="/favicon.ico" />
      </Helmet>
      
      {/* Oscilloscope background effect - hide on blog pages */}
      {!isBlogPage && <OscilloscopeEffect />}
      
      {/* Starfield background - hide on blog pages */}
      {!isBlogPage && <Starfield />}
      
      {/* Content Column - full width on blog pages */}
      <div className="content-column" id="scroll-container">
        <Navbar hoverHandlers={hoverHandlers} handleLeave={handleLeave} />
        <Routes>
          <Route path="/" element={<Home refs={refs} hoverHandlers={hoverHandlers} handleLeave={handleLeave} />}></Route>
          <Route path="/blogs" element={<BlogList />}></Route>
          <Route path="/blogs/:id" element={<BlogPost />}></Route>
          <Route path="*" element={<div>404 Not Found</div>}></Route>
        </Routes>
      </div>

      {/* Right Column - Dynamic Image Display - hide on blog pages */}
      {!isBlogPage && (
        <div className="image-column">
          <div className="image-display">
            {currentImage ? (
              <img src={currentImage} alt={currentSection} />
            ) : (
              <div className="terminal-text">
                <div className="prompt">$ display image.png</div>
                <div>[Image space]</div>
              </div>
            )}
          </div>
        </div>
      )}
      
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
