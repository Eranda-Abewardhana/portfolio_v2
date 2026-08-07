'use client';

import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sparkles, Float } from '@react-three/drei';
import * as THREE from 'three';

function RotatingCore() {
  const outerRef = useRef<THREE.Mesh>(null);
  const innerRef = useRef<THREE.Mesh>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (outerRef.current) {
      outerRef.current.rotation.x = t * 0.4;
      outerRef.current.rotation.y = t * 0.6;
    }
    if (innerRef.current) {
      innerRef.current.rotation.y = -t * 0.8;
      const s = 1 + Math.sin(t * 3) * 0.08;
      innerRef.current.scale.set(s, s, s);
    }
    if (ring1Ref.current) {
      ring1Ref.current.rotation.x = t * 0.8;
      ring1Ref.current.rotation.y = t * 0.3;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.x = -t * 0.5;
      ring2Ref.current.rotation.z = t * 0.7;
    }
  });

  return (
    <group>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        {/* Outer 3D Wireframe Icosahedron */}
        <mesh ref={outerRef}>
          <icosahedronGeometry args={[1.8, 1]} />
          <meshBasicMaterial color="#e06b3a" wireframe transparent opacity={0.5} />
        </mesh>

        {/* Inner Glowing 3D Sphere Core */}
        <mesh ref={innerRef}>
          <sphereGeometry args={[0.9, 32, 32]} />
          <meshStandardMaterial
            color="#f59e0b"
            emissive="#e06b3a"
            emissiveIntensity={1.8}
            roughness={0.2}
            metalness={0.8}
          />
        </mesh>

        {/* Orbital Ring 1 */}
        <mesh ref={ring1Ref}>
          <torusGeometry args={[2.3, 0.015, 16, 100]} />
          <meshBasicMaterial color="#f59e0b" transparent opacity={0.7} />
        </mesh>

        {/* Orbital Ring 2 */}
        <mesh ref={ring2Ref}>
          <torusGeometry args={[2.6, 0.015, 16, 100]} />
          <meshBasicMaterial color="#e06b3a" transparent opacity={0.5} />
        </mesh>
      </Float>

      <Sparkles count={50} scale={6} size={2.5} speed={0.6} color="#f59e0b" />
    </group>
  );
}

export default function LoaderCanvas() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="w-full h-full">
      <Canvas camera={{ position: [0, 0, 5.5], fov: 45 }}>
        <ambientLight intensity={1.5} />
        <pointLight position={[5, 5, 5]} intensity={2.5} color="#f59e0b" />
        <pointLight position={[-5, -5, -5]} intensity={1.5} color="#e06b3a" />
        <RotatingCore />
      </Canvas>
    </div>
  );
}
