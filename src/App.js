import React from "react";
import { useState, useEffect } from 'react';
import {BrowserRouter as Router,  Route, Routes} from "react-router-dom"
import './App.css';
import Navbar from "./Pages/Home/navbar";
import Home from "./Pages/Home/Homescreen";




function App() {

  return (
    <div className="App">

      <div class="stars"></div>
      <div class="shooting-star"></div>
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
