"use client";

import { useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { View, Environment, PresentationControls } from "@react-three/drei";
import gsap from "gsap";
import { motion } from "framer-motion";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CloudIntro } from "@/components/ui/CloudIntro";
import { ClusterScene } from "@/components/3d/ClusterScene";
import { PixelCursor } from "@/components/ui/PixelCursor";
import { WindowCard } from "@/components/ui/WindowCard";

const RevealText = ({ children, className = "", delay = 0 }: { children: string, className?: string, delay?: number }) => (
  <div className={`overflow-hidden ${className}`}>
    <motion.div
      initial={{ y: "100%" }}
      whileInView={{ y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 1.5, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  </div>
);

const aboutHighlights = [
  {
    label: "Focus",
    detail: "Precision automation for mission-critical, multi-cloud infrastructures.",
  },
  {
    label: "Systems",
    detail: "GitOps-driven Kubernetes (ArgoCD, Istio) and Terraform fabrics.",
  },
  {
    label: "Mindset",
    detail: "Reliability-first, observability-rich, security-conscious SRE discipline.",
  },
  {
    label: "Signal",
    detail: "End-to-end ownership from infrastructure design to CI/CD reliability.",
  },
];

const toolStack = [
  "Terraform · ArgoCD · Istio",
  "Kubernetes · EKS · SRE Runbooks",
  "Cloudflare Mesh · Failover · Networking",
  "Monitoring · Observability · Incident Readiness",
];

const scaleSignals = [
  { label: "Automation", detail: "Edge-to-edge GitOps and declarative orchestration." },
  { label: "Observation", detail: "Telemetry, dashboards, and reproducible post-incident narratives." },
  { label: "Reliability", detail: "Zero-downtime state, automated healing, and failover guardrails." },
  { label: "Collaboration", detail: "Playbooks, documentation, and shared context for cross-functional teams." },
];

gsap.registerPlugin(ScrollTrigger);

export function HorizontalScrollClient() {
  const [isMounted, setIsMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted || !containerRef.current || !scrollWrapperRef.current) return;

    const sections = gsap.utils.toArray(".horizontal-section");
    
    const tween = gsap.to(sections, {
      xPercent: -100 * (sections.length - 1),
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        pin: true,
        scrub: 0.8,
        snap: 1 / (sections.length - 1),
        end: () => "+=" + scrollWrapperRef.current?.offsetWidth,
        onUpdate: (self) => {
            // Dispatch section-change event for HUD
            const activeSection = Math.round(self.progress * (sections.length - 1));
            window.dispatchEvent(new CustomEvent('section-change', { detail: activeSection.toString() }));
        }
      }
    });

    return () => {
      tween.kill();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [isMounted]);

  if (!isMounted) return null;

  return (
    <>
      <PixelCursor />
      
      <div ref={containerRef} className="relative z-10 h-screen w-full overflow-hidden bg-bg text-text-main font-sans selection:bg-brand-yellow selection:text-black">
        <div ref={scrollWrapperRef} className="flex h-full w-[400vw]">
          
          {/* Section 1: Hero / Cloud */}
          <section className="horizontal-section relative flex h-full w-screen items-center bg-white overflow-hidden p-6 md:p-12 lg:p-20">
            <div className="content-max-w flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20">
              
              <div className="flex flex-col gap-4 lg:gap-6 z-20">
                <span className="text-[10px] md:text-xs font-mono tracking-[0.4em] font-bold text-brand-blue/80 uppercase">System / Archetype / 01</span>
                <div>
                  <h1 className="text-huge font-black text-black tracking-tighter leading-none mb-2">Cloud.</h1>
                  <p className="text-2xl md:text-4xl lg:text-5xl font-bold text-black/60 tracking-tight">& DevOps Orchestration</p>
                </div>
              </div>

              <div className="relative z-30 w-full max-w-2xl">
                 <WindowCard title="Identity" delay={0.6} className="bg-white/80 border-black/5 shadow-[0_32px_120px_-20px_rgba(0,0,0,0.1)]">
                   <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-8 mb-8 sm:mb-10">
                     <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-tr from-brand-cyan to-brand-blue flex items-center justify-center text-white font-bold text-2xl sm:text-3xl shadow-xl border border-white/20 shrink-0">
                        RS
                     </div>
                     <div className="flex flex-col gap-1 text-center sm:text-left">
                       <h2 className="text-3xl sm:text-4xl font-bold text-black tracking-tighter">Ronak Solanki</h2>
                       <p className="text-[10px] text-brand-blue font-bold tracking-[0.4em] uppercase">Infrastructure & Reliability Engineer</p>
                     </div>
                   </div>
                   
                   <p className="text-base sm:text-xl font-medium text-black/60 leading-relaxed mb-8 sm:mb-12 text-balance text-center sm:text-left">
                      Architecting resilient cloud ecosystems and distributed orchestration layers. Reducing complexity through precision automation and fault-tolerant CI/CD fabrics.
                   </p>

                   <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                     <a
                        href="/solankironak.pdf"
                        target="_blank"
                        rel="noreferrer"
                        download
                        className="inline-flex items-center justify-center px-8 sm:px-10 py-4 sm:py-5 bg-black text-white text-[10px] sm:text-[11px] font-bold rounded-full hover:scale-105 transition-transform active:scale-95 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.1)] tracking-widest uppercase"
                     >
                        RESUME // PDF
                     </a>
                     <a
                        href="mailto:solankironak423@gmail.com"
                        className="px-8 sm:px-10 py-4 sm:py-5 bg-black/5 text-black border border-black/10 text-[10px] sm:text-[11px] font-bold rounded-full hover:bg-black/10 transition-colors backdrop-blur-sm tracking-widest uppercase inline-flex items-center justify-center font-bold"
                     >
                        CONTACT
                     </a>
                  </div>
                </WindowCard>
             </div>
            </div>

            <div className="absolute inset-0 z-10 pointer-events-none">
              <CloudIntro />
            </div>
          </section>

          {/* Section 2: Philosophy (Craft) */}
          <section className="horizontal-section relative flex h-full w-screen items-center overflow-hidden bg-transparent shadow-[20px_0_100px_rgba(0,0,0,0.5)] p-6 md:p-12 lg:p-20">
             <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(250,255,0,0.2),_transparent_55%)] opacity-20 md:opacity-40" />
             <div className="absolute inset-0 pointer-events-none">
               <div className="absolute -top-10 right-[-15%] w-[60vh] h-[60vh] bg-gradient-to-br from-brand-yellow/20 to-transparent rounded-full mix-blend-screen blur-[160px] opacity-20 md:opacity-100" />
               <div className="absolute left-[-5%] bottom-20 w-[25vw] h-[25vw] bg-[radial-gradient(circle,_rgba(59,130,246,0.2),_transparent_60%)]" />
               <div className="absolute inset-0 bg-[radial-gradient(circle_at_left_bottom,_rgba(255,255,255,0.04),_transparent_55%)] mix-blend-soft-light" />
             </div>
             <div className="absolute right-[-10%] top-[-5%] w-[80vh] h-[80vh] bg-gradient-to-br from-[#FAFF00]/15 to-transparent rounded-full mix-blend-multiply filter blur-[150px] opacity-10 md:opacity-20 animate-pulse pointer-events-none"></div>
             
             <div className="relative z-10 content-max-w flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-24">
                <div className="flex flex-col border-l-[6px] md:border-l-[10px] border-brand-yellow py-4 md:py-8 lg:flex-1">
                  <span className="text-micro text-white/40 block mb-4 md:mb-6 px-4 md:px-8 uppercase">Concept / 02</span>
                  <h2 className="text-title font-black text-white/10 md:text-white/10 lg:text-white mb-6 md:mb-8 leading-none tracking-tighter px-4 md:px-8">Craft.</h2>
                  <motion.p 
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1.2, delay: 0.6 }}
                    className="text-lg md:text-2xl font-bold text-white/50 leading-tight max-w-xl px-4 md:px-8"
                  >
                     Obsessing over the intersection of performance, technical excellence, and uncompromising reliability.
                  </motion.p>
               </div>

               <div className="flex flex-col gap-6 md:gap-8 w-full max-w-xl lg:flex-1">
                 <WindowCard title="Philosophy" delay={0.8} className="bg-black/90 text-white border-white/5 shadow-2xl">
                   <p className="text-xl md:text-2xl font-bold leading-tight text-white italic tracking-tight">
                       "Automate the routine, engineer for failures, and build uncompromisingly observable architectures."
                   </p>
                   <div className="mt-8 md:mt-12 pt-6 md:pt-8 border-t border-white/5 space-y-3">
                     <p className="text-[10px] text-white/30 flex justify-between tracking-widest uppercase">
                       <span>CODE_QUALITY / COVERAGE</span>
                       <span>98.4%</span>
                     </p>
                     <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                       <motion.div 
                         initial={{ width: 0 }}
                         whileInView={{ width: "98.4%" }}
                         transition={{ duration: 2, delay: 1.2 }}
                         className="h-full bg-blue-500 shadow-[0_0_15px_#3b82f6]" 
                       />
                     </div>
                   </div>
                 </WindowCard>

                 <WindowCard title="About Ronak" delay={1.2} className="bg-[#040506]/80 text-white border-white/5 shadow-[0_40px_120px_-40px_rgba(0,0,0,0.8)]">
                   <p className="text-base md:text-lg text-white/70 leading-relaxed">
                     Building resilient ecosystems with the same exacting craft you see across the scroll—automated, observable, and human-centric.
                   </p>
                   <div className="mt-6 md:mt-8 grid gap-3 md:gap-4 text-xs md:text-sm text-white/60">
                     {aboutHighlights.map((item) => (
                       <div key={item.label} className="flex justify-between border-b border-white/5 pb-2">
                         <span className="text-micro text-white/40">{item.label}</span>
                         <span className="max-w-[65%] text-right text-white/70">{item.detail}</span>
                       </div>
                     ))}
                   </div>
                   <div className="mt-6 flex flex-wrap gap-2 md:gap-3 text-[8px] md:text-[9px] uppercase tracking-[0.3em]">
                     {toolStack.map((tool) => (
                       <span key={tool} className="px-2 md:px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/60">
                         {tool}
                       </span>
                     ))}
                   </div>
                 </WindowCard>
               </div>
             </div>
          </section>

          {/* Section 3: Capability (Scale) */}
          <section className="horizontal-section relative flex h-full w-screen items-center bg-black overflow-hidden p-6 md:p-12 lg:p-20">
             <div className="absolute top-[4%] md:top-[8%] right-[4%] md:right-[8%] text-right z-20 pointer-events-none">
               <span className="text-micro text-white/10 block mb-1 md:mb-2 uppercase">Growth / 03</span>
               <h2 className="text-huge font-black text-brand-yellow/80 tracking-tighter leading-none drop-shadow-[0_0_60px_rgba(250,255,0,0.1)]">Scale.</h2>
             </div>

            <div className="absolute inset-0 z-10 w-full h-full pointer-events-none">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-yellow/5 to-transparent backdrop-blur-[2px]" />
              <div className="absolute inset-0">
                <div className="absolute -top-32 left-[-10%] h-[130%] w-[110%] border border-white/5 rounded-full opacity-20" />
                <div className="absolute bottom-[-5%] right-[-10%] w-[40%] h-[65%] bg-[radial-gradient(circle,_rgba(59,130,246,0.15),_transparent_70%)]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(250,255,0,0.08),_transparent_60%)] mix-blend-screen" />
              </div>
            </div>
             
             <div className="relative z-30 content-max-w flex flex-col lg:flex-row gap-8 lg:gap-12 items-center lg:items-stretch justify-center pb-24 md:pb-0">
               <div className="w-full max-w-lg lg:max-w-[28vw] lg:flex-1">
                 <WindowCard title="Infrastructure Lab" className="bg-[#1A1C23]/80 text-white border-white/10 shadow-[0_0_100px_rgba(0,10,20,0.6)] h-full" delay={0.4}>
                    <div className="space-y-6 md:space-y-8">
                       <div className="flex flex-col gap-2 border-l-2 border-brand-cyan pl-6">
                         <p className="text-micro text-brand-cyan opacity-80 uppercase">Edge Expansion</p>
                         <p className="text-2xl md:text-3xl font-bold text-white tracking-tighter leading-none">Global Deployment</p>
                       </div>
                       <p className="text-base md:text-lg font-medium text-white/40 leading-relaxed text-balance ml-6">
                         Expanding infrastructure boundaries for high-throughput global operations. Ensuring zero-downtime through immutable state management.
                       </p>
                       <div className="pt-6 md:pt-8 border-t border-white/5 flex items-center justify-between ml-6">
                         <div className="flex items-center gap-3">
                           <span className="w-2 md:w-3 h-2 md:h-3 rounded-full bg-brand-cyan animate-pulse shadow-[0_0_12px_#22d3ee]"></span>
                           <span className="text-[10px] text-white/30 font-bold tracking-widest uppercase">Node Established</span>
                         </div>
                         <span className="text-[10px] text-white/20 font-mono">0x4AF92</span>
                       </div>
                    </div>
                 </WindowCard>
               </div>

               <div className="w-full max-w-lg lg:max-w-[28vw] lg:flex-1 lg:mt-16">
                 <WindowCard title="Automation Engine" className="bg-black/80 text-white border-white/5 shadow-2xl h-full" delay={0.6}>
                    <div className="space-y-6 md:space-y-8">
                       <div className="flex flex-col gap-2 border-l-2 border-brand-yellow pl-6">
                         <p className="text-micro text-brand-yellow opacity-80 uppercase">Scale / Velocity</p>
                         <p className="text-2xl md:text-3xl font-bold text-white tracking-tighter leading-none">CI/CD Orchestration</p>
                       </div>
                       <div className="ml-6 space-y-4">
                         <p className="text-base md:text-lg font-medium text-white/40 leading-relaxed">
                            Implementing high-velocity delivery pipelines that treat infrastructure as code (IaC) with automated testing and security scanning.
                         </p>
                         <div className="flex flex-wrap gap-2">
                            {["Jenkins", "GitHub Actions", "Argo", "SonarQube"].map(tool => (
                               <span key={tool} className="px-3 py-1 bg-white/5 rounded text-[10px] uppercase tracking-widest font-bold text-white/30 border border-white/5">{tool}</span>
                            ))}
                         </div>
                       </div>
                    </div>
                 </WindowCard>
               </div>

               <div className="w-full max-w-lg lg:max-w-[28vw] lg:flex-1">
                 <WindowCard title="Security & Compliance" className="bg-[#0A0B10]/90 text-white border-white/5 shadow-2xl h-full" delay={0.8}>
                    <div className="space-y-6 md:space-y-8">
                       <div className="flex flex-col gap-2 border-l-2 border-green-500 pl-6">
                         <p className="text-micro text-green-500 opacity-80 uppercase">Shift-Left Security</p>
                         <p className="text-2xl md:text-3xl font-bold text-white tracking-tighter leading-none">Zero-Trust IaC</p>
                       </div>
                       <p className="text-base md:text-lg font-medium text-white/40 leading-relaxed ml-6">
                          Ensuring SOC2 compliance through automated policy-as-code (OPA) and cryptographic identity verification across all service meshes.
                       </p>
                       <div className="flex items-center gap-4 ml-6 pt-6 border-t border-white/5">
                          <div className="flex -space-x-3">
                             {[1,2,3].map(i => <div key={i} className="w-8 h-8 rounded-full bg-white/10 border-2 border-black" />)}
                          </div>
                          <span className="text-[10px] text-white/20 uppercase tracking-widest">Active Policies: 142</span>
                       </div>
                    </div>
                 </WindowCard>
               </div>
             </div>
          </section>

          {/* Section 4: Systems (Projects) */}
            <section className="horizontal-section relative flex h-full w-screen items-center bg-black overflow-hidden p-6 md:p-12 lg:p-20">
              <div className="absolute inset-0 bg-gradient-to-tr from-[#FAFF00]/5 to-transparent -z-10 pointer-events-none" />
             
             <div className="absolute inset-0 z-10 pointer-events-none">
                <Canvas camera={{ position: [0, 0, 15], fov: 45 }}>
                  <ambientLight intensity={0.5} />
                  <ClusterScene />
                  <Environment preset="night" />
                </Canvas>
             </div>

             <div className="relative h-full w-full z-30 content-max-w flex flex-col justify-between py-12 pb-24 md:pb-12">
               <div className="flex flex-col max-w-2xl">
                 <span className="text-micro text-brand-yellow/30 block mb-4 px-4 border-l-2 border-brand-yellow/20 font-bold uppercase tracking-widest leading-none">Ecosystem / 04</span>
                 <h2 className="text-title font-black text-white tracking-tighter leading-none mb-6">Ecosystem.</h2>
                 <div className="flex flex-col gap-3 ml-4">
                   <p className="text-[10px] md:text-xs text-white/20 font-bold max-w-xs leading-loose tracking-[0.3em] uppercase">
                     [ Distributed Reliability // Multi-Cloud Mesh // Fault Tolerant Fabric ]
                   </p>
                   <div className="flex items-center gap-4">
                     <div className="h-[1px] w-12 bg-brand-yellow/20"></div>
                     <span className="text-[10px] text-brand-yellow font-mono uppercase tracking-[0.4em] font-bold animate-pulse">production ready</span>
                   </div>
                 </div>
               </div>

               <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-center lg:items-stretch justify-center w-full">
                 <div className="w-full max-w-sm lg:flex-1">
                   <WindowCard title="Cluster Lifecycle" delay={0.3} className="bg-black/60 border-white/5 text-white shadow-[0_0_80px_rgba(0,0,0,0.8)] backdrop-blur-xl h-full">
                       <div className="space-y-6">
                         <div className="flex flex-col gap-2 border-l-2 border-[#FAFF00] pl-4">
                           <span className="text-micro text-[#FAFF00] font-bold opacity-80 uppercase tracking-widest">Platform / Kubernetes</span>
                           <h3 className="font-bold text-xl md:text-2xl tracking-tighter">Elastic Mesh</h3>
                         </div>
                         <p className="text-xs md:text-sm font-medium text-white/50 leading-relaxed">
                           Automated VPC orchestration and self-healing EKS clusters using GitOps (ArgoCD) and Istio for service transparency and traffic shaping.
                         </p>
                         <div className="grid grid-cols-2 gap-2 pt-4 border-t border-white/5">
                            <div className="flex flex-col">
                               <span className="text-[8px] text-white/30 uppercase tracking-[0.1em]">Availability</span>
                               <span className="text-xs font-mono text-green-400">99.99%</span>
                            </div>
                            <div className="flex flex-col">
                               <span className="text-[8px] text-white/30 uppercase tracking-[0.1em]">Clusters</span>
                               <span className="text-xs font-mono text-brand-cyan">PROD // STG</span>
                            </div>
                         </div>
                       </div>
                    </WindowCard>
                 </div>
                  
                 <div className="w-full max-w-sm lg:flex-1">
                    <WindowCard title="Global Resilience" delay={0.5} className="bg-black/60 border-white/5 text-white shadow-[0_0_80px_rgba(0,0,0,0.8)] backdrop-blur-xl h-full">
                       <div className="space-y-6">
                         <div className="flex flex-col gap-2 border-l-2 border-brand-cyan pl-4">
                           <span className="text-micro text-brand-cyan font-bold opacity-80 uppercase tracking-widest">Infrastructure / Network</span>
                           <h3 className="font-bold text-xl md:text-2xl tracking-tighter">Zero-Trust Fabric</h3>
                         </div>
                         <p className="text-xs md:text-sm font-medium text-white/50 leading-relaxed">
                           Terraform-driven multi-cloud networking with granular security boundaries and edge optimization via global Cloudflare mesh.
                         </p>
                         <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5">
                           {["WAF", "mTLS", "Anycast"].map(tag => (
                              <span key={tag} className="px-2 py-1 bg-white/5 text-[8px] font-bold text-white/30 border border-white/10 rounded uppercase tracking-widest">{tag}</span>
                           ))}
                         </div>
                       </div>
                    </WindowCard>
                 </div>

                 <div className="w-full max-w-sm lg:flex-1">
                    <WindowCard title="SRE & Observation" delay={0.7} className="bg-black/60 border-white/5 text-white shadow-[0_0_80px_rgba(0,0,0,0.8)] backdrop-blur-xl h-full">
                       <div className="space-y-6">
                         <div className="flex flex-col gap-2 border-l-2 border-white/40 pl-4">
                           <span className="text-micro text-white/40 font-bold opacity-80 uppercase tracking-widest">SRE / Monitoring</span>
                           <h3 className="font-bold text-xl md:text-2xl tracking-tighter">Unified Insight</h3>
                         </div>
                         <div className="space-y-4">
                            <p className="text-xs md:text-sm font-medium text-white/50 leading-relaxed">
                              High-cardinality telemetry and log aggregation using Prometheus, Grafana, and ELK. Automated alerting with incident response playbooks.
                            </p>
                            <div className="h-10 w-full bg-white/5 rounded relative overflow-hidden flex items-end gap-1 p-1">
                               {[0.4, 0.7, 0.5, 0.9, 0.6, 0.8, 0.4, 0.7].map((h, i) => (
                                  <motion.div 
                                     key={i}
                                     initial={{ height: 0 }}
                                     animate={{ height: `${h * 100}%` }}
                                     transition={{ repeat: Infinity, duration: 1 + Math.random(), repeatType: "reverse" }}
                                     className="flex-1 bg-brand-yellow/30"
                                  />
                               ))}
                            </div>
                         </div>
                       </div>
                    </WindowCard>
                 </div>
               </div>
             </div>
            </section>
          </div>

            <div className="absolute bottom-20 right-20 flex flex-col items-end opacity-10 hover:opacity-100 transition-opacity">
               <span className="text-[10px] font-bold tracking-[0.5em] text-brand-yellow uppercase">STABLE BUILD v1.4.0</span>
               <span className="text-[120px] font-black tracking-tighter text-white/5 leading-none">2026</span>
        </div>

        <div className="absolute bottom-4 right-4 z-40 flex items-center gap-4 text-[9px] font-mono uppercase tracking-[0.4em] text-white/60 md:bottom-6 md:left-6 md:right-auto md:text-[10px] md:text-white/80">
          <a
            href="/solankironak.pdf"
            target="_blank"
            rel="noreferrer"
            download
            className="hover:text-white transition-all hover:scale-110 bg-black/50 backdrop-blur-md p-2 rounded md:bg-transparent md:p-0"
          >
            resume
          </a>
          <a
            href="https://github.com/ronaksolanki98"
            target="_blank"
            rel="noreferrer"
            className="hover:text-white transition-all hover:scale-110 bg-black/50 backdrop-blur-md p-2 rounded md:bg-transparent md:p-0"
          >
            github
          </a>
          <a
            href="https://www.linkedin.com/in/ronak-solanki-80a912264/"
            target="_blank"
            rel="noreferrer"
            className="hover:text-white transition-all hover:scale-110 bg-black/50 backdrop-blur-md p-2 rounded md:bg-transparent md:p-0"
          >
            linkedin
          </a>
        </div>
      </div>
    </>
  );
}
