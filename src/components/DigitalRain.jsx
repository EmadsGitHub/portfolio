import React, { useEffect, useRef } from 'react';

export default function OscilloscopeEffect() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Oscilloscope parameters
    let time = 0;
    const waveforms = [
      {
        frequency: 0.02,
        amplitude: 60,
        phase: 0,
        yOffset: canvas.height * 0.3,
        color: 'rgba(0, 255, 65, 0.8)',
        type: 'sine'
      },
      {
        frequency: 0.03,
        amplitude: 40,
        phase: Math.PI / 4,
        yOffset: canvas.height * 0.5,
        color: 'rgba(0, 255, 65, 0.6)',
        type: 'sine'
      },
      {
        frequency: 0.015,
        amplitude: 80,
        phase: Math.PI / 2,
        yOffset: canvas.height * 0.7,
        color: 'rgba(0, 255, 65, 0.4)',
        type: 'square'
      }
    ];

    // Grid parameters
    const gridSpacing = 40;

    const drawGrid = () => {
      ctx.strokeStyle = 'rgba(0, 255, 65, 0.1)';
      ctx.lineWidth = 1;
      
      // Vertical lines
      for (let x = 0; x <= canvas.width; x += gridSpacing) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      
      // Horizontal lines
      for (let y = 0; y <= canvas.height; y += gridSpacing) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }
    };

    const generateWaveform = (waveform, time) => {
      const points = [];
      const step = 2; // Pixel step for smoother curves
      
      for (let x = 0; x <= canvas.width; x += step) {
        let y;
        
        if (waveform.type === 'sine') {
          y = waveform.yOffset + 
              waveform.amplitude * Math.sin(x * waveform.frequency + time + waveform.phase);
        } else if (waveform.type === 'square') {
          const sineValue = Math.sin(x * waveform.frequency + time + waveform.phase);
          y = waveform.yOffset + waveform.amplitude * (sineValue > 0 ? 1 : -1);
        }
        
        points.push({ x, y });
      }
      
      return points;
    };

    const draw = () => {
      // Clear canvas with fade effect (oscilloscope persistence)
      ctx.fillStyle = 'rgba(21, 32, 43, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw grid (like oscilloscope graticule)
      drawGrid();

      // Draw waveforms
      waveforms.forEach(waveform => {
        const points = generateWaveform(waveform, time);
        
        if (points.length > 1) {
          ctx.strokeStyle = waveform.color;
          ctx.lineWidth = 2;
          ctx.lineCap = 'round';
          ctx.lineJoin = 'round';
          
          // Draw the waveform
          ctx.beginPath();
          ctx.moveTo(points[0].x, points[0].y);
          
          for (let i = 1; i < points.length; i++) {
            ctx.lineTo(points[i].x, points[i].y);
          }
          
          ctx.stroke();
          
          // Add glow effect
          ctx.shadowColor = waveform.color;
          ctx.shadowBlur = 10;
          ctx.stroke();
          ctx.shadowBlur = 0;
        }
      });

      // Add scanning line effect (like oscilloscope trigger)
      const scanX = (time * 100) % canvas.width;
      ctx.strokeStyle = 'rgba(0, 255, 65, 0.3)';
      ctx.lineWidth = 1;
      ctx.setLineDash([5, 5]);
      ctx.beginPath();
      ctx.moveTo(scanX, 0);
      ctx.lineTo(scanX, canvas.height);
      ctx.stroke();
      ctx.setLineDash([]);

      time += 0.02;
    };

    const interval = setInterval(draw, 50);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="oscilloscope-effect"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        pointerEvents: 'none',
        opacity: 0.3
      }}
    />
  );
}