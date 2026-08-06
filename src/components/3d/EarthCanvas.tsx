'use client';

import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

function HologramEarth() {
  const earthRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (earthRef.current) {
      earthRef.current.rotation.y += delta * 0.25;
    }
    if (coreRef.current) {
      coreRef.current.rotation.x += delta * 0.15;
    }
  });

  return (
    <group ref={earthRef} scale={1.35}>
      <mesh ref={coreRef}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial
          color="#e06b3a"
          emissive="#e06b3a"
          emissiveIntensity={0.5}
          wireframe
          transparent
          opacity={0.5}
        />
      </mesh>

      <mesh>
        <sphereGeometry args={[1.15, 24, 24]} />
        <meshStandardMaterial
          color="#f59e0b"
          emissive="#f59e0b"
          emissiveIntensity={0.3}
          wireframe
          transparent
          opacity={0.3}
        />
      </mesh>

      <mesh rotation={[Math.PI / 4, 0, 0]}>
        <torusGeometry args={[1.5, 0.015, 16, 100]} />
        <meshStandardMaterial color="#1a2a4a" emissive="#c45528" emissiveIntensity={0.8} />
      </mesh>

      {[
        [0.8, 0.5, 0.4],
        [-0.7, -0.4, 0.6],
        [0.3, -0.8, -0.5],
        [-0.5, 0.7, -0.4],
      ].map((pos, idx) => (
        <mesh key={idx} position={pos as [number, number, number]}>
          <sphereGeometry args={[0.05, 12, 12]} />
          <meshStandardMaterial color="#f59e0b" emissive="#f59e0b" emissiveIntensity={1} />
        </mesh>
      ))}
    </group>
  );
}

export default function EarthCanvas() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-full h-full min-h-[350px] md:min-h-[450px] flex items-center justify-center">
        <div className="w-10 h-10 rounded-full border-2 border-t-transparent animate-spin" style={{ borderColor: '#e06b3a', borderTopColor: 'transparent' }} />
      </div>
    );
  }

  return (
    <div className="w-full h-full min-h-[350px] md:min-h-[450px] cursor-grab active:cursor-grabbing flex items-center justify-center">
      <Canvas camera={{ position: [0, 0, 6.5], fov: 42 }}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[5, 5, 5]} intensity={1.5} color="#f59e0b" />
        <pointLight position={[-5, -5, -5]} intensity={1} color="#e06b3a" />
        <HologramEarth />
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1.5} />
      </Canvas>
    </div>
  );
}
