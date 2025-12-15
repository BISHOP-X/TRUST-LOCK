import { motion } from 'framer-motion';
import { MapPin, Clock, Activity, CheckCircle, AlertTriangle } from 'lucide-react';
import ImpossibleTravelGlobe from './three/ImpossibleTravelGlobe';
import { useState, useEffect } from 'react';

// Location data - 5 cards (3 good, 1 suspicious, 1 impossible)
const locations = [
  { id: 1, name: 'New York', timestamp: '09:15 AM EST', risk: 'verified' },
  { id: 2, name: 'London', timestamp: '02:15 PM GMT', risk: 'verified' },
  { id: 3, name: 'Dubai', timestamp: '06:15 PM GST', risk: 'verified' },
  { id: 4, name: 'Lagos', timestamp: '09:17 AM EST', risk: 'suspicious' },
  { id: 5, name: 'Tokyo', timestamp: '02:17 PM GMT', risk: 'impossible' },
];

// Main Pillar3View Component
export const Pillar3View = () => {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isChecking, setIsChecking] = useState(true);
  const [showResult, setShowResult] = useState(false);
  const [analysisStage, setAnalysisStage] = useState(0);
  const [hasLitUp, setHasLitUp] = useState(false);

  // const currentLocation = locations[currentCardIndex];

  // Floating particles for background
  const particles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    top: Math.random() * 100,
    delay: Math.random() * 5,
    duration: 3 + Math.random() * 2,
  }));

  // Status items for left column
  const statusItems = [
    { label: '10:00 AM - Login Verified (Lagos)', icon: CheckCircle, delay: 1, stage: 1 },
    { label: '10:05 AM - New Login Channel (London)', icon: MapPin, delay: 2, stage: 2 },
    { label: 'ANALYSIS: > 5000km in 5 mins', icon: Activity, delay: 3, stage: 3 },
    { label: 'VERDICT: Impossible Travel Blocked', icon: AlertTriangle, delay: 3.5, stage: 4 },
  ];

  // Card cycling animation
  useEffect(() => {
    // Reset states for new card
    setIsChecking(true);
    setShowResult(false);

    // Only light up progressively on first load, then keep them lit
    if (!hasLitUp) {
      setAnalysisStage(0);
      const stage1Timer = setTimeout(() => setAnalysisStage(1), 500);
      const stage2Timer = setTimeout(() => setAnalysisStage(2), 1000);
      const stage3Timer = setTimeout(() => setAnalysisStage(3), 1500);
      const stage4Timer = setTimeout(() => {
        setAnalysisStage(4);
        setHasLitUp(true);
      }, 2000);

      // Show loader for 2 seconds
      const loaderTimer = setTimeout(() => {
        setIsChecking(false);
        setShowResult(true);
      }, 2000);

      // Show result for 2 seconds, then fade to next card
      const nextCardTimer = setTimeout(() => {
        setShowResult(false);
        setTimeout(() => {
          setCurrentCardIndex((prev) => (prev + 1) % locations.length);
        }, 500); // Fade out duration
      }, 4000);

      return () => {
        clearTimeout(stage1Timer);
        clearTimeout(stage2Timer);
        clearTimeout(stage3Timer);
        clearTimeout(stage4Timer);
        clearTimeout(loaderTimer);
        clearTimeout(nextCardTimer);
      };
    } else {
      // After first time, skip the progressive lighting and keep all lit
      setAnalysisStage(4);

      const loaderTimer = setTimeout(() => {
        setIsChecking(false);
        setShowResult(true);
      }, 2000);

      const nextCardTimer = setTimeout(() => {
        setShowResult(false);
        setTimeout(() => {
          setCurrentCardIndex((prev) => (prev + 1) % locations.length);
        }, 500);
      }, 4000);

      return () => {
        clearTimeout(loaderTimer);
        clearTimeout(nextCardTimer);
      };
    }
  }, [currentCardIndex, hasLitUp]);

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-[#0B0F1C] via-[#050810] to-[#000000] overflow-hidden">
      {/* Animated Grid Background */}
      <div className="absolute inset-0 opacity-10">
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(248, 197, 55, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(248, 197, 55, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
          animate={{
            backgroundPosition: ['0px 0px', '60px 60px'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      </div>

      {/* Data Packet Particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute w-1 h-1 rounded-full bg-[#F8C537]"
          style={{
            left: `${particle.left}%`,
            top: `${particle.top}%`,
            boxShadow: '0 0 8px rgba(248, 197, 55, 0.6)',
          }}
          animate={{
            y: [0, -100, 0],
            x: [0, 30, 0],
            opacity: [0, 0.6, 0],
            scale: [0.5, 1, 0.5],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Network Connection Lines */}
      <svg className="absolute inset-0 w-full h-full opacity-20" style={{ zIndex: 1 }}>
        {[0, 1, 2, 3].map((i) => (
          <motion.line
            key={i}
            x1={`${20 + i * 20}%`}
            y1="0%"
            x2={`${30 + i * 20}%`}
            y2="100%"
            stroke="url(#lineGradientPillar3)"
            strokeWidth="1"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{
              pathLength: [0, 1, 0],
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.5,
              ease: 'easeInOut',
            }}
          />
        ))}
        <defs>
          <linearGradient id="lineGradientPillar3" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#F8C537" stopOpacity="0" />
            <stop offset="50%" stopColor="#F8C537" stopOpacity="1" />
            <stop offset="100%" stopColor="#F8C537" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>

      {/* Main Content */}
      <div className="relative z-20 h-screen flex flex-col">
        {/* Pillar 3 Indicator at Top */}
        <motion.div
          className="pt-4 pb-2 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="inline-block px-4 py-1.5 rounded-full bg-gradient-to-r from-[#3B82F6]/20 to-[#F8C537]/20 border border-[#3B82F6]/30 backdrop-blur-sm">
            <span className="text-xs font-bold tracking-widest uppercase bg-gradient-to-r from-[#3B82F6] to-[#F8C537] bg-clip-text text-transparent">
              Pillar 3 of 3
            </span>
          </div>
        </motion.div>

        {/* Two Column Layout - Compact */}
        <div className="flex-1 flex items-center justify-center px-8 py-4">
          <div className="w-full max-w-6xl grid grid-cols-2 gap-8 items-center">

            {/* LEFT COLUMN - Text Content */}
            <div className="space-y-4">
              {/* Title */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <h2 className="text-4xl font-bold text-white mb-2">
                  Context Analysis
                </h2>
                <p className="text-2xl font-semibold bg-gradient-to-r from-[#3B82F6] to-[#F8C537] bg-clip-text text-transparent">
                  WHERE, WHEN, WHY?
                </p>
              </motion.div>

              {/* Status Items */}
              <div className="space-y-3">
                {statusItems.map((item, index) => {
                  const isActive = analysisStage >= item.stage;
                  const ItemIcon = item.icon;

                  return (
                    <motion.div
                      key={index}
                      className="flex items-center gap-3"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{
                        opacity: isActive ? 1 : 0.3,
                        x: 0
                      }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <motion.div
                        className="w-7 h-7 rounded-full border-2 flex items-center justify-center"
                        style={{
                          borderColor: isActive ? '#F8C537' : 'rgba(255,255,255,0.2)',
                          backgroundColor: isActive ? 'rgba(248, 197, 55, 0.1)' : 'transparent'
                        }}
                        animate={{
                          scale: isActive ? [1, 1.1, 1] : 1
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        <ItemIcon
                          className={`w-4 h-4 ${isActive ? 'text-[#F8C537]' : 'text-gray-600'}`}
                        />
                      </motion.div>
                      <span className={`text-sm ${isActive ? 'text-white' : 'text-gray-500'}`}>
                        {item.label}
                      </span>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* RIGHT COLUMN - 3D Globe Visualization */}
            <motion.div
              className="relative flex items-center justify-center h-full min-h-[500px]"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <div className="w-full h-full">
                <ImpossibleTravelGlobe />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Text - Centered */}
        <motion.div
          className="pb-4 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          <p className="text-xs text-gray-500">
            Analyzing location, timing, and access patterns
          </p>
        </motion.div>
      </div>
    </div>
  );
};
