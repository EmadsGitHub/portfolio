import React from "react";
import { useState, useEffect } from 'react';
import {BrowserRouter as Router,  Route, Routes} from "react-router-dom"
import './App.css';
import Navbar from "./Pages/Home/navbar";
import Home from "./Pages/Home/Homescreen";
import { Helmet } from 'react-helmet';




function App() {

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
