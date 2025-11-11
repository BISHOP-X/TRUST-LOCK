/**
 * Placeholder Presentation Views
 * 
 * Simple placeholder components for Phase 2 testing
 * Will be replaced with full implementations in Phase 3
 */

import { motion } from 'framer-motion';
import { Shield, Lock, Database, Zap, CheckCircle2 } from 'lucide-react';
import { useEffect } from 'react';
import { usePresentation } from '@/contexts/PresentationContext';
import { useDashboard } from '@/contexts/DashboardContext';
import ChallengeView from './ChallengeView';
import { Pillar2View } from './Pillar2View';
import { Pillar3View } from './Pillar3View';

// Export ChallengeView as QuestionView for presentation flow
export { ChallengeView as QuestionView };

// Export Pillar2View
export { Pillar2View };

// Export Pillar3View
export { Pillar3View };

// Solution View Placeholder
export const SolutionIntro = () => {
  // Floating particles for background (same as ProblemView)
  const particles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    top: Math.random() * 100,
    delay: Math.random() * 5,
    duration: 3 + Math.random() * 2,
  }));

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed inset-0 bg-gradient-to-br from-[#0B0F1C] via-[#050810] to-[#000000] overflow-hidden flex items-center justify-center z-50"
    >
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
            stroke="url(#lineGradientSolution)"
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
          <linearGradient id="lineGradientSolution" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#F8C537" stopOpacity="0" />
            <stop offset="50%" stopColor="#F8C537" stopOpacity="1" />
            <stop offset="100%" stopColor="#F8C537" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>

      {/* Orbiting shield icons */}
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            left: '50%',
            top: '50%',
            zIndex: 2,
          }}
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 10 + i * 5,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <motion.div
            style={{
              x: 200 + i * 50,
              y: -100,
            }}
            animate={{
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.3,
            }}
          >
            <Shield className="h-8 w-8 text-accent/20" />
          </motion.div>
        </motion.div>
      ))}
      
      <div className="text-center max-w-5xl px-8 relative z-10">
        {/* Logo */}
        <motion.div
          initial={{ scale: 0, rotateY: -180 }}
          animate={{ scale: 1, rotateY: 0 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 120, damping: 12 }}
          className="flex justify-center mb-8"
        >
          <motion.div
            className="relative"
            animate={{ 
              scale: [1, 1.05, 1]
            }}
            transition={{ 
              duration: 4, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <motion.div
              className="absolute inset-0 blur-3xl rounded-full"
              style={{ background: 'hsl(45 100% 51% / 0.2)' }}
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
            
            <motion.img
              src="/logo-no-bg.png"
              alt="TRUST-LOCK Logo"
              className="relative z-10 w-40 h-40 drop-shadow-2xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 1.5 }}
            />
          </motion.div>
        </motion.div>

        {/* Title and description */}
        <motion.h1 
          className="text-7xl font-bold text-foreground mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.8 }}
        >
          TRUSTLOCK
        </motion.h1>
        <motion.p 
          className="text-3xl bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent font-semibold"
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
  // Define pillar content with blue and gold theme
  const pillars = [
    {
      icon: Lock,
      colorClass: 'primary',
      title: 'Identity Verification',
      subtitle: 'WHO is accessing?',
      description: 'Continuous authentication and user behavior analysis'
    },
    {
      icon: Database,
      colorClass: 'accent',
      title: 'Device Intelligence',
      subtitle: 'WHAT device is used?',
      description: 'Real-time device health scoring and compliance checks'
    },
    {
      icon: Zap,
      colorClass: 'primary',
      title: 'Context Analysis',
      subtitle: 'WHERE, WHEN, WHY?',
      description: 'Location, time, and behavioral pattern analysis'
    }
  ];

  const currentPillar = pillars[pillarIndex - 1];
  const Icon = currentPillar.icon;
  const isGold = currentPillar.colorClass === 'accent';

  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.6 }}
      className="fixed inset-0 bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center z-50"
    >
      {/* Decorative background orbs */}
      <motion.div
        className={`absolute top-1/4 ${isGold ? 'right-1/4' : 'left-1/4'} w-96 h-96 ${isGold ? 'bg-accent/5' : 'bg-primary/5'} rounded-full blur-3xl`}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{
          duration: 8,
          repeat: Infinity, 
          ease: "easeInOut"
        }}
      />
      {/* Subtle geometric lines */}
      <div className="absolute inset-0 overflow-hidden opacity-[0.03]">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute h-px ${isGold ? 'bg-accent' : 'bg-primary'}`}
            style={{
              top: `${25 + i * 25}%`,
              width: '100%',
            }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{
              duration: 1.5,
              delay: i * 0.15,
              ease: "easeOut"
            }}
          />
        ))}
      </div>
      
      <div className="relative z-10 w-full max-w-6xl mx-auto px-12">
        {/* Pillar indicator at top */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex justify-center gap-3 mb-8"
        >
          {[1, 2, 3].map((num) => (
            <div
              key={num}
              className={`h-2 w-16 rounded-full transition-all duration-500 ${
                num === pillarIndex
                  ? isGold
                    ? 'bg-accent w-24'
                    : 'bg-primary w-24'
                  : 'bg-muted-foreground/20'
              }`}
            />
          ))}
        </motion.div>

        {/* Main content - Horizontal layout */}
        <div className="grid grid-cols-5 gap-8 items-center">
          {/* Left: Large Icon */}
          <motion.div
            initial={{ scale: 0, rotateY: -180 }}
            animate={{ scale: 1, rotateY: 0 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 100 }}
            className="col-span-2 flex justify-center"
          >
            <div className="relative">
              {/* Outer glow ring */}
              <motion.div
                className={`absolute inset-0 ${isGold ? 'bg-accent/10' : 'bg-primary/10'} rounded-full blur-3xl`}
                animate={{ 
                  scale: [1, 1.4, 1],
                  opacity: [0.4, 0.7, 0.4]
                }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              
              {/* Icon container with gradient */}
              <motion.div
                className={`relative bg-gradient-to-br ${
                  isGold 
                    ? 'from-accent/20 via-accent/10 to-accent/5' 
                    : 'from-primary/20 via-primary/10 to-primary/5'
                } backdrop-blur-sm rounded-3xl p-12 border-2 ${
                  isGold ? 'border-accent/30' : 'border-primary/30'
                }`}
                animate={{
                  rotate: [0, 2, -2, 0],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <Icon className={`h-32 w-32 ${isGold ? 'text-accent' : 'text-primary'}`} strokeWidth={1.5} />
              </motion.div>

              {/* Decorative corner elements */}
              <div className={`absolute -top-3 -left-3 w-6 h-6 border-t-4 border-l-4 ${isGold ? 'border-accent/50' : 'border-primary/50'} rounded-tl-xl`} />
              <div className={`absolute -bottom-3 -right-3 w-6 h-6 border-b-4 border-r-4 ${isGold ? 'border-accent/50' : 'border-primary/50'} rounded-br-xl`} />
            </div>
          </motion.div>

          {/* Right: Content */}
          <motion.div
            initial={{ x: 30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="col-span-3 space-y-6"
          >
            {/* Pillar number badge */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.6, type: "spring" }}
              className={`inline-block px-4 py-2 rounded-full ${
                isGold ? 'bg-accent/10 border-accent/30' : 'bg-primary/10 border-primary/30'
              } border text-xs font-bold tracking-widest uppercase text-muted-foreground`}
            >
              Pillar {pillarIndex} of 3
            </motion.div>

            {/* Title */}
            <h1 className="text-5xl font-bold text-foreground leading-tight">
              {currentPillar.title}
            </h1>

            {/* Subtitle with accent */}
            <div className="flex items-center gap-4">
              <div className={`h-1 w-12 rounded-full ${isGold ? 'bg-accent' : 'bg-primary'}`} />
              <p className={`text-3xl font-semibold ${isGold ? 'text-accent' : 'text-primary'}`}>
                {currentPillar.subtitle}
              </p>
            </div>

            {/* Description card */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="relative"
            >
              <div className={`absolute -inset-2 ${isGold ? 'bg-accent/5' : 'bg-primary/5'} rounded-xl blur-xl`} />
              <div className="relative bg-card/40 backdrop-blur-sm border border-border/50 rounded-xl p-6">
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {currentPillar.description}
                </p>
              </div>
            </motion.div>

            {/* Feature highlights */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.0 }}
              className="flex gap-3 pt-2"
            >
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1.1 + i * 0.1, type: "spring" }}
                  className={`w-2 h-2 rounded-full ${isGold ? 'bg-accent' : 'bg-primary'}`}
                />
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.p 
          className="text-center text-sm text-muted-foreground mt-10"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Press Enter to continue
        </motion.p>
      </div>
    </motion.div>
  );
};

// Transition View - Auto-launches demo
export const TransitionView = () => {
  const { exitPresentation } = usePresentation();
  const { setScenario } = useDashboard();

  // Floating particles for background
  const particles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    top: Math.random() * 100,
    delay: Math.random() * 5,
    duration: 3 + Math.random() * 2,
  }));

  useEffect(() => {
    // After 5 seconds, exit presentation and trigger Scenario 3
    const timer = setTimeout(() => {
      setScenario(2); // Index 2 = 3rd scenario
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
      className="fixed inset-0 bg-gradient-to-br from-[#0B0F1C] via-[#050810] to-[#000000] overflow-hidden flex items-center justify-center z-50"
    >
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
            stroke="url(#lineGradientTransition)"
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
          <linearGradient id="lineGradientTransition" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#F8C537" stopOpacity="0" />
            <stop offset="50%" stopColor="#F8C537" stopOpacity="1" />
            <stop offset="100%" stopColor="#F8C537" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>

      {/* Animated checkmark constellation */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            left: `${20 + i * 10}%`,
            top: `${20 + (i % 3) * 25}%`,
            zIndex: 2,
          }}
          animate={{
            opacity: [0.1, 0.4, 0.1],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 2 + i * 0.3,
            repeat: Infinity,
            delay: i * 0.2,
          }}
        >
          <CheckCircle2 className="h-6 w-6 text-[#F8C537]" />
        </motion.div>
      ))}
      
      <div className="text-center space-y-8 px-4 relative z-10">
        {/* Logo */}
        <motion.div
          initial={{ scale: 0, rotateY: -180 }}
          animate={{ scale: 1, rotateY: 0 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 120, damping: 12 }}
          className="flex justify-center mb-4"
        >
          <motion.div
            className="relative"
            animate={{ 
              scale: [1, 1.05, 1]
            }}
            transition={{ 
              duration: 4, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <motion.div
              className="absolute inset-0 blur-3xl rounded-full bg-[#F8C537]/20"
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
            
            <motion.img
              src="/logo-no-bg.png"
              alt="TRUST-LOCK Logo"
              className="relative z-10 w-32 h-32 drop-shadow-2xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1.5 }}
            />
          </motion.div>
        </motion.div>

        {/* Text Content */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <h1 className="text-5xl font-bold text-white mb-4">
            Ready to See It In Action?
          </h1>
          <p className="text-2xl bg-gradient-to-r from-[#3B82F6] to-[#F8C537] bg-clip-text text-transparent font-semibold mb-3">
            Experience TRUST-LOCK live security monitoring
          </p>
          <p className="text-lg text-gray-400">
            Real-time threat detection and response
          </p>
        </motion.div>

        {/* Three Pillars Completed Indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.2, duration: 0.6 }}
          className="flex justify-center gap-6 pt-4"
        >
          {['Identity', 'Device', 'Context'].map((pillar, index) => (
            <motion.div
              key={pillar}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 2.4 + index * 0.2, type: 'spring' }}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/30"
            >
              <CheckCircle2 className="w-4 h-4 text-green-500" />
              <span className="text-sm text-green-400 font-medium">{pillar}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Loading indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.2, duration: 0.6 }}
          className="flex items-center justify-center gap-3 text-gray-400 pt-6"
        >
          <motion.div
            animate={{ 
              rotate: 360,
              scale: [1, 1.2, 1]
            }}
            transition={{ 
              rotate: { duration: 2, repeat: Infinity, ease: "linear" },
              scale: { duration: 1, repeat: Infinity }
            }}
            className="relative"
          >
            <div className="w-3 h-3 bg-[#F8C537] rounded-full" />
            <motion.div
              className="absolute inset-0 bg-[#F8C537]/30 rounded-full"
              animate={{
                scale: [1, 2, 1],
                opacity: [0.5, 0, 0.5]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity
              }}
            />
          </motion.div>
          <span className="text-base">Loading interactive demo...</span>
        </motion.div>
      </div>
    </motion.div>
  );
};
