import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, Float, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

// DNA Helix Component
const DNAHelix = () => {
  const groupRef = useRef<THREE.Group>(null);

  // Create DNA strands data
  const points = useMemo(() => {
    const temp = [];
    const count = 40; // Number of base pairs
    const height = 8;
    const radius = 1.5;
    const turns = 3;

    for (let i = 0; i < count; i++) {
      const t = i / count;
      const angle = t * Math.PI * 2 * turns;
      const y = (t - 0.5) * height;

      // Strand 1
      const x1 = Math.cos(angle) * radius;
      const z1 = Math.sin(angle) * radius;

      // Strand 2 (opposite)
      const x2 = Math.cos(angle + Math.PI) * radius;
      const z2 = Math.sin(angle + Math.PI) * radius;

      temp.push({
        pos1: [x1, y, z1],
        pos2: [x2, y, z2],
        color: i % 2 === 0 ? '#3B82F6' : '#F8C537' // Blue and Gold
      });
    }
    return temp;
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      // Rotation
      groupRef.current.rotation.y += 0.01;
      // Slight floating wobble
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
    }
  });

  return (
    <group ref={groupRef}>
      {points.map((pt, i) => (
        <group key={i}>
          {/* Connector Line */}
          <line>
            <bufferGeometry>
              <float32BufferAttribute
                attach="attributes-position"
                args={[...pt.pos1, ...pt.pos2]}
                count={2}
                itemSize={3}
              />
            </bufferGeometry>
            <lineBasicMaterial color={pt.color} transparent opacity={0.2} />
          </line>

          {/* Particle 1 */}
          <mesh position={pt.pos1 as any}>
            <sphereGeometry args={[0.12, 16, 16]} />
            <meshStandardMaterial
              color={pt.color}
              emissive={pt.color}
              emissiveIntensity={0.5}
              roughness={0.2}
            />
          </mesh>

          {/* Particle 2 */}
          <mesh position={pt.pos2 as any}>
            <sphereGeometry args={[0.12, 16, 16]} />
            <meshStandardMaterial
              color={pt.color}
              emissive={pt.color}
              emissiveIntensity={0.5}
              roughness={0.2}
            />
          </mesh>
        </group>
      ))}
    </group>
  );
};

// Main Component
export default function BiometricScanner() {
  return (
    <div className="w-full h-[500px] relative">
      <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, 0, 10]} color="#3B82F6" intensity={1} />

        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
          <DNAHelix />
        </Float>

        <OrbitControls enableZoom={false} autoRotate={false} />
      </Canvas>

      {/* Overlay Text */}
      <div className="absolute bottom-4 left-0 right-0 text-center pointer-events-none">
        <div className="inline-block bg-black/60 backdrop-blur-md px-4 py-2 rounded-full border border-blue-500/30">
          <p className="text-xs font-bold text-blue-400">BIOMETRIC IDENTITY VERIFICATION</p>
        </div>
      </div>
    </div>
  );
}
