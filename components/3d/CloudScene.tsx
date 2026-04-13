"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Float, MeshTransmissionMaterial, Sparkles, Cloud, Clouds } from "@react-three/drei";

export function CloudScene() {
  const group = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (group.current) {
      group.current.rotation.y = t * 0.05;
      group.current.rotation.x = Math.sin(t * 0.1) * 0.1;
      
      // "Breathing" scale animation for the entire group
      const scale = 1 + Math.sin(t * 0.5) * 0.05;
      group.current.scale.set(scale, scale, scale);
    }

    if (coreRef.current) {
       // Core pulse
       const coreScale = 2 + Math.sin(t * 1.2) * 0.2;
       coreRef.current.scale.set(coreScale, coreScale, coreScale);
       const mat = coreRef.current.material as THREE.MeshBasicMaterial;
       mat.opacity = 0.02 + Math.sin(t * 1.2) * 0.01;
    }
  });

  // Balanced spheres for the "Cool Cloud" look - Denser and more organic
  const cloudSpheres = useMemo(() => [
    { position: [0, 0, 0] as [number, number, number], scale: 1.8 },
    { position: [-1.2, -0.3, 0.6] as [number, number, number], scale: 1.1 },
    { position: [1.2, 0.4, -0.6] as [number, number, number], scale: 1.3 },
    { position: [-0.5, 0.8, -1.0] as [number, number, number], scale: 1.0 },
    { position: [0.6, -0.7, 1.0] as [number, number, number], scale: 1.1 },
    { position: [0.8, 0.5, 0.8] as [number, number, number], scale: 0.9 },
    { position: [-0.8, -0.6, -0.5] as [number, number, number], scale: 1.2 },
    { position: [0.2, 1.0, 0.2] as [number, number, number], scale: 0.8 },
  ], []);

  return (
    <group>
      <Clouds material={THREE.MeshBasicMaterial}>
        <Cloud 
          segments={40} 
          bounds={[10, 2, 2]} 
          volume={10} 
          color="#1A1A1A" 
          opacity={0.3} 
          speed={0.2}
          fade={10}
        />
      </Clouds>

      <Float speed={1.5} rotationIntensity={0.6} floatIntensity={1}>
        <group ref={group}>
          {/* Enhanced Data Nodes */}
          {cloudSpheres.map((p, i) => (
            <mesh key={i} position={p.position} scale={p.scale}>
              <sphereGeometry args={[1, 32, 32]} />
              <MeshTransmissionMaterial
                backside
                samples={8}
                thickness={0.5}
                chromaticAberration={0.1}
                anisotropy={0.5}
                distortion={0.5}
                distortionScale={0.5}
                temporalDistortion={0.2}
                clearcoat={1}
                color={i % 2 === 0 ? "#00FFFF" : "#FFFFFF"}
                transmission={1}
                metalness={0.1}
                roughness={0.05}
                ior={1.1}
              />
              {/* Inner Node Core */}
              <mesh scale={0.4}>
                <sphereGeometry args={[1, 16, 16]} />
                <meshStandardMaterial color="#00FFFF" emissive="#00FFFF" emissiveIntensity={4} />
              </mesh>
            </mesh>
          ))}
        </group>
      </Float>

      {/* Atmospheric Particles */}
      <Sparkles count={120} scale={15} size={2} speed={0.4} opacity={0.6} color="#22D3EE" />
      
      {/* Central Architecture Hub Glow */}
      <mesh ref={coreRef} scale={2}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial color="#22D3EE" transparent opacity={0.05} />
      </mesh>
    </group>
  );
}
