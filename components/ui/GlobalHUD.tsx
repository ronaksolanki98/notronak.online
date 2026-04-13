"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

export function GlobalHUD() {
  const [time, setTime] = useState("");
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [status, setStatus] = useState("SYSTEM ONLINE");
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const updateTime = () => setTime(new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }));
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Listen for custom "section-change" event to update status and theme
  useEffect(() => {
    const handleSectionChange = (e: any) => {
        const sectionStatuses: Record<string, string> = {
            "0": "NARRATIVE / 01",
            "1": "CONCEPT / 02",
            "2": "CAPABILITY / 03",
            "3": "SYSTEMS / 04"
        };
        setStatus(sectionStatuses[e.detail] || "SYSTEM ONLINE");
        // Section 0 is light theme, others are dark
        setTheme(e.detail === "0" ? "light" : "dark");
    };
    window.addEventListener('section-change', handleSectionChange);
    return () => window.removeEventListener('section-change', handleSectionChange);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 0.5 }}
      className={`fixed inset-0 pointer-events-none z-50 flex flex-col justify-between p-4 md:p-10 font-mono transition-colors duration-500 ${
        theme === "light" ? "text-black" : "text-white"
      }`}
    >
      {/* Top Bar */}
      <div className="flex justify-between items-start">
        <div className="flex gap-4 md:gap-16">
           <div className="flex flex-col">
             <span className={`text-[8px] md:text-[10px] uppercase tracking-[0.2em] mb-1 transition-opacity ${theme === "light" ? "opacity-60" : "opacity-30"}`}>Engineer</span>
             <span className="text-[10px] md:text-xs font-bold tracking-tight">R. Solanki</span>
           </div>
           <div className="hidden sm:flex flex-col">
             <span className={`text-[8px] md:text-[10px] uppercase tracking-[0.2em] mb-1 transition-opacity ${theme === "light" ? "opacity-60" : "opacity-30"}`}>Status</span>
             <span className="text-[10px] md:text-xs font-medium tracking-tight uppercase">{status}</span>
           </div>
           <div className="hidden lg:flex flex-col">
             <span className={`text-[10px] uppercase tracking-[0.2em] mb-1 transition-opacity ${theme === "light" ? "opacity-60" : "opacity-30"}`}>Latency</span>
             <span className={`text-xs font-medium tracking-tight ${theme === "light" ? "text-brand-blue" : "text-brand-yellow"}`}>12ms // OPTIMIZED</span>
           </div>
        </div>
        <div className="text-right flex flex-col items-end">
          <span className={`text-[10px] uppercase tracking-[0.2em] mb-1 transition-opacity ${theme === "light" ? "opacity-60" : "opacity-30"}`}>Region / Zone</span>
          <span className="text-xs font-medium text-brand-cyan">AP-SOUTH-1A</span>
        </div>
      </div>

      {/* Bottom Bar & Progress */}
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-end">
            <div className="flex gap-8">
                {/* Links removed here to avoid redundancy with page footer */}
            </div>
            <div className="flex flex-col items-end">
                <div className="flex items-center gap-2">
                    <span className={`animate-pulse w-1.5 h-1.5 rounded-full ${theme === "light" ? "bg-brand-blue shadow-[0_0_8px_rgba(59,130,246,0.5)]" : "bg-green-400 shadow-[0_0_8px_#4ade80]"}`}></span>
                    <span className="text-[8px] md:text-micro font-bold tracking-widest">STABLE v1.4.0</span>
                </div>
            </div>
        </div>
        
        {/* Progress Bar Container */}
        <div className={`relative w-full h-[2px] overflow-hidden transition-colors ${theme === "light" ? "bg-black/10" : "bg-white/5"}`}>
            <motion.div 
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-brand-cyan to-brand-blue origin-left"
                style={{ scaleX }}
            />
        </div>
      </div>
    </motion.div>
  );
}
