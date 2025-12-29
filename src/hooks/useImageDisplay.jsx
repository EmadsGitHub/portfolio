import { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

export default function ImageDisplay() {
  const [currentImage, setCurrentImage] = useState(null);
  const [currentSection, setCurrentSection] = useState('home');

  // Track each section
  const { ref: heroRef, inView: heroInView } = useInView({ threshold: 0.3 });
  const { ref: aboutRef, inView: aboutInView } = useInView({ threshold: 0.3 });
  const { ref: experienceRef, inView: experienceInView } = useInView({ threshold: 0.3 });
  const { ref: projectsRef, inView: projectsInView } = useInView({ threshold: 0.3 });
  const { ref: contactRef, inView: contactInView } = useInView({ threshold: 0.3 });

  // Update current section based on what's in view
  useEffect(() => {
    if (contactInView) {
      setCurrentSection('contact');
      setCurrentImage('./img/uwfeheadshot.png');
    } else if (projectsInView) {
      setCurrentSection('projects');
      setCurrentImage('./img/trackmythreads.png');
    } else if (experienceInView) {
      setCurrentSection('experience');
      setCurrentImage('./img/geotab.png');
    } else if (aboutInView) {
      setCurrentSection('about');
      setCurrentImage('./img/uwfeheadshot.png');
    } else if (heroInView) {
      setCurrentSection('home');
      setCurrentImage('./img/uwfeheadshot.png');
    }
  }, [heroInView, aboutInView, experienceInView, projectsInView, contactInView]);

  return {
    currentImage,
    currentSection,
    refs: {
      heroRef,
      aboutRef,
      experienceRef,
      projectsRef,
      contactRef
    }
  };
}



