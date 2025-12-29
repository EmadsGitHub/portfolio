import { useState } from 'react';

export default function useHoverImageDisplay() {
  const [currentImage, setCurrentImage] = useState('./img/uwfeheadshot.png'); // Default image
  const [currentSection, setCurrentSection] = useState('home');

  // Hover handlers for different sections/elements
  const handleHover = (section, imagePath) => {
    setCurrentSection(section);
    setCurrentImage(imagePath);
  };

  const handleLeave = () => {
    // Reset to default image when not hovering
    setCurrentSection('home');
    setCurrentImage('./img/uwfeheadshot.png');
  };

  // Pre-defined hover handlers for common sections
  const hoverHandlers = {
    home: () => handleHover('home', './img/uwfeheadshot.png'),
    about: () => handleHover('about', './img/uwfeheadshot.png'),
    experience: () => handleHover('experience', './img/geotab.png'),
    projects: () => handleHover('projects', './img/trackmythreads.png'),
    contact: () => handleHover('contact', './img/uwfeheadshot.png'),
    
    // Individual project hovers
    trackMyThreads: () => handleHover('trackMyThreads', './img/trackmythreads.png'),
    verifAI: () => handleHover('verifAI', './img/verifailogo.png'),
    sageRover: () => handleHover('sageRover', './img/hackthe6ixrobot.png'),
    posturePal: () => handleHover('posturePal', './img/UTRAhacks.png'),
    
    // Experience hovers
    geotab: () => handleHover('geotab', './img/geotabcar.png'),
    uwfe: () => handleHover('uwfe', './img/me_racing.jpeg'),
    
  };

  return {
    currentImage,
    currentSection,
    handleHover,
    handleLeave,
    hoverHandlers,
    // Refs are no longer needed since we're not tracking scroll position
    refs: {
      heroRef: null,
      aboutRef: null,
      experienceRef: null,
      projectsRef: null,
      contactRef: null
    }
  };
}