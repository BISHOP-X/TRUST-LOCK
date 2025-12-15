import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, OrbitControls, Html, QuadraticBezierLine } from '@react-three/drei';
import * as THREE from 'three';

// City Data
const CITIES = [
  { name: 'Lagos', lat: 6.5244, lng: 3.3792, type: 'source', time: '10:00 AM' },
  { name: 'London', lat: 51.5074, lng: -0.1278, type: 'impossible', time: '10:05 AM' }, // 5 mins later!
  { name: 'New York', lat: 40.7128, lng: -74.0060, type: 'verified', time: '09:00 AM' },
  { name: 'Tokyo', lat: 35.6762, lng: 139.6503, type: 'verified', time: '11:00 PM' },
  { name: 'Dubai', lat: 25.2048, lng: 55.2708, type: 'verified', time: '02:00 PM' },
];

const GLOBE_RADIUS = 3;

// Helper to convert Lat/Long to 3D Vector
function latLongToVector3(lat: number, lng: number, radius: number) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);

  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = (radius * Math.sin(phi) * Math.sin(theta));
  const y = (radius * Math.cos(phi));

  return new THREE.Vector3(x, y, z);
}

// Travel Arc Component
const TravelArc = ({ start, end, type }: { start: any, end: any, type: string }) => {
  const lineRef = useRef<any>(null);

  const { startPos, endPos, midPoint, curveApex } = useMemo(() => {
    const startPos = latLongToVector3(start.lat, start.lng, GLOBE_RADIUS);
    const endPos = latLongToVector3(end.lat, end.lng, GLOBE_RADIUS);
    const mid = new THREE.Vector3().addVectors(startPos, endPos).multiplyScalar(0.5);
    const dist = startPos.distanceTo(endPos);
    // Higher curve for longer distances
    const midPoint = mid.normalize().multiplyScalar(GLOBE_RADIUS + dist * 0.5);

    // Calculate the actual peak of the curve (t=0.5) for the badge
    // Quadratic Bezier: (1-t)^2 * P0 + 2(1-t)t * P1 + t^2 * P2
    // At t=0.5: 0.25*P0 + 0.5*P1 + 0.25*P2
    const curveApex = new THREE.Vector3()
      .addScaledVector(startPos, 0.25)
      .addScaledVector(midPoint, 0.5)
      .addScaledVector(endPos, 0.25);

    return { startPos, endPos, midPoint, curveApex };
  }, [start, end]);

  useFrame((state) => {
    if (lineRef.current && type === 'impossible') {
      // Pulse animation for impossible travel
      const t = state.clock.getElapsedTime();
      lineRef.current.material.opacity = 0.5 + Math.sin(t * 5) * 0.3;
      lineRef.current.material.linewidth = 2 + Math.sin(t * 5);
      lineRef.current.material.dashOffset -= 0.01;
    } else if (lineRef.current) {
      // Subtle flow for normal travel
      lineRef.current.material.dashOffset -= 0.002;
    }
  });

  return (
    <group>
      <QuadraticBezierLine
        ref={lineRef}
        start={startPos}
        end={endPos}
        mid={midPoint}
        color={type === 'impossible' ? '#ef4444' : '#3B82F6'}
        lineWidth={type === 'impossible' ? 2 : 1}
        transparent
        opacity={type === 'impossible' ? 0.8 : 0.3}
        dashed={true}
        dashScale={5}
        dashSize={type === 'impossible' ? 0.2 : 0.5}
        gapSize={0.2}
      />

      {/* Warning Badge for Impossible Travel */}
      {type === 'impossible' && (
        <Html position={curveApex} center zIndexRange={[100, 0]}>
          <div className="flex flex-col items-center">
            <div className="bg-red-500/90 backdrop-blur-md text-white px-3 py-1.5 rounded-md border border-red-400 shadow-[0_0_15px_rgba(239,68,68,0.5)] animate-pulse">
              <div className="flex items-center gap-2 text-xs font-bold whitespace-nowrap">
                <span className="text-lg">⚠️</span>
                <div className="flex flex-col leading-tight">
                  <span className="shadow-sm">IMPOSSIBLE TRAVEL</span>
                  <span className="text-[10px] opacity-90 font-normal">5000km in 5 mins</span>
                </div>
              </div>
            </div>
            {/* Connector line to the arc */}
            <div className="w-px h-4 bg-red-500/50"></div>
          </div>
        </Html>
      )}
    </group>
  );
};

// Inner Globe Component
const Globe = () => {
  const globeRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (globeRef.current) {
      globeRef.current.rotation.y += 0.002;
    }
  });

  return (
    <group ref={globeRef}>
      {/* Wireless/Holographic Sphere */}
      <Sphere args={[GLOBE_RADIUS, 64, 64]}>
        <meshStandardMaterial
          color="#1e293b"
          transparent
          opacity={0.8}
          wireframe={false}
        />
      </Sphere>

      {/* Wireframe Overlay */}
      <Sphere args={[GLOBE_RADIUS + 0.05, 32, 32]}>
        <meshBasicMaterial
          color="#3B82F6"
          wireframe
          transparent
          opacity={0.15}
        />
      </Sphere>

      {/* City Markers */}
      {CITIES.map((city, i) => {
        const pos = latLongToVector3(city.lat, city.lng, GLOBE_RADIUS);
        const color = city.type === 'impossible' ? '#ef4444' :
          city.type === 'source' ? '#F8C537' : '#22c55e';

        return (
          <group key={i} position={pos}>
            <Sphere args={[0.08, 16, 16]}>
              <meshBasicMaterial color={color} />
            </Sphere>
            {/* Glow halos for markers */}
            <Sphere args={[0.15, 16, 16]}>
              <meshBasicMaterial color={color} transparent opacity={0.3} />
            </Sphere>

            {/* City Label with Time */}
            <Html distanceFactor={10} zIndexRange={[100, 0]}>
              <div className="bg-black/60 backdrop-blur-md px-2 py-1.5 rounded border border-white/10 text-white whitespace-nowrap pointer-events-none transform -translate-x-1/2 -translate-y-full mt-[-10px] flex flex-col items-center">
                <span className="text-[10px] font-bold tracking-wide">{city.name}</span>
                <span className={`text-[9px] ${city.type === 'impossible' || city.type === 'source' ? 'text-yellow-400 font-bold' : 'text-gray-400'}`}>
                  {city.time}
                </span>
              </div>
            </Html>
          </group>
        );
      })}

      {/* Verified Travel Arcs (e.g., from Dubai to Tokyo, NY to London) */}
      <TravelArc start={CITIES[4]} end={CITIES[3]} type="verified" /> {/* Dubai -> Tokyo */}
      <TravelArc start={CITIES[2]} end={CITIES[4]} type="verified" /> {/* NY -> Dubai */}

      {/* IMPOSSIBLE TRAVEL ARC (Lagos -> London) */}
      <TravelArc start={CITIES[0]} end={CITIES[1]} type="impossible" />
    </group>
  );
};

// Main Component
export default function ImpossibleTravelGlobe() {
  return (
    <div className="w-full h-[500px] relative overflow-visible">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        dpr={[1, 2]}
        style={{ width: '100%', height: '100%', overflow: 'visible' }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#3B82F6" />

        <Globe />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate={false}
        />
      </Canvas>

      {/* Legend Overlay */}
      <div className="absolute bottom-4 left-4 bg-black/40 backdrop-blur-sm p-3 rounded-lg border border-white/10 text-xs text-white">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-2 h-2 rounded-full bg-[#ef4444]"></div>
          <span className="text-gray-300">Impossible Travel</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#22c55e]"></div>
          <span className="text-gray-300">Verified Access</span>
        </div>
      </div>
    </div>
  );
}
