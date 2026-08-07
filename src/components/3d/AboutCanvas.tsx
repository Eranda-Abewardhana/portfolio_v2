'use client';

import React, { useRef, useState, useEffect, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, useTexture, OrbitControls, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

function CreativePhotoCard({
  texturePath,
  position,
  rotation,
  borderColor,
}: {
  texturePath: string;
  position: [number, number, number];
  rotation: [number, number, number];
  borderColor: string;
}) {
  const texture = useTexture(texturePath);
  texture.colorSpace = THREE.SRGBColorSpace;
  const [hovered, setHovered] = useState(false);
  const cardRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (cardRef.current) {
      cardRef.current.scale.lerp(
        new THREE.Vector3(hovered ? 1.15 : 1, hovered ? 1.15 : 1, hovered ? 1.15 : 1),
        0.1
      );
    }
  });

  const W = 1.7;
  const H = 2.4;

  return (
    <group
      ref={cardRef}
      position={position}
      rotation={rotation}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
      }}
      onPointerOut={() => setHovered(false)}
    >
      {/* Photo Front Face */}
      <mesh position={[0, 0, 0.025]}>
        <planeGeometry args={[W, H]} />
        <meshBasicMaterial map={texture} side={THREE.FrontSide} />
      </mesh>

      {/* Photo Back Face */}
      <mesh position={[0, 0, -0.025]} rotation={[0, Math.PI, 0]}>
        <planeGeometry args={[W, H]} />
        <meshBasicMaterial map={texture} side={THREE.FrontSide} />
      </mesh>

      {/* Metallic Frame Bevel */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[W + 0.08, H + 0.08, 0.04]} />
        <meshStandardMaterial
          color="#0f172a"
          metalness={0.9}
          roughness={0.2}
        />
      </mesh>

      {/* Glowing Border Edges */}
      <lineSegments position={[0, 0, 0]}>
        <edgesGeometry args={[new THREE.BoxGeometry(W + 0.1, H + 0.1, 0.045)]} />
        <lineBasicMaterial
          color={hovered ? '#ffffff' : borderColor}
          transparent
          opacity={hovered ? 1 : 0.85}
          linewidth={2}
        />
      </lineSegments>

      {/* Glowing Corner Accents */}
      {[
        [-(W / 2 + 0.05), H / 2 + 0.05, 0.03],
        [W / 2 + 0.05, H / 2 + 0.05, 0.03],
        [-(W / 2 + 0.05), -(H / 2 + 0.05), 0.03],
        [W / 2 + 0.05, -(H / 2 + 0.05), 0.03],
      ].map((pos, idx) => (
        <mesh key={idx} position={pos as [number, number, number]}>
          <boxGeometry args={[0.14, 0.14, 0.03]} />
          <meshStandardMaterial
            color={borderColor}
            emissive={borderColor}
            emissiveIntensity={hovered ? 2.5 : 1.2}
          />
        </mesh>
      ))}
    </group>
  );
}

function OrbitRings() {
  const ref1 = useRef<THREE.Mesh>(null);
  const ref2 = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (ref1.current) {
      ref1.current.rotation.x = Math.sin(t * 0.3) * 0.3 + 1.2;
      ref1.current.rotation.y = t * 0.15;
    }
    if (ref2.current) {
      ref2.current.rotation.x = Math.cos(t * 0.25) * 0.3 + 1.2;
      ref2.current.rotation.y = -t * 0.2;
    }
  });

  return (
    <group>
      <mesh ref={ref1}>
        <torusGeometry args={[3.6, 0.015, 16, 100]} />
        <meshBasicMaterial color="#e06b3a" transparent opacity={0.45} />
      </mesh>
      <mesh ref={ref2}>
        <torusGeometry args={[3.9, 0.015, 16, 100]} />
        <meshBasicMaterial color="#f59e0b" transparent opacity={0.35} />
      </mesh>
    </group>
  );
}

const CARDS = [
  { texturePath: '/images/DSC04499.jpg.jpeg', borderColor: '#f59e0b' },
  { texturePath: '/images/903673ba-0ffe-4a2a-b89a-60bd48b1736a.png', borderColor: '#10b981' },
  { texturePath: '/images/eranda_suit_thinking.png', borderColor: '#e06b3a' },
  { texturePath: '/images/eranda_tuxedo.png', borderColor: '#3b82f6' },
  { texturePath: '/images/eranda_stairs.png', borderColor: '#ec4899' },
  { texturePath: '/images/eranda_tree.png', borderColor: '#8b5cf6' },
];

function CreativePhotoGallery() {
  const groupRef = useRef<THREE.Group>(null);
  const R = 2.8;
  const count = CARDS.length;

  useFrame((state) => {
    if (groupRef.current) {
      const t = state.clock.getElapsedTime();
      groupRef.current.rotation.y = t * 0.15;
    }
  });

  return (
    <group ref={groupRef}>
      <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.6} position={[0, 0, 0]}>
        {CARDS.map((card, i) => {
          const angle = i * ((Math.PI * 2) / count);
          const x = R * Math.sin(angle);
          const z = R * Math.cos(angle);
          return (
            <CreativePhotoCard
              key={card.texturePath}
              texturePath={card.texturePath}
              position={[x, 0, z]}
              rotation={[0, angle, 0]}
              borderColor={card.borderColor}
            />
          );
        })}
      </Float>
      <OrbitRings />
      <Sparkles count={60} scale={7} size={2.5} speed={0.4} color="#f59e0b" />
    </group>
  );
}

export default function AboutCanvas() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  if (!mounted) {
    return (
      <div className="w-full h-[400px] sm:h-[480px] flex items-center justify-center">
        <div
          className="w-10 h-10 rounded-full border-2 border-t-transparent animate-spin"
          style={{ borderColor: '#e06b3a', borderTopColor: 'transparent' }}
        />
      </div>
    );
  }

  return (
    <div className="w-full h-[400px] sm:h-[480px] cursor-grab active:cursor-grabbing">
      <Canvas camera={{ position: [0, 0, 7.2], fov: 48 }}>
        <ambientLight intensity={1.2} />
        <directionalLight position={[5, 8, 5]} intensity={2.0} color="#ffffff" />
        <directionalLight position={[-5, -5, -5]} intensity={1.0} color="#f59e0b" />
        <pointLight position={[0, 4, 4]} intensity={1.5} color="#e06b3a" />
        <Suspense fallback={null}>
          <CreativePhotoGallery />
        </Suspense>
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.8} />
      </Canvas>
    </div>
  );
}
