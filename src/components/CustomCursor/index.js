import React, { useEffect, useRef, useContext } from 'react';
import styled, { ThemeContext } from 'styled-components';

// Styling for the main cursor "tip"
const CursorTip = styled.div`
  position: fixed;
  pointer-events: none;
  z-index: 10000;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  box-shadow: 0 0 10px ${(props) => props.color}, 0 0 20px ${(props) => props.color};
  transform: translate(-50%, -50%);
  transition: transform 0.2s ease-in-out;

  &.hovered {
    transform: translate(-50%, -50%) scale(1.5);
  }
`;

// Canvas for drawing the trail
const TrailCanvas = styled.canvas`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
  z-index: 9999;
`;

const CustomCursor = () => {
  const theme = useContext(ThemeContext);
  const tipRef = useRef(null);
  const canvasRef = useRef(null);
  const points = useRef([]);
  const animationFrameId = useRef(null);

  useEffect(() => {
    const tip = tipRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    let mouseX = 0;
    let mouseY = 0;
    let isHovering = false;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (tip) {
        tip.style.left = `${mouseX}px`;
        tip.style.top = `${mouseY}px`;
      }
      points.current.push({ x: mouseX, y: mouseY, life: 40 });
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      for (let i = 0; i < points.current.length; i++) {
        const p = points.current[i];
        p.life--;

        if (p.life <= 0) {
          points.current.splice(i, 1);
          i--;
          continue;
        }

        ctx.beginPath();
        ctx.moveTo(points.current[i - 1]?.x || p.x, points.current[i - 1]?.y || p.y);
        ctx.lineTo(p.x, p.y);
        
        // Change color and thickness on hover
        const trailColor = isHovering ? theme.primary : theme.text_primary;
        ctx.strokeStyle = `${trailColor}${Math.round(p.life * 2).toString(16)}`; // Fade effect
        ctx.lineWidth = isHovering ? 3 : 2;
        ctx.stroke();
      }

      animationFrameId.current = requestAnimationFrame(animate);
    };
    
    const onMouseEnter = () => {
      isHovering = true;
      tip?.classList.add('hovered');
    };
    const onMouseLeave = () => {
      isHovering = false;
      tip?.classList.remove('hovered');
    };
    
    // Initial setup
    resizeCanvas();
    animate();
    
    // Event listeners
    window.addEventListener('resize', resizeCanvas);
    document.addEventListener('mousemove', onMouseMove);
    const interactiveElements = document.querySelectorAll('a, button, [role="button"], input, textarea');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', onMouseEnter);
      el.addEventListener('mouseleave', onMouseLeave);
    });
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      document.removeEventListener('mousemove', onMouseMove);
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', onMouseEnter);
        el.removeEventListener('mouseleave', onMouseLeave);
      });
      cancelAnimationFrame(animationFrameId.current);
    };
  }, [theme]);

  return (
    <>
      <CursorTip ref={tipRef} color={theme.primary} />
      <TrailCanvas ref={canvasRef} />
    </>
  );
};

export default CustomCursor;

