"use client";

import { ReactNode, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface WindowCardProps {
  title?: string;
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function WindowCard({ title, children, className = "", delay = 0 }: WindowCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Mouse tracking for subtle parallax shadow/rotate
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-300, 300], [5, -5]), { stiffness: 100, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-300, 300], [-5, 5]), { stiffness: 100, damping: 30 });

  const handleMouseMove = (event: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(event.clientX - centerX);
    y.set(event.clientY - centerY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      transition={{ delay, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      className={`relative group rounded-[24px] md:rounded-[32px] border-[0.5px] border-white/10 bg-white/[0.03] p-6 md:p-8 backdrop-blur-3xl shadow-[0_32px_120px_-20px_rgba(0,0,0,0.5)] hover:shadow-[0_48px_140px_-20px_rgba(0,0,0,0.7)] transition-all duration-700 overflow-hidden flex flex-col ${className}`}
    >
      {/* Subtle Inner Glow Border */}
      <div className="absolute inset-0 rounded-[24px] md:rounded-[32px] border border-white/5 pointer-events-none" />
      
      {/* Hover Highlight (Flash) */}
      <motion.div 
        className="absolute inset-0 rounded-[24px] md:rounded-[32px] bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"
        style={{ transform: "translateZ(10px)" }}
      />

      {title && (
        <div className="relative mb-6 md:mb-8 flex items-center justify-between border-b border-white/5 pb-4 md:pb-5 shrink-0" style={{ transform: "translateZ(20px)" }}>
          <div className="flex gap-2">
            <div className="h-2 w-2 rounded-full bg-white/5 group-hover:bg-red-500/30 transition-colors" />
            <div className="h-2 w-2 rounded-full bg-white/5 group-hover:bg-yellow-500/30 transition-colors" />
            <div className="h-2 w-2 rounded-full bg-white/5 group-hover:bg-green-500/30 transition-colors" />
          </div>
          <span className="text-[10px] font-mono tracking-widest text-white/30 uppercase">{title}</span>
          <div className="w-12 rotate-45 border-t border-white/10" />
        </div>
      )}
      
      <div className="relative z-10 flex-1 overflow-y-auto no-scrollbar scroll-smooth" style={{ transform: "translateZ(30px)" }}>
        {children}
      </div>
    </motion.div>
  );
}
