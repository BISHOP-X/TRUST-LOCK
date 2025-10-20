/**
 * Impossible Travel Globe 3D Visualization
 * 
 * PHASE 5 IMPLEMENTATION
 * This is a scaffold file created in Phase 1
 * Full implementation will be done in Phase 5
 * 
 * Senior Engineer Notes:
 * - Lazy loaded to reduce initial bundle size
 * - Suspense boundary in parent component
 * - Fallback to 2D if WebGL not supported
 * - Performance optimized for projector displays
 */

import React, { Suspense } from 'react';
import { motion } from 'framer-motion';
import { Skeleton } from '@/components/ui/skeleton';
import { AlertCircle } from 'lucide-react';

/**
 * Props for the 3D Globe component
 */
interface ImpossibleTravelGlobe3DProps {
  fromCity: string;
  toCity: string;
  fromCoords: [number, number]; // [lat, lng]
  toCoords: [number, number];   // [lat, lng]
  distance: number;              // in kilometers
  timeDifference: number;        // in minutes
  onComplete?: () => void;       // Animation complete callback
}

/**
 * Loading fallback component
 */
const GlobeLoadingFallback: React.FC = () => (
  <div className="w-full h-full flex items-center justify-center">
    <Skeleton className="w-96 h-96 rounded-full" />
  </div>
);

/**
 * Error fallback (if Three.js fails to load)
 */
const GlobeErrorFallback: React.FC = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="w-full h-full flex flex-col items-center justify-center gap-4"
  >
    <AlertCircle className="h-16 w-16 text-destructive" />
    <p className="text-muted-foreground">
      3D Globe could not be loaded. Using fallback visualization.
    </p>
  </motion.div>
);

/**
 * Main 3D Globe Component (Scaffold)
 * 
 * TODO (Phase 5):
 * - Implement Three.js Canvas with Earth sphere
 * - Add realistic Earth texture (NASA texture map)
 * - Create glowing city markers at coordinates
 * - Animate arc between cities using TubeGeometry
 * - Add camera controls (OrbitControls from drei)
 * - Implement rotation animation
 * - Add distance calculation display
 * - Optimize for 30fps on projector
 */
const ImpossibleTravelGlobe3DComponent: React.FC<ImpossibleTravelGlobe3DProps> = ({
  fromCity,
  toCity,
  fromCoords,
  toCoords,
  distance,
  timeDifference,
  onComplete,
}) => {
  // PHASE 5: This will be replaced with actual Three.js implementation
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="text-center">
        <h3 className="text-2xl font-bold mb-4">3D Globe Placeholder</h3>
        <p className="text-muted-foreground mb-2">
          {fromCity} → {toCity}
        </p>
        <p className="text-sm text-muted-foreground">
          Distance: {distance}km | Time: {timeDifference} minutes
        </p>
        <p className="text-xs text-warning mt-4">
          Phase 5: Implement Three.js visualization here
        </p>
      </div>
    </div>
  );
};

/**
 * Exported component with error boundary
 */
export const ImpossibleTravelGlobe3D: React.FC<ImpossibleTravelGlobe3DProps> = (props) => {
  // In Phase 5, we'll wrap this in React.lazy() for code splitting
  // For now, render directly
  
  try {
    return (
      <Suspense fallback={<GlobeLoadingFallback />}>
        <ImpossibleTravelGlobe3DComponent {...props} />
      </Suspense>
    );
  } catch (error) {
    console.error('Globe rendering error:', error);
    return <GlobeErrorFallback />;
  }
};

/**
 * 2D Fallback Globe Component
 * Used if WebGL is not supported or Three.js fails
 * 
 * Implements similar visual with SVG
 */
export const ImpossibleTravelGlobe2DFallback: React.FC<ImpossibleTravelGlobe3DProps> = ({
  fromCity,
  toCity,
  distance,
  timeDifference,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-full h-full flex flex-col items-center justify-center gap-6"
    >
      {/* SVG world map or simplified visualization */}
      <div className="relative w-96 h-96 rounded-full bg-primary/10 border-4 border-destructive flex items-center justify-center">
        <div className="text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            <h3 className="text-3xl font-bold text-destructive mb-4">IMPOSSIBLE TRAVEL</h3>
            <p className="text-xl mb-2">{fromCity} → {toCity}</p>
            <p className="text-sm text-muted-foreground">{distance}km in {timeDifference} minutes</p>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

/**
 * Utility: Check if WebGL is supported
 */
export const isWebGLSupported = (): boolean => {
  try {
    const canvas = document.createElement('canvas');
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    );
  } catch (e) {
    return false;
  }
};
