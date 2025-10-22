import React from "react";
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
