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

  useEffect(() => {
    const handleResize = () => {
      setScreenSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);
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
          <div>{screenSize.width} x {screenSize.height}</div>
          <div>
            {screenSize.width <= 480 ? 'Mobile' : 
             screenSize.width <= 768 ? 'Tablet' : 
             screenSize.width <= 1024 ? 'Desktop S' : 
             screenSize.width <= 1200 ? 'Desktop M' : 'Desktop L'}
          </div>
        </div>
      
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
