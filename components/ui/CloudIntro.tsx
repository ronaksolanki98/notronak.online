"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef } from "react";

export function CloudIntro() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Mouse position tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for cursor reaction
  const springConfig = { stiffness: 100, damping: 30, mass: 1 };
  const cloud1X = useSpring(useTransform(mouseX, [-500, 500], [-50, 50]), springConfig);
  const cloud1Y = useSpring(useTransform(mouseY, [-500, 500], [-50, 50]), springConfig);
  
  const cloud2X = useSpring(useTransform(mouseX, [-500, 500], [40, -40]), springConfig);
  const cloud2Y = useSpring(useTransform(mouseY, [-500, 500], [40, -40]), springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const { innerWidth, innerHeight } = window;
      const x = e.clientX - innerWidth / 2;
      const y = e.clientY - innerHeight / 2;
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div ref={containerRef} className="relative w-full h-full min-h-screen overflow-visible select-none">
      {/* Cloud 1: Main Interactive Floating Cloud */}
      <motion.div
        style={{ 
          x: cloud1X, 
          y: cloud1Y,
          left: "-10vw",
          top: "-10vh",
          mixBlendMode: "multiply" as any 
        }}
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: 1,
          left: ["-10vw", "60vw", "10vw", "80vw", "-10vw"],
          top: ["-10vh", "30vh", "70vh", "20vh", "-10vh"],
        }}
        transition={{
          opacity: { duration: 2 },
          left: { duration: 55, repeat: Infinity, ease: "linear" },
          top: { duration: 45, repeat: Infinity, ease: "linear" }
        }}
        className="absolute w-[45vw] h-[45vw] max-w-[600px] max-h-[600px] z-10 pointer-events-none"
      >
        <Image
          src="/assets/glazing-cloud-v2.png"
          alt="Glazing Cloud 4K"
          fill
          className="object-contain"
          priority
        />
        {/* Shine Layer */}
        <motion.div
          animate={{ opacity: [0.1, 0.3, 0.1] }}
          transition={{ duration: 5, repeat: Infinity }}
          className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent mix-blend-overlay filter blur-2xl rounded-full"
        />
      </motion.div>

      {/* Cloud 2: Secondary Interactive Cloud */}
      <motion.div
        style={{ 
          x: cloud2X, 
          y: cloud2Y,
          left: "80vw",
          top: "60vh",
          mixBlendMode: "multiply" as any 
        }}
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: 0.8,
          left: ["80vw", "10vw", "50vw", "-5vw", "80vw"],
          top: ["60vh", "0vh", "40vh", "80vh", "60vh"],
        }}
        transition={{
          opacity: { duration: 2.5, delay: 0.5 },
          left: { duration: 65, repeat: Infinity, ease: "linear" },
          top: { duration: 50, repeat: Infinity, ease: "linear" }
        }}
        className="absolute w-[35vw] h-[35vw] max-w-[500px] max-h-[500px] z-0 pointer-events-none"
      >
        <Image
          src="/assets/glazing-cloud-v2.png"
          alt="Glazing Cloud 4K Secondary"
          fill
          className="object-contain opacity-70"
          priority
        />
      </motion.div>

      {/* Background Atmosphere Refinement */}
      <div className="absolute top-[30%] left-[40%] w-[50vw] h-[50vw] bg-brand-blue/5 rounded-full filter blur-[150px] -z-10 animate-pulse" />
      <div className="absolute bottom-[25%] right-[20%] w-[35vw] h-[35vw] bg-brand-cyan/5 rounded-full filter blur-[100px] -z-10 animate-pulse" />
    </div>
  );
}
