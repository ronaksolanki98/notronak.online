"use client";

import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Text, Html, RoundedBox } from "@react-three/drei";

export function TerminalScene() {
  const group = useRef<THREE.Group>(null);
  const screenRef = useRef<THREE.Mesh>(null);
  
  // Subtle floating animation
  useFrame((state) => {
    if (group.current) {
      group.current.position.y = Math.sin(state.clock.elapsedTime * 1.5) * 0.1;
      group.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
    }
  });

  return (
    <group ref={group} rotation={[0, -0.2, 0]} scale={1.1}>
      {/* Main Terminal Body - Cyberpunk/Old Mac style */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[3, 2.5, 2]} />
        <meshStandardMaterial color="#0A0A0C" roughness={0.1} metalness={0.9} />
      </mesh>
      
      {/* Front Bezel */}
      <mesh position={[0, 0, 1.05]}>
        <boxGeometry args={[2.8, 2.3, 0.2]} />
        <meshStandardMaterial color="#111111" roughness={0.4} />
      </mesh>

      {/* Glowing Screen */}
      <mesh position={[0, 0.1, 1.16]} ref={screenRef}>
        <planeGeometry args={[2.5, 1.8]} />
        <meshBasicMaterial color="#001100" />
      </mesh>
      
      {/* Screen CRT Effect Lines */}
      {[...Array(20)].map((_, i) => (
        <mesh key={`crt-${i}`} position={[0, 0.9 - i * 0.09, 1.17]}>
          <planeGeometry args={[2.5, 0.02]} />
          <meshBasicMaterial color="#00FF00" transparent opacity={0.05} />
        </mesh>
      ))}

      {/* Screen Content - HTML Overlay matching the reference */}
      <Html
        transform
        occlude
        position={[0, 0.1, 1.18]}
        style={{
          width: '500px',
          height: '360px',
          backgroundColor: '#002200',
          border: '2px solid #00FF00',
          boxShadow: '0 0 20px #00FF00 inset',
          padding: '24px',
          color: '#00FF00',
          fontFamily: 'monospace',
          overflow: 'hidden',
          borderRadius: '8px'
        }}
      >
        <div className="h-full flex flex-col">
           <div className="flex justify-between items-end border-b border-[#00FF00]/30 pb-2 mb-4">
             <h2 className="text-3xl font-bold tracking-tight">System Logs</h2>
             <span className="text-sm animate-pulse">_ONLINE</span>
           </div>
           
           <div className="flex-1 text-sm leading-relaxed space-y-2">
             <p>{`> User authentication... OK`}</p>
             <p>{`> Loading profile data... OK`}</p>
             <p className="text-[#FAFF00]">{`> ERROR: Coffee levels critically low.`}</p>
             <p>{`> Initiating deployment sequence...`}</p>
             <div className="max-w-[80%] h-2 bg-[#00FF00]/20 mt-2 mb-2">
               <div className="h-full bg-[#00FF00] w-[65%]" />
             </div>
             <p className="mt-4 break-words">
               {`<p>Hey, I'm Ronak. I automate things so I don't have to do them twice.</p>`}
             </p>
           </div>
           
           <div className="mt-auto flex justify-between text-xs pt-4 border-t border-[#00FF00]/30">
              <span>Press ENTER to continue</span>
              <span>v1.0.4</span>
           </div>
        </div>
      </Html>

      {/* Decorative neon accents on the cabinet */}
      <mesh position={[-1.6, 0, 0]}>
         <boxGeometry args={[0.1, 2.5, 0.1]} />
         <meshStandardMaterial color="#00FFFF" emissive="#00FFFF" emissiveIntensity={2} />
      </mesh>
      
      {/* Base/Pedestal */}
      <mesh position={[0, -1.5, 0]}>
        <cylinderGeometry args={[1, 1.2, 0.5, 32]} />
        <meshStandardMaterial color="#050505" roughness={0.8} />
      </mesh>
    </group>
  );
}
