import React, { useState, useEffect } from 'react';

export default function ScreenDimensions() {
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="screen-dimensions">
      <div className="dimensions-content">
        <div className="terminal-prompt">$ screen --info</div>
        <div className="dimensions-text">
          {dimensions.width} × {dimensions.height}
        </div>
      </div>
    </div>
  );
}