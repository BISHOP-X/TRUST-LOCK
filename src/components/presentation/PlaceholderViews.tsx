/**
 * Placeholder Presentation Views
 * 
 * Simple placeholder components for Phase 2 testing
 * Will be replaced with full implementations in Phase 3
 */

import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, HelpCircle, Shield, Lock, Database, Zap, Wifi, Server, Users } from 'lucide-react';
import { useState, useEffect } from 'react';
import { ParticleBackground } from './ParticleBackground';
import { usePresentation } from '@/contexts/PresentationContext';
import { useDashboard } from '@/contexts/DashboardContext';

// Problem View - Professional Network Breach Visualization
export const ProblemView = () => {
  const [breachStarted, setBreachStarted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setBreachStarted(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 bg-gradient-to-br from-background via-background to-destructive/5 flex items-center justify-center z-50"
    >
      {/* Particle background */}
      <ParticleBackground 
        particleCount={100} 
        particleOpacity={0.3} 
        connectionOpacity={0.05}
        particleSpeed={0.5}
      />
      {/* Animated background grid */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(rgba(239, 68, 68, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(239, 68, 68, 0.3) 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }} />
      </div>

      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center px-8 py-8">
        {/* Title - Compact */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-8"
        >
          <AlertTriangle className="h-16 w-16 text-destructive mx-auto mb-3 drop-shadow-[0_0_20px_rgba(239,68,68,0.4)]" />
          <h1 className="text-5xl font-black text-destructive tracking-tight">
            THE PROBLEM
          </h1>
        </motion.div>

        {/* Two-column layout */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="grid grid-cols-2 gap-8 max-w-7xl w-full"
        >
          {/* Left: The Reality */}
          <div className="bg-card/40 backdrop-blur-sm border border-border rounded-2xl p-8">
            <p className="text-xl text-muted-foreground font-medium mb-6">
              Traditional security is obsolete
            </p>
            <div className="space-y-4">
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="flex items-center gap-4"
              >
                <Wifi className="h-10 w-10 text-primary flex-shrink-0" />
                <p className="text-sm text-muted-foreground">Work from anywhere</p>
              </motion.div>
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 1.0, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="flex items-center gap-4"
              >
                <Users className="h-10 w-10 text-primary flex-shrink-0" />
                <p className="text-sm text-muted-foreground">Personal devices (BYOD)</p>
              </motion.div>
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="flex items-center gap-4"
              >
                <Server className="h-10 w-10 text-primary flex-shrink-0" />
                <p className="text-sm text-muted-foreground">Untrusted networks</p>
              </motion.div>
            </div>
          </div>

          {/* Right: The Critical Vulnerability */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1.4, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className={`bg-gradient-to-br ${breachStarted ? 'from-destructive/20 to-destructive/5' : 'from-card/60 to-background/80'} backdrop-blur-sm border-2 ${breachStarted ? 'border-destructive' : 'border-border'} rounded-2xl p-8 transition-all duration-1000 ease-out flex flex-col justify-center`}
          >
            <motion.p 
              className="text-2xl font-bold text-center mb-4"
              animate={breachStarted ? { color: '#ef4444' } : { color: '#e2e8f0' }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            >
              1 stolen VPN password
            </motion.p>
            <div className="text-4xl text-center my-4 text-muted-foreground">=</div>
            <motion.p 
              className="text-3xl font-black text-center mb-6"
              animate={breachStarted ? { 
                color: '#ef4444',
                textShadow: '0 0 30px rgba(239, 68, 68, 0.5)'
              } : { color: '#94a3b8' }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            >
              FULL NETWORK ACCESS
            </motion.p>
            
            {/* Pre-allocated space for risk factors - prevents layout shift */}
            <div className="pt-6 border-t border-destructive/30 min-h-[100px]">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: breachStarted ? 1 : 0 }}
                transition={{ delay: 0.5, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="grid grid-cols-2 gap-3 text-left"
              >
                <div className="flex items-start gap-2">
                  <div className="text-destructive text-sm">⚠️</div>
                  <p className="text-xs text-muted-foreground">Customer data</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="text-destructive text-sm">⚠️</div>
                  <p className="text-xs text-muted-foreground">Core systems</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="text-destructive text-sm">⚠️</div>
                  <p className="text-xs text-muted-foreground">Admin tools</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="text-destructive text-sm">⚠️</div>
                  <p className="text-xs text-muted-foreground">Undetectable</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

        <motion.p 
          className="text-xs text-muted-foreground mt-8"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          Press Enter to continue
        </motion.p>
      </div>
    </motion.div>
  );
};

// Question View Placeholder
export const QuestionView = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.6 }}
      className="fixed inset-0 bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center z-50"
    >
      {/* Particle background */}
      <ParticleBackground 
        particleCount={100} 
        particleOpacity={0.3} 
        connectionOpacity={0.05}
        particleSpeed={0.5}
      />
      <div className="text-center max-w-6xl px-12">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <HelpCircle className="h-32 w-32 text-primary mx-auto mb-8" />
        </motion.div>
        <h1 className="text-5xl font-bold text-foreground mb-8">The Challenge</h1>
        <p className="text-4xl text-primary font-semibold leading-relaxed">
          How do we secure sensitive data in a<br />
          <span className="text-secondary">'work-from-anywhere'</span> world<br />
          WITHOUT compromising productivity?
        </p>
        <p className="text-sm text-muted-foreground mt-12 animate-pulse">
          Press Enter to continue
        </p>
      </div>
    </motion.div>
  );
};

// Solution View Placeholder
export const SolutionIntro = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed inset-0 bg-gradient-to-br from-primary/30 to-background flex items-center justify-center z-50"
    >
      {/* Particle background */}
      <ParticleBackground 
        particleCount={120} 
        particleOpacity={0.4} 
        connectionOpacity={0.08}
        particleSpeed={0.5}
      />
      <div className="text-center max-w-5xl px-8">
        {/* Animated Shield - Same as Landing Page */}
        <motion.div
          initial={{ scale: 0, rotateY: -180 }}
          animate={{ scale: 1, rotateY: 0 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 120, damping: 12 }}
          className="flex justify-center mb-8"
        >
          <motion.div
            className="relative"
            animate={{ 
              rotateY: [0, 10, -10, 0],
              scale: [1, 1.05, 1]
            }}
            transition={{ 
              duration: 4, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            {/* Glowing background */}
            <motion.div
              className="absolute inset-0 bg-primary/20 blur-3xl rounded-full"
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.5, 0.8, 0.5]
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            {/* Shield SVG */}
            <svg
              width="160"
              height="160"
              viewBox="0 0 200 200"
              className="relative z-10 drop-shadow-2xl"
            >
              {/* Outer shield glow */}
              <motion.path
                d="M100 20 L160 50 L160 110 Q160 160 100 180 Q40 160 40 110 L40 50 Z"
                fill="url(#shieldGradient)"
                stroke="url(#strokeGradient)"
                strokeWidth="3"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ delay: 0.4, duration: 1.5, ease: "easeOut" }}
              />
              
              {/* Inner circuit pattern */}
              <motion.g
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.0, duration: 0.8 }}
              >
                {/* Vertical lines */}
                <line x1="100" y1="60" x2="100" y2="140" stroke="rgba(59, 130, 246, 0.4)" strokeWidth="2" />
                <line x1="80" y1="70" x2="80" y2="130" stroke="rgba(59, 130, 246, 0.3)" strokeWidth="1.5" />
                <line x1="120" y1="70" x2="120" y2="130" stroke="rgba(59, 130, 246, 0.3)" strokeWidth="1.5" />
                
                {/* Horizontal lines */}
                <line x1="70" y1="90" x2="130" y2="90" stroke="rgba(59, 130, 246, 0.3)" strokeWidth="1.5" />
                <line x1="70" y1="110" x2="130" y2="110" stroke="rgba(59, 130, 246, 0.3)" strokeWidth="1.5" />
                
                {/* Circuit nodes */}
                <circle cx="100" cy="90" r="4" fill="#3b82f6" />
                <circle cx="100" cy="110" r="4" fill="#3b82f6" />
                <circle cx="80" cy="90" r="3" fill="#3b82f6" opacity="0.7" />
                <circle cx="120" cy="90" r="3" fill="#3b82f6" opacity="0.7" />
                <circle cx="80" cy="110" r="3" fill="#3b82f6" opacity="0.7" />
                <circle cx="120" cy="110" r="3" fill="#3b82f6" opacity="0.7" />
              </motion.g>
              
              {/* Lock icon in center */}
              <motion.g
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1.3, type: "spring", stiffness: 200 }}
              >
                <rect x="85" y="95" width="30" height="25" rx="3" fill="#3b82f6" />
                <path
                  d="M90 95 L90 85 Q90 75 100 75 Q110 75 110 85 L110 95"
                  fill="none"
                  stroke="#3b82f6"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
                <circle cx="100" cy="107" r="3" fill="white" />
              </motion.g>

              {/* Gradient definitions */}
              <defs>
                <linearGradient id="shieldGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#1e40af" stopOpacity="0.5" />
                </linearGradient>
                <linearGradient id="strokeGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#60a5fa" />
                  <stop offset="100%" stopColor="#3b82f6" />
                </linearGradient>
              </defs>
            </svg>
          </motion.div>
        </motion.div>

        {/* Title and description */}
        <motion.h1 
          className="text-7xl font-bold text-foreground mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.8 }}
        >
          TRUST-LOCK
        </motion.h1>
        <motion.p 
          className="text-3xl text-primary/90"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.8 }}
        >
          Zero Trust Security Built on Three Pillars
        </motion.p>
        <motion.p 
          className="text-sm text-muted-foreground mt-12"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          Press Enter to continue
        </motion.p>
      </div>
    </motion.div>
  );
};

// Pillars View Placeholder
interface PillarsViewProps {
  pillarIndex?: number;
}

export const PillarsView = ({ pillarIndex = 1 }: PillarsViewProps) => {
  // Define pillar content
  const pillars = [
    {
      icon: Lock,
      color: 'primary',
      title: 'Identity Verification',
      subtitle: 'WHO is accessing?',
      description: 'Continuous authentication and user behavior analysis'
    },
    {
      icon: Database,
      color: 'warning',
      title: 'Device Intelligence',
      subtitle: 'WHAT device is used?',
      description: 'Real-time device health scoring and compliance checks'
    },
    {
      icon: Zap,
      color: 'success',
      title: 'Context Analysis',
      subtitle: 'WHERE, WHEN, WHY?',
      description: 'Location, time, and behavioral pattern analysis'
    }
  ];

  const currentPillar = pillars[pillarIndex - 1];
  const Icon = currentPillar.icon;

  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.6 }}
      className="fixed inset-0 bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center z-50"
    >
      {/* Particle background */}
      <ParticleBackground 
        particleCount={100} 
        particleOpacity={0.3} 
        connectionOpacity={0.05}
        particleSpeed={0.5}
      />
      <div className="text-center max-w-4xl px-12">
        <motion.div
          initial={{ scale: 0, rotateY: -180 }}
          animate={{ scale: 1, rotateY: 0 }}
          transition={{ delay: 0.2, type: "spring", bounce: 0.5 }}
          className={`bg-gradient-to-br from-${currentPillar.color}/20 to-${currentPillar.color}/5 p-12 rounded-3xl border-2 border-${currentPillar.color}/50 shadow-2xl`}
        >
          <Icon className={`h-32 w-32 text-${currentPillar.color} mx-auto mb-6`} />
          <span className="text-sm font-bold text-muted-foreground tracking-widest uppercase">
            Pillar {pillarIndex} of 3
          </span>
          <h1 className="text-5xl font-bold text-foreground mt-2 mb-4">
            {currentPillar.title}
          </h1>
          <p className={`text-3xl font-semibold text-${currentPillar.color} mb-6`}>
            {currentPillar.subtitle}
          </p>
          <p className="text-xl text-muted-foreground leading-relaxed">
            {currentPillar.description}
          </p>
        </motion.div>
        <p className="text-sm text-muted-foreground mt-12 animate-pulse">
          Press Enter to continue
        </p>
      </div>
    </motion.div>
  );
};

// Transition View - Auto-launches demo
export const TransitionView = () => {
  const { exitPresentation } = usePresentation();
  const { setScenario } = useDashboard();

  useEffect(() => {
    // After 5 seconds, exit presentation and trigger Scenario 3 (Impossible Travel)
    const timer = setTimeout(() => {
      setScenario(2); // Index 2 = Impossible Travel (3rd scenario)
      exitPresentation();
    }, 5000);

    return () => clearTimeout(timer);
  }, [exitPresentation, setScenario]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="fixed inset-0 bg-gradient-to-br from-background via-primary/10 to-background flex items-center justify-center z-50"
    >
      {/* Particle background */}
      <ParticleBackground 
        particleCount={80} 
        particleOpacity={0.3} 
        connectionOpacity={0.05}
        particleSpeed={0.3}
      />
      
      <div className="text-center space-y-12 px-4">
        {/* Animated Shield - Same as Landing/Solution */}
        <motion.div
          initial={{ scale: 0, rotateY: -180 }}
          animate={{ scale: 1, rotateY: 0 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 120, damping: 12 }}
          className="flex justify-center mb-4"
        >
          <motion.div
            className="relative"
            animate={{ 
              rotateY: [0, 10, -10, 0],
              scale: [1, 1.05, 1]
            }}
            transition={{ 
              duration: 4, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            {/* Glowing background */}
            <motion.div
              className="absolute inset-0 bg-primary/20 blur-3xl rounded-full"
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.5, 0.8, 0.5]
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            {/* Shield SVG */}
            <svg
              width="160"
              height="160"
              viewBox="0 0 200 200"
              className="relative z-10 drop-shadow-2xl"
            >
              {/* Outer shield glow */}
              <motion.path
                d="M100 20 L160 50 L160 110 Q160 160 100 180 Q40 160 40 110 L40 50 Z"
                fill="url(#shieldGradient)"
                stroke="url(#strokeGradient)"
                strokeWidth="3"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ delay: 0.5, duration: 1.5, ease: "easeOut" }}
              />
              
              {/* Inner circuit pattern */}
              <motion.g
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.8 }}
              >
                {/* Vertical lines */}
                <line x1="100" y1="60" x2="100" y2="140" stroke="rgba(59, 130, 246, 0.4)" strokeWidth="2" />
                <line x1="80" y1="70" x2="80" y2="130" stroke="rgba(59, 130, 246, 0.3)" strokeWidth="1.5" />
                <line x1="120" y1="70" x2="120" y2="130" stroke="rgba(59, 130, 246, 0.3)" strokeWidth="1.5" />
                
                {/* Horizontal lines */}
                <line x1="70" y1="90" x2="130" y2="90" stroke="rgba(59, 130, 246, 0.3)" strokeWidth="1.5" />
                <line x1="70" y1="110" x2="130" y2="110" stroke="rgba(59, 130, 246, 0.3)" strokeWidth="1.5" />
                
                {/* Circuit nodes */}
                <circle cx="100" cy="90" r="4" fill="#3b82f6" />
                <circle cx="100" cy="110" r="4" fill="#3b82f6" />
                <circle cx="80" cy="90" r="3" fill="#3b82f6" opacity="0.7" />
                <circle cx="120" cy="90" r="3" fill="#3b82f6" opacity="0.7" />
                <circle cx="80" cy="110" r="3" fill="#3b82f6" opacity="0.7" />
                <circle cx="120" cy="110" r="3" fill="#3b82f6" opacity="0.7" />
              </motion.g>
              
              {/* Lock icon in center */}
              <motion.g
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1.5, type: "spring", stiffness: 200 }}
              >
                <rect x="85" y="95" width="30" height="25" rx="3" fill="#3b82f6" />
                <path
                  d="M90 95 L90 85 Q90 75 100 75 Q110 75 110 85 L110 95"
                  fill="none"
                  stroke="#3b82f6"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
                <circle cx="100" cy="107" r="3" fill="white" />
              </motion.g>

              {/* Gradient definitions */}
              <defs>
                <linearGradient id="shieldGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#1e40af" stopOpacity="0.5" />
                </linearGradient>
                <linearGradient id="strokeGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#60a5fa" />
                  <stop offset="100%" stopColor="#3b82f6" />
                </linearGradient>
              </defs>
            </svg>
          </motion.div>
        </motion.div>

        {/* Text Content */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 2.0, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <h1 className="text-6xl font-black text-foreground mb-6">
            Ready for Live Demo
          </h1>
          <p className="text-3xl text-primary/90 mb-3">
            Watch Trust-Lock block a real attack in real-time
          </p>
          <p className="text-xl text-muted-foreground">
            Demonstrating: <span className="text-primary font-semibold">Impossible Travel Detection</span>
          </p>
        </motion.div>

        {/* Loading indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.8, duration: 0.6 }}
          className="flex items-center justify-center gap-3 text-muted-foreground"
        >
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-3 h-3 bg-primary rounded-full"
          />
          <span className="text-lg">Initializing security gateway...</span>
        </motion.div>
      </div>
    </motion.div>
  );
};
