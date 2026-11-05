'use client';
import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/* ── Floating amber particles only (no photo plane) ── */
function Particles({ count = 60 }: { count?: number }) {
  const positions = useRef<Float32Array>(
    new Float32Array(Array.from({ length: count * 3 }, () => (Math.random() - 0.5) * 14))
  );
  const mesh = useRef<THREE.Points>(null);
  useFrame((state) => {
    if (!mesh.current) return;
    mesh.current.rotation.y = state.clock.elapsedTime * 0.012;
    mesh.current.rotation.x = state.clock.elapsedTime * 0.006;
  });
  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions.current, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#f59e0b" size={0.04} transparent opacity={0.45} sizeAttenuation />
    </points>
  );
}

/* ── Glowing corner accent lines ── */
function CornerAccents() {
  const ref1 = useRef<THREE.Mesh>(null);
  const ref2 = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const glow = 0.55 + Math.sin(t * 1.6) * 0.3;
    if (ref1.current) (ref1.current.material as THREE.MeshBasicMaterial).opacity = glow;
    if (ref2.current) (ref2.current.material as THREE.MeshBasicMaterial).opacity = glow * 0.7;
  });

  return (
    <group>
      {/* Top-right corner */}
      <mesh ref={ref1} position={[3.8, 2.6, 0]}>
        <planeGeometry args={[1.2, 0.025]} />
        <meshBasicMaterial color="#e06b3a" transparent opacity={0.7} />
      </mesh>
      <mesh position={[4.4, 2.0, 0]}>
        <planeGeometry args={[0.025, 1.2]} />
        <meshBasicMaterial color="#e06b3a" transparent opacity={0.5} />
      </mesh>
      {/* Bottom-right corner */}
      <mesh ref={ref2} position={[3.8, -2.6, 0]}>
        <planeGeometry args={[1.2, 0.025]} />
        <meshBasicMaterial color="#f59e0b" transparent opacity={0.6} />
      </mesh>
      <mesh position={[4.4, -2.0, 0]}>
        <planeGeometry args={[0.025, 1.2]} />
        <meshBasicMaterial color="#f59e0b" transparent opacity={0.4} />
      </mesh>
    </group>
  );
}

/* ── HeroCanvas: particles + accent lines only, NO photo plane ── */
export default function HeroCanvas() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  if (!mounted) return null;

  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 55 }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 2]}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
    >
      <ambientLight intensity={0.5} />
      <Particles />
      <CornerAccents />
    </Canvas>
  );
}
