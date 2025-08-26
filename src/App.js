import React from "react";
import { useState, useEffect } from 'react';
import {BrowserRouter as Router,  Route, Routes} from "react-router-dom"
import './App.css';
import Navbar from "./Pages/Home/navbar";
import Home from "./Pages/Home/Homescreen";
import { Helmet } from 'react-helmet';




function App() {
  const [screenSize, setScreenSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });
  const [showSizeIndicator, setShowSizeIndicator] = useState(true);

  // Screen size logger
  useEffect(() => {
    // Create a styled console log function
    const logScreenSize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      // Update state with new dimensions
      setScreenSize({ width, height });
      
      console.log(
        `%cScreen Size: ${width}px × ${height}px`, 
        'background: #3D90D7; color: white; font-size: 12px; font-weight: bold; padding: 4px 8px; border-radius: 4px;'
      );
      
      // Log which media query breakpoint we're in
      if (width > 1300) {
        console.log('%cBreakpoint: > 1300px (Large Desktop)', 'color: #ffd700; font-weight: bold;');
      } else if (width > 1024 && width <= 1300) {
        console.log('%cBreakpoint: 1025px-1300px (Desktop)', 'color: #ffd700; font-weight: bold;');
      } else if (width > 768 && width <= 1024) {
        console.log('%cBreakpoint: 769px-1024px (Small Desktop/Tablet Landscape)', 'color: #ffd700; font-weight: bold;');
      } else if (width > 480 && width <= 768) {
        console.log('%cBreakpoint: 481px-768px (Tablet Portrait)', 'color: #ffd700; font-weight: bold;');
      } else if (width <= 480) {
        console.log('%cBreakpoint: ≤480px (Mobile)', 'color: #ffd700; font-weight: bold;');
      }
    };
    
    // Log on resize with debounce for performance
    let resizeTimer;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(logScreenSize, 100);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Log initial size with the styled logger
    logScreenSize();
    
    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="App">
      <Helmet>
        <title>Emad's Portfolio</title>
        <meta name="description" content="Emad's Portfolio"/>
        <link rel="icon" href="/favicon.ico" />
      </Helmet>
      <div className="stars"></div>
      <div className="shooting-star"></div>
      
      {/* Screen size indicator */}
      {showSizeIndicator && (
        <div 
          style={{
            position: 'fixed',
            bottom: '10px',
            right: '10px',
            background: 'rgba(61, 144, 215, 0.8)',
            color: 'white',
            padding: '8px 12px',
            borderRadius: '4px',
            fontSize: '14px',
            fontWeight: 'bold',
            zIndex: 9999,
            boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <div>
            {screenSize.width} × {screenSize.height}px
          </div>
          <div style={{ fontSize: '12px', marginTop: '4px' }}>
            {screenSize.width > 1300 ? '> 1300px (Large Desktop)' :
             screenSize.width > 1024 ? '1025-1300px (Desktop)' :
             screenSize.width > 768 ? '769-1024px (Tablet Landscape)' :
             screenSize.width > 480 ? '481-768px (Tablet Portrait)' :
             '≤480px (Mobile)'}
          </div>
          <button 
            onClick={() => setShowSizeIndicator(false)}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'white',
              fontSize: '10px',
              cursor: 'pointer',
              marginTop: '4px',
              width: 'auto',
              height: 'auto',
              padding: '2px 5px'
            }}
          >
            Hide
          </button>
        </div>
      )}
      
      <Router>
        <div>
          <Navbar/>
          <Routes>
            <Route path = "/" element={<Home/>}></Route>
            <Route path = "*" element = {<div>404 Not Found</div>}></Route>
          </Routes>
        </div>
      </Router>

    </div>
  );
}

export default App;
