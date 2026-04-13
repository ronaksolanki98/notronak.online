"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Float, MeshTransmissionMaterial } from "@react-three/drei";

export function PipelineScene() {
  const codePacketRef = useRef<THREE.Mesh>(null);
  const dataStreamRef = useRef<THREE.Group>(null);
  const tubeRef = useRef<THREE.Mesh>(null);

  // Generate random data "bits" for the neon pulse effect
  const neonBits = useMemo(() => {
    return [...Array(10)].map(() => ({
      position: [0, (Math.random() - 0.5) * 8, 0] as [number, number, number],
      speed: 0.5 + Math.random() * 2,
      offset: Math.random() * Math.PI * 2
    }));
  }, []);

  const bitsRefs = useRef<THREE.Mesh[]>([]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    
    // Main tube rotation/pulse
    if (tubeRef.current) {
       tubeRef.current.rotation.y = t * 0.1;
    }

    // High-speed "Code Packet"
    if (codePacketRef.current) {
      const speed = 3;
      const y = ((t * speed) % 10) - 5;
      codePacketRef.current.position.set(0, y, 0);
      const material = codePacketRef.current.material as THREE.MeshStandardMaterial;
      material.emissiveIntensity = 8 + Math.sin(t * 20) * 4;
    }

    // Subtle neon bits movement
    bitsRefs.current.forEach((bit, i) => {
      if (bit) {
        const data = neonBits[i];
        const y = ((data.position[1] + t * data.speed + 4) % 8) - 4;
        bit.position.y = y;
        const mat = bit.material as THREE.MeshStandardMaterial;
        mat.emissiveIntensity = 1 + Math.sin(t * 5 + data.offset) * 0.5;
      }
    });
  });

  return (
    <group rotation={[0.4, -0.2, 0]} scale={1.2}>
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
        {/* Main "Glass Fiber" Tube */}
        <mesh ref={tubeRef}>
          <cylinderGeometry args={[0.6, 0.6, 8, 32]} />
          <MeshTransmissionMaterial
            backside
            samples={8}
            thickness={1}
            chromaticAberration={0.05}
            anisotropy={0.2}
            distortion={0.2}
            distortionScale={0.3}
            temporalDistortion={0.2}
            clearcoat={1}
            attenuationDistance={1.5}
            attenuationColor="#ffffff"
            color="#22D3EE"
            transmission={1}
            metalness={0.4}
            roughness={0.1}
          />
        </mesh>

        {/* Internal Glow core */}
        <mesh>
          <cylinderGeometry args={[0.25, 0.25, 8, 16]} />
          <meshBasicMaterial color="#00FFFF" transparent opacity={0.1} />
        </mesh>

        {/* Neon Bits (Small data packets) */}
        {neonBits.map((_, i) => (
          <mesh key={i} ref={(el) => { if (el) bitsRefs.current[i] = el; }}>
            <sphereGeometry args={[0.08, 12, 12]} />
            <meshStandardMaterial color="#000000" emissive="#00FFFF" emissiveIntensity={4} />
          </mesh>
        ))}

        {/* Main Fast Packet */}
        <mesh ref={codePacketRef}>
          <capsuleGeometry args={[0.18, 0.5, 8, 8]} />
          <meshStandardMaterial color="#000000" emissive="#FAFF00" emissiveIntensity={10} />
        </mesh>

        {/* Glowing Rings */}
        {[...Array(8)].map((_, i) => (
          <mesh key={`ring-${i}`} position={[0, -4 + i * 1.15, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.65, 0.03, 12, 48]} />
            <meshStandardMaterial color="#000000" emissive="#00FFFF" emissiveIntensity={2} transparent opacity={0.5} />
          </mesh>
        ))}
      </Float>
    </group>
  );
}
