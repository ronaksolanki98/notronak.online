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
          <section className="horizontal-section relative flex h-full w-screen items-center grid-safe-area bg-white overflow-hidden">
            <div className="absolute top-[10%] left-[6%] z-20 flex flex-col gap-2">
              <span className="text-[10px] font-mono tracking-[0.4em] font-bold text-brand-blue/80 block mb-6 uppercase">System / Archetype / 01</span>
              <RevealText className="text-[12vw] font-black text-black tracking-tighter leading-[1.05]" delay={0.2}>
                Cloud.
              </RevealText>
              <RevealText className="text-[3vw] font-bold text-black/60 tracking-tight leading-[1.15]" delay={0.4}>
                & DevOps Orchestration
              </RevealText>
            </div>

            <div className="absolute inset-0 z-10">
              <CloudIntro />
            </div>
            
            <div className="absolute bottom-[10%] right-[8%] z-30 max-w-2xl">
               <WindowCard title="Identity" delay={0.6} className="bg-white/80 border-black/5 shadow-[0_32px_120px_-20px_rgba(0,0,0,0.1)]">
                 <div className="flex items-center gap-8 mb-10">
                   <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-brand-cyan to-brand-blue flex items-center justify-center text-white font-bold text-3xl shadow-xl border border-white/20">
                      RS
                   </div>
                   <div className="flex flex-col gap-1">
                     <h2 className="text-4xl font-bold text-black tracking-tighter">Ronak Solanki</h2>
                     <p className="text-[10px] text-brand-blue font-bold tracking-[0.4em] uppercase">Infrastructure & Reliability Engineer</p>
                   </div>
                 </div>
                 
                 <p className="text-xl font-medium text-black/60 leading-relaxed mb-12 text-balance">
                    Architecting resilient cloud ecosystems and distributed orchestration layers. Reducing complexity through precision automation and fault-tolerant CI/CD fabrics.
                 </p>

                 <div className="flex gap-6">
                   <a
                      href="/solankironak.pdf"
                      target="_blank"
                      rel="noreferrer"
                      download
                      className="inline-flex items-center justify-center px-10 py-5 bg-black text-white text-[11px] font-bold rounded-full hover:scale-105 transition-transform active:scale-95 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.1)] tracking-widest uppercase"
                   >
                      RESUME // PDF
                   </a>
                   <a
                      href="mailto:solankironak423@gmail.com"
                      className="px-10 py-5 bg-black/5 text-black border border-black/10 text-[11px] font-bold rounded-full hover:bg-black/10 transition-colors backdrop-blur-sm tracking-widest uppercase inline-flex items-center justify-center"
                   >
                      CONTACT
                   </a>
                </div>
              </WindowCard>
           </div>
         </section>

          {/* Section 2: Philosophy (Craft) */}
          <section className="horizontal-section flex h-full w-screen items-center relative overflow-hidden bg-transparent grid-safe-area shadow-[20px_0_100px_rgba(0,0,0,0.5)]">
             <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(250,255,0,0.2),_transparent_55%)] opacity-40" />
             <div className="absolute inset-0">
               <div className="absolute -top-10 right-[-15%] w-[60vh] h-[60vh] bg-gradient-to-br from-brand-yellow/20 to-transparent rounded-full mix-blend-screen blur-[160px]" />
               <div className="absolute left-[-5%] bottom-20 w-[25vw] h-[25vw] bg-[radial-gradient(circle,_rgba(59,130,246,0.2),_transparent_60%)]" />
               <div className="absolute inset-0 bg-[radial-gradient(circle_at_left_bottom,_rgba(255,255,255,0.04),_transparent_55%)] mix-blend-soft-light" />
             </div>
             <div className="absolute right-[-10%] top-[-5%] w-[80vh] h-[80vh] bg-gradient-to-br from-[#FAFF00]/15 to-transparent rounded-full mix-blend-multiply filter blur-[150px] opacity-20 animate-pulse"></div>
             
             <div className="relative z-10 w-full flex flex-col lg:flex-row items-center justify-center gap-24 px-20">
                <div className="flex flex-col max-w-2xl border-l-[10px] border-brand-yellow py-8">
                  <span className="text-[10px] font-mono font-bold tracking-[0.5em] text-white/40 block mb-6 px-8 uppercase">Concept / 02</span>
                  <RevealText className="text-[12vw] font-black text-white mb-8 leading-[0.9] tracking-tighter px-8" delay={0.1}>
                     Craft.
                  </RevealText>
                  <motion.p 
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1.2, delay: 0.6 }}
                    className="text-2xl font-bold text-white/50 leading-tight max-w-xl px-8"
                  >
                     Obsessing over the intersection of performance, technical excellence, and uncompromising reliability.
                  </motion.p>
               </div>

               <div className="flex flex-col gap-8 w-full max-w-xl">
                 <WindowCard title="Philosophy" delay={0.8} className="bg-black/90 text-white border-white/5 shadow-2xl">
                   <p className="text-2xl font-bold leading-[1.3] text-white italic tracking-tight">
                       "Automate the routine, engineer for failures, and build uncompromisingly observable architectures."
                   </p>
                   <div className="mt-12 pt-8 border-t border-white/5 space-y-3">
                     <p className="text-micro text-white/30 flex justify-between tracking-widest">
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
                   <p className="text-lg text-white/70 leading-relaxed">
                     Building resilient ecosystems with the same exacting craft you see across the scroll—automated, observable, and human-centric.
                   </p>
                   <div className="mt-8 grid gap-4 text-sm text-white/60">
                     {aboutHighlights.map((item) => (
                       <div key={item.label} className="flex justify-between border-b border-white/5 pb-2">
                         <span className="text-xs uppercase tracking-[0.4em] text-white/40">{item.label}</span>
                         <span className="max-w-[60%] text-right text-white/70">{item.detail}</span>
                       </div>
                     ))}
                   </div>
                   <div className="mt-6 flex flex-wrap gap-3 text-[9px] uppercase tracking-[0.4em]">
                     {toolStack.map((tool) => (
                       <span key={tool} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/60">
                         {tool}
                       </span>
                     ))}
                   </div>
                 </WindowCard>
               </div>
             </div>
          </section>

          {/* Section 3: Capability (Scale) */}
          <section className="horizontal-section relative flex h-full w-screen items-center bg-black grid-safe-area">
             <div className="absolute top-[10%] right-[10%] text-right z-20 pointer-events-none">
               <span className="text-[10px] font-mono tracking-[0.4em] font-bold text-white/10 block mb-4 uppercase">Growth / 03</span>
               <RevealText className="text-[14vw] font-black text-brand-yellow/80 tracking-tighter leading-[1.05] drop-shadow-[0_0_60px_rgba(250,255,0,0.1)]" delay={0.2}>
                 Scale.
               </RevealText>
             </div>

            <div className="absolute inset-0 z-10 w-full h-full pointer-events-none">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-yellow/5 to-transparent backdrop-blur-[2px]" />
              <div className="absolute inset-0">
                <div className="absolute -top-32 left-[-10%] h-[130%] w-[110%] border border-white/5 rounded-full opacity-20" />
                <div className="absolute bottom-[-5%] right-[-10%] w-[40%] h-[65%] bg-[radial-gradient(circle,_rgba(59,130,246,0.15),_transparent_70%)]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(250,255,0,0.08),_transparent_60%)] mix-blend-screen" />
              </div>
            </div>
             
             <div className="relative z-30 mt-[20vh] px-[6%] w-full flex flex-col lg:flex-row gap-12 items-start justify-center">
               <div className="flex-1 max-w-lg">
                 <WindowCard title="Infrastructure Lab" className="bg-[#1A1C23]/80 text-white border-white/10 shadow-[0_0_100px_rgba(0,10,20,0.6)]" delay={0.4}>
                    <div className="space-y-8">
                       <div className="flex flex-col gap-2 border-l-2 border-brand-cyan pl-6">
                         <p className="text-[10px] text-brand-cyan font-bold tracking-[0.3em] uppercase">Edge Expansion</p>
                         <p className="text-3xl font-bold text-white tracking-tighter leading-none">Global Deployment</p>
                       </div>
                       <p className="text-lg font-medium text-white/40 leading-relaxed text-balance ml-6">
                         Expanding infrastructure boundaries for high-throughput global operations. Ensuring zero-downtime through immutable state management.
                       </p>
                       <div className="pt-8 border-t border-white/5 flex items-center justify-between ml-6">
                         <div className="flex items-center gap-3">
                           <span className="w-3 h-3 rounded-full bg-brand-cyan animate-pulse shadow-[0_0_12px_#22d3ee]"></span>
                           <span className="text-[10px] text-white/30 font-bold tracking-widest uppercase">Node Established</span>
                         </div>
                         <span className="text-[10px] text-white/20 font-mono">0x4AF92</span>
                       </div>
                    </div>
                 </WindowCard>
               </div>

               <div className="flex-1 max-w-lg lg:mt-24">
                 <WindowCard title="Automation Engine" className="bg-black/80 text-white border-white/5 shadow-2xl" delay={0.6}>
                    <div className="space-y-8">
                       <div className="flex flex-col gap-2 border-l-2 border-brand-yellow pl-6">
                         <p className="text-[10px] text-brand-yellow font-bold tracking-[0.3em] uppercase">Scale / Velocity</p>
                         <p className="text-3xl font-bold text-white tracking-tighter leading-none">CI/CD Orchestration</p>
                       </div>
                       <div className="ml-6 space-y-4">
                         <p className="text-lg font-medium text-white/40 leading-relaxed">
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

               <div className="flex-1 max-w-lg">
                 <WindowCard title="Security & Compliance" className="bg-[#0A0B10]/90 text-white border-white/5 shadow-2xl" delay={0.8}>
                    <div className="space-y-8">
                       <div className="flex flex-col gap-2 border-l-2 border-green-500 pl-6">
                         <p className="text-[10px] text-green-500 font-bold tracking-[0.3em] uppercase">Shift-Left Security</p>
                         <p className="text-3xl font-bold text-white tracking-tighter leading-none">Zero-Trust IaC</p>
                       </div>
                       <p className="text-lg font-medium text-white/40 leading-relaxed ml-6">
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
           <section className="horizontal-section relative flex h-full w-screen items-center bg-transparent grid-safe-area overflow-hidden">
             <div className="absolute inset-0 bg-black -z-20" />
             <div className="absolute inset-0 bg-gradient-to-tr from-[#FAFF00]/5 to-transparent -z-10" />
            
            <div className="absolute inset-0 z-10">
               <Canvas camera={{ position: [0, 0, 15], fov: 45 }}>
                 <ambientLight intensity={0.5} />
                 <ClusterScene />
                 <Environment preset="night" />
               </Canvas>
            </div>

            <div className="relative h-full w-full z-30">
              <div className="absolute top-[5%] left-[5%] flex flex-col shrink-0 max-w-[min(70vw,1100px)] z-40">
                <span className="text-[10px] font-mono tracking-[0.4em] text-brand-yellow/30 block mb-4 px-4 border-l-2 border-brand-yellow/20 font-bold uppercase tracking-widest">Ecosystem / 04</span>
                <RevealText className="text-[8vw] font-black text-white tracking-tighter leading-[1.05] mb-6" delay={0.1}>
                  Ecosystem.
                </RevealText>
                <div className="flex flex-col gap-3 ml-4">
                  <p className="text-[10px] text-white/20 font-bold max-w-xs leading-loose tracking-[0.3em] uppercase">
                    [ Distributed Reliability // Multi-Cloud Mesh // Fault Tolerant Fabric ]
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="h-[1px] w-12 bg-brand-yellow/20"></div>
                    <span className="text-[10px] text-brand-yellow font-mono uppercase tracking-[0.4em] font-bold animate-pulse">production ready</span>
                  </div>
                </div>
              </div>

              <div className="absolute bottom-[8%] left-[5%] right-[5%] flex flex-col lg:flex-row gap-8 items-end justify-center pointer-events-none">
                <div className="pointer-events-auto flex-1 max-w-sm">
                  <WindowCard title="Cluster Lifecycle" delay={0.3} className="bg-black/60 border-white/5 text-white shadow-[0_0_80px_rgba(0,0,0,0.8)] backdrop-blur-xl">
                      <div className="space-y-8">
                        <div className="flex flex-col gap-2 border-l-2 border-[#FAFF00] pl-4">
                          <span className="text-micro text-[#FAFF00] font-bold opacity-80 tracking-widest uppercase">Platform / Kubernetes</span>
                          <h3 className="font-bold text-2xl tracking-tighter">Elastic Mesh</h3>
                        </div>
                        <p className="text-sm font-medium text-white/50 leading-relaxed">
                          Automated VPC orchestration and self-healing EKS clusters using GitOps (ArgoCD) and Istio for service transparency and traffic shaping.
                        </p>
                        <div className="grid grid-cols-2 gap-2 pt-6 border-t border-white/5">
                           <div className="flex flex-col">
                              <span className="text-[8px] text-white/30 uppercase tracking-widest">Availability</span>
                              <span className="text-xs font-mono text-green-400">99.99%</span>
                           </div>
                           <div className="flex flex-col">
                              <span className="text-[8px] text-white/30 uppercase tracking-widest">Clusters</span>
                              <span className="text-xs font-mono text-brand-cyan">PROD // STG</span>
                           </div>
                        </div>
                      </div>
                   </WindowCard>
                </div>
                 
                <div className="pointer-events-auto flex-1 max-w-sm">
                   <WindowCard title="Global Resilience" delay={0.5} className="bg-black/60 border-white/5 text-white shadow-[0_0_80px_rgba(0,0,0,0.8)] backdrop-blur-xl">
                      <div className="space-y-8">
                        <div className="flex flex-col gap-2 border-l-2 border-brand-cyan pl-4">
                          <span className="text-micro text-brand-cyan font-bold opacity-80 tracking-widest uppercase">Infrastructure / Network</span>
                          <h3 className="font-bold text-2xl tracking-tighter">Zero-Trust Fabric</h3>
                        </div>
                        <p className="text-sm font-medium text-white/50 leading-relaxed">
                          Terraform-driven multi-cloud networking with granular security boundaries and edge optimization via global Cloudflare mesh.
                        </p>
                        <div className="flex flex-wrap gap-2 pt-6 border-t border-white/5">
                          {["WAF", "mTLS", "Anycast"].map(tag => (
                             <span key={tag} className="px-2 py-1 bg-white/5 text-[8px] font-bold text-white/30 border border-white/10 rounded uppercase">{tag}</span>
                          ))}
                        </div>
                      </div>
                   </WindowCard>
                </div>

                <div className="pointer-events-auto flex-1 max-w-sm">
                   <WindowCard title="SRE & Observation" delay={0.7} className="bg-black/60 border-white/5 text-white shadow-[0_0_80px_rgba(0,0,0,0.8)] backdrop-blur-xl">
                      <div className="space-y-8">
                        <div className="flex flex-col gap-2 border-l-2 border-white/40 pl-4">
                          <span className="text-micro text-white/40 font-bold opacity-80 tracking-widest uppercase">SRE / Monitoring</span>
                          <h3 className="font-bold text-2xl tracking-tighter">Unified Insight</h3>
                        </div>
                        <div className="space-y-4">
                           <p className="text-sm font-medium text-white/50 leading-relaxed">
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

            <div className="absolute bottom-20 right-20 flex flex-col items-end opacity-10 hover:opacity-100 transition-opacity">
               <span className="text-[10px] font-bold tracking-[0.5em] text-brand-yellow uppercase">STABLE BUILD v1.4.0</span>
               <span className="text-[120px] font-black tracking-tighter text-white/5 leading-none">2026</span>
            </div>
          </section>
        </div>

        <div className="absolute bottom-6 left-6 z-40 flex items-center gap-6 text-[10px] font-mono uppercase tracking-[0.4em] text-white/80">
          <a
            href="/solankironak.pdf"
            target="_blank"
            rel="noreferrer"
            download
            className="hover:text-white transition-colors"
          >
            resume
          </a>
          <a
            href="https://github.com/ronaksolanki98"
            target="_blank"
            rel="noreferrer"
            className="hover:text-white transition-colors"
          >
            github
          </a>
          <a
            href="https://www.linkedin.com/in/ronak-solanki-80a912264/"
            target="_blank"
            rel="noreferrer"
            className="hover:text-white transition-colors"
          >
            linkedin
          </a>
        </div>
      </div>
    </>
  );
}
