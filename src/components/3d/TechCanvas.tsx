'use client';

import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

interface TechCanvasProps {
  color?: string;
  shapeIndex?: number;
}

function TechMesh({ color = '#e06b3a', shapeIndex = 0 }: TechCanvasProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * (hovered ? 0.9 : 0.4);
      meshRef.current.rotation.y += delta * (hovered ? 1.4 : 0.6);
    }
  });

  const renderGeometry = () => {
    switch (shapeIndex % 4) {
      case 0:
        // Torus knot for AI / Neural Networks
        return <torusKnotGeometry args={[0.9, 0.28, 64, 16]} />;
      case 1:
        // Octahedron / Diamond for Systems & Databases
        return <octahedronGeometry args={[1.3, 0]} />;
      case 2:
        // Cube / Prism for UI & Frontend
        return <boxGeometry args={[1.6, 1.6, 1.6]} />;
      case 3:
        // Dodecahedron for Cloud & Infrastructure
        return <dodecahedronGeometry args={[1.3, 0]} />;
      default:
        return <icosahedronGeometry args={[1.3, 1]} />;
    }
  };

  return (
    <Float speed={2.5} rotationIntensity={1.2} floatIntensity={1.5}>
      <ambientLight intensity={0.8} />
      <directionalLight position={[3, 5, 3]} intensity={1.8} color="#ffffff" />
      <pointLight position={[-3, -3, -3]} intensity={1.2} color={color} />

      <mesh
        ref={meshRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        scale={hovered ? 1.2 : 1}
      >
        {renderGeometry()}
        <meshStandardMaterial
          color={color}
          roughness={0.2}
          metalness={0.8}
          wireframe={hovered}
          flatShading
          emissive={color}
          emissiveIntensity={hovered ? 0.6 : 0.25}
        />
      </mesh>
    </Float>
  );
}

export default function TechCanvas({ color = '#e06b3a', shapeIndex = 0 }: TechCanvasProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-20 h-20 sm:w-28 sm:h-28 bg-white/5 rounded-2xl animate-pulse" />;
  }

  return (
    <div className="w-20 h-20 sm:w-28 sm:h-28">
      <Canvas camera={{ position: [0, 0, 4.2], fov: 50 }}>
        <TechMesh color={color} shapeIndex={shapeIndex} />
      </Canvas>
    </div>
  );
}
