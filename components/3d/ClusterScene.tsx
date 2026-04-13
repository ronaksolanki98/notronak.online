"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Float, Points, PointMaterial, Line } from "@react-three/drei";

export function ClusterScene() {
  const group = useRef<THREE.Group>(null);
  
  // Create ultra-high-density point cloud for "Starfield" feel
  const count = 4000;
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 3 + Math.random() * 8; // Varied spread for depth
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
    }
    return pos;
  }, []);

  // Dense Neural Connections (Even more lines for better web effect)
  const connectionLines = useMemo(() => {
    const lines = [];
    for (let i = 0; i < 80; i++) {
        const startIdx = Math.floor(Math.random() * count) * 3;
        const endIdx = Math.floor(Math.random() * count) * 3;
        lines.push({
            start: [positions[startIdx], positions[startIdx+1], positions[startIdx+2]],
            end: [positions[endIdx], positions[endIdx+1], positions[endIdx+2]]
        });
    }
    return lines;
  }, [positions]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (group.current) {
      group.current.rotation.y = t * 0.04;
      group.current.rotation.x = Math.sin(t * 0.06) * 0.08;
      
      // Core pulse scale
      const s = 1 + Math.sin(t * 2) * 0.05;
      group.current.scale.set(s, s, s);
    }
  });

  return (
    <group ref={group}>
      <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.3}>
        <Points positions={positions} stride={3} frustumCulled={false}>
          <PointMaterial
            transparent
            color={Math.random() > 0.8 ? "#22D3EE" : "#FAFF00"}
            size={0.03}
            sizeAttenuation={true}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
            opacity={0.8}
          />
        </Points>
        
        {/* Dynamic Neural Connections */}
        {connectionLines.map((line, i) => (
            <Line
                key={i}
                points={[line.start as [number, number, number], line.end as [number, number, number]]}
                color={i % 5 === 0 ? "#22D3EE" : "#FAFF00"}
                lineWidth={0.5}
                transparent
                opacity={0.1}
            />
        ))}

        {/* Central "Core" */}
        <mesh>
          <icosahedronGeometry args={[1.8, 2]} />
          <meshBasicMaterial color="#FAFF00" wireframe transparent opacity={0.2} />
        </mesh>
        
        {/* Orbital Rings - Refined aesthetic */}
        {[0, 1, 2, 3, 4].map((i) => (
          <mesh key={i} rotation={[Math.random() * Math.PI, Math.random() * Math.PI, 0]}>
            <torusGeometry args={[2.5 + i * 0.8, 0.005 + Math.random() * 0.01, 16, 120]} />
            <meshBasicMaterial color={i % 2 === 0 ? "#FAFF00" : "#22D3EE"} transparent opacity={0.1} />
          </mesh>
        ))}
      </Float>
    </group>
  );
}
