import React from "react";
import {BrowserRouter as Router, Route, Routes, Navigate, useLocation} from "react-router-dom"
import './App.css';
import Navbar from "./Pages/Home/navbar";
import Home from "./Pages/Home/Homescreen";
import BlogList from "./Pages/Blog/BlogList";
import { Helmet } from 'react-helmet';
import useHoverImageDisplay from "./hooks/useHoverImageDisplay";
import BlueprintBackground from "./components/BlueprintBackground";
import TitleBlock from "./components/TitleBlock";
import ContactBlock from "./components/ContactBlock";

function AppContent() {
  const { currentImage, currentSection, currentProject, refs, hoverHandlers, handleLeave } = useHoverImageDisplay();
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
      
      {/* Chalk blueprint backdrop; the car drawing only on the home sheet */}
      <BlueprintBackground showCar={!isBlogPage} />
      <TitleBlock sheet={isBlogPage ? 2 : 1} />
      <ContactBlock />
      
      {/* Content Column - full width on blog pages */}
      <div className="content-column" id="scroll-container">
        <Navbar hoverHandlers={hoverHandlers} handleLeave={handleLeave} />
        <Routes>
          <Route path="/" element={<Home refs={refs} hoverHandlers={hoverHandlers} handleLeave={handleLeave} />}></Route>
          <Route path="/blogs" element={<BlogList />}></Route>
          <Route path="/blogs/:id" element={<Navigate to="/blogs" replace />}></Route>
          <Route path="*" element={<div>404 Not Found</div>}></Route>
        </Routes>
      </div>

      {/* Right Column - Dynamic Image Display - hide on blog pages */}
      {!isBlogPage && (
        <div className="image-column">
          <div className="image-display">
            {currentImage ? (
              <>
                <img src={currentImage} alt={currentSection} />
                {currentProject && (
                  <div className="project-detail">
                    <h3 className="project-detail-title">{currentProject.title}</h3>
                    <div
                      className="project-detail-desc"
                      dangerouslySetInnerHTML={{ __html: currentProject.desc }}
                    />
                  </div>
                )}
              </>
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
