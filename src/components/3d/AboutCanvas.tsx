'use client';

import React, { useRef, useState, useEffect, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, useTexture, OrbitControls } from '@react-three/drei';
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

  const W = 1.9;
  const H = 2.7;

  return (
    <group position={position} rotation={rotation}>
      {/* Photo Front Face */}
      <mesh position={[0, 0, 0.025]}>
        <planeGeometry args={[W, H]} />
        <meshBasicMaterial map={texture} side={THREE.FrontSide} />
      </mesh>

      {/* Photo Back Face (Duplicate so 3D rotation looks perfect from behind) */}
      <mesh position={[0, 0, -0.025]} rotation={[0, Math.PI, 0]}>
        <planeGeometry args={[W, H]} />
        <meshBasicMaterial map={texture} side={THREE.FrontSide} />
      </mesh>

      {/* Metallic Frame Bevel */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[W + 0.08, H + 0.08, 0.04]} />
        <meshStandardMaterial
          color="#151d2a"
          metalness={0.9}
          roughness={0.2}
        />
      </mesh>

      {/* Glowing Border Edges */}
      <lineSegments position={[0, 0, 0]}>
        <edgesGeometry args={[new THREE.BoxGeometry(W + 0.1, H + 0.1, 0.045)]} />
        <lineBasicMaterial color={borderColor} transparent opacity={0.85} linewidth={2} />
      </lineSegments>

      {/* Glowing Corner Accents */}
      {[
        [-(W / 2 + 0.05), H / 2 + 0.05, 0.03],
        [W / 2 + 0.05, H / 2 + 0.05, 0.03],
        [-(W / 2 + 0.05), -(H / 2 + 0.05), 0.03],
        [W / 2 + 0.05, -(H / 2 + 0.05), 0.03],
      ].map((pos, idx) => (
        <mesh key={idx} position={pos as [number, number, number]}>
          <boxGeometry args={[0.15, 0.15, 0.03]} />
          <meshStandardMaterial color={borderColor} emissive={borderColor} emissiveIntensity={1.2} />
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
        <torusGeometry args={[3.2, 0.012, 16, 100]} />
        <meshBasicMaterial color="#e06b3a" transparent opacity={0.4} />
      </mesh>
      <mesh ref={ref2}>
        <torusGeometry args={[3.5, 0.012, 16, 100]} />
        <meshBasicMaterial color="#f59e0b" transparent opacity={0.3} />
      </mesh>
    </group>
  );
}

function CreativePhotoGallery() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      const t = state.clock.getElapsedTime();
      groupRef.current.rotation.y = t * 0.2; // Slow continuous 3D rotation
    }
  });

  return (
    <group ref={groupRef}>
      {/* 3 Photos arranged in a 3D Triangle Prism */}
      <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.8} position={[0, 0, 0]}>
        {/* Photo 1 - Outdoor Tree */}
        <CreativePhotoCard
          texturePath="/images/eranda_tree.png"
          position={[0, 0, 1.8]}
          rotation={[0, 0, 0]}
          borderColor="#e06b3a"
        />

        {/* Photo 2 - Suit Thinking */}
        <CreativePhotoCard
          texturePath="/images/eranda_suit_thinking.png"
          position={[1.56, 0, -0.9]}
          rotation={[0, (Math.PI * 2) / 3, 0]}
          borderColor="#f59e0b"
        />

        {/* Photo 3 - Stairs Suit Portrait */}
        <CreativePhotoCard
          texturePath="/images/eranda_stairs.png"
          position={[-1.56, 0, -0.9]}
          rotation={[0, -(Math.PI * 2) / 3, 0]}
          borderColor="#c45528"
        />
      </Float>
      <OrbitRings />
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
      <Canvas camera={{ position: [0, 0, 6.2], fov: 48 }}>
        <ambientLight intensity={1.2} />
        <directionalLight position={[5, 8, 5]} intensity={2.0} color="#ffffff" />
        <directionalLight position={[-5, -5, -5]} intensity={1.0} color="#f59e0b" />
        <pointLight position={[0, 4, 4]} intensity={1.5} color="#e06b3a" />
        <Suspense fallback={null}>
          <CreativePhotoGallery />
        </Suspense>
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1.0} />
      </Canvas>
    </div>
  );
}
