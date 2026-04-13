"use client";

import { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export function PixelCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  // High-performance spring physics for senior feel
  const springConfig = { damping: 35, stiffness: 700, mass: 0.5 };
  const springX = useSpring(cursorX, springConfig);
  const springY = useSpring(cursorY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      let targetX = e.clientX;
      let targetY = e.clientY;

      const target = e.target as HTMLElement;
      const magneticElement = target.closest('a, button, .cursor-crosshair') as HTMLElement | null;
      
      if (magneticElement) {
        setIsHovering(true);
        const rect = magneticElement.getBoundingClientRect();
        // Snap to center with a "pull" sensation
        targetX = rect.left + rect.width / 2;
        targetY = rect.top + rect.height / 2;
      } else {
        setIsHovering(false);
      }

      cursorX.set(targetX);
      cursorY.set(targetY);
    };

    const handleMouseDown = () => setIsPressed(true);
    const handleMouseUp = () => setIsPressed(false);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [cursorX, cursorY]);

  return (
    <div className="pointer-events-none fixed inset-0 z-[100]">
      {/* Primary Cursor Shape */}
      <motion.div
        style={{
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isPressed ? 0.8 : (isHovering ? 2 : 1),
          rotate: isHovering ? 45 : 0,
        }}
        className="mix-blend-difference"
      >
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
           <rect x="18" y="2" width="4" height="36" fill="white" />
           <rect x="2" y="18" width="36" height="4" fill="white" />
           {isHovering && (
             <motion.circle 
               initial={{ r: 0 }}
               animate={{ r: 12 }}
               cx="20" cy="20" 
               stroke="white" 
               strokeWidth="1" 
               fill="none" 
               opacity={0.3}
             />
           )}
        </svg>
      </motion.div>
    </div>
  );
}
