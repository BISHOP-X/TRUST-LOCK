/**
 * Placeholder Presentation Views
 * 
 * Simple placeholder components for Phase 2 testing
 * Will be replaced with full implementations in Phase 3
 */

import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, HelpCircle, Shield, Lock, Database, Zap, Wifi, Server, Users, CheckCircle2, XCircle } from 'lucide-react';
import { useState, useEffect } from 'react';
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
      transition={{ duration: 0.8 }}
      className="fixed inset-0 bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center z-50"
    >
      {/* Subtle background grid */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(hsl(220 90% 56% / 0.5) 1px, transparent 1px), linear-gradient(90deg, hsl(220 90% 56% / 0.5) 1px, transparent 1px)',
          backgroundSize: '80px 80px'
        }} />
      </div>

      {/* Subtle accent orbs */}
      <motion.div
        className="absolute top-20 right-20 w-96 h-96 bg-accent/5 rounded-full blur-3xl"
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
      <motion.div
        className="absolute bottom-20 left-20 w-80 h-80 bg-primary/5 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-12">
        {/* Compact Title */}
        <motion.div
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="flex items-center justify-center gap-3 mb-10"
        >
          <motion.div
            animate={{
              rotate: [0, -3, 3, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <AlertTriangle className="h-11 w-11 text-destructive drop-shadow-lg" strokeWidth={2} />
          </motion.div>
          <h1 className="text-4xl font-bold text-destructive">THE PROBLEM</h1>
        </motion.div>

        {/* Main Content - Two Columns */}
        <div className="grid grid-cols-2 gap-12 items-center">
          {/* Left: Modern Work Environment */}
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="space-y-6"
          >
            <div className="relative">
              <motion.div
                className="absolute -inset-2 bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl blur-xl"
                animate={{
                  opacity: [0.3, 0.6, 0.3]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity
                }}
              />
              <p className="relative text-xl text-muted-foreground font-medium text-center mb-8 bg-card/50 backdrop-blur-sm rounded-xl py-3 border border-primary/10">
                Traditional security is obsolete
              </p>
            </div>

            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
                className="relative group"
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-primary/50 rounded-xl opacity-20 group-hover:opacity-30 transition blur-sm" />
                <div className="relative flex items-center gap-4 bg-card/60 backdrop-blur-sm border border-primary/20 rounded-xl p-4">
                  <div className="relative">
                    <div className="absolute inset-0 bg-primary/20 rounded-lg blur-md" />
                    <Wifi className="relative h-8 w-8 text-primary flex-shrink-0" strokeWidth={1.5} />
                  </div>
                  <p className="text-base text-foreground">Work from anywhere</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 }}
                className="relative group"
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-accent to-accent/50 rounded-xl opacity-20 group-hover:opacity-30 transition blur-sm" />
                <div className="relative flex items-center gap-4 bg-card/60 backdrop-blur-sm border border-accent/20 rounded-xl p-4">
                  <div className="relative">
                    <div className="absolute inset-0 bg-accent/20 rounded-lg blur-md" />
                    <Users className="relative h-8 w-8 text-accent flex-shrink-0" strokeWidth={1.5} />
                  </div>
                  <p className="text-base text-foreground">Personal devices (BYOD)</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.0 }}
                className="relative group"
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-primary/50 rounded-xl opacity-20 group-hover:opacity-30 transition blur-sm" />
                <div className="relative flex items-center gap-4 bg-card/60 backdrop-blur-sm border border-primary/20 rounded-xl p-4">
                  <div className="relative">
                    <div className="absolute inset-0 bg-primary/20 rounded-lg blur-md" />
                    <Server className="relative h-8 w-8 text-primary flex-shrink-0" strokeWidth={1.5} />
                  </div>
                  <p className="text-base text-foreground">Untrusted networks</p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right: The Vulnerability */}
          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="relative"
          >
            {/* Glow effect when breached */}
            {breachStarted && (
              <motion.div
                className="absolute -inset-2 bg-gradient-to-br from-destructive/20 to-destructive/5 rounded-3xl blur-2xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
              />
            )}
            
            <div className={`relative bg-gradient-to-br ${breachStarted ? 'from-destructive/10 to-destructive/5' : 'from-card/40 to-background'} backdrop-blur-sm border-2 ${breachStarted ? 'border-destructive/40' : 'border-border/50'} rounded-2xl p-8 transition-all duration-1000`}>
              <div className="text-center space-y-6">
                <motion.div
                  className="flex items-center justify-center gap-3"
                  animate={breachStarted ? { color: '#ef4444' } : { color: '#e2e8f0' }}
                  transition={{ duration: 1 }}
                >
                  <Lock className="h-7 w-7" />
                  <p className="text-xl font-semibold">1 stolen VPN password</p>
                </motion.div>

                <motion.div
                  className="text-3xl font-black"
                  animate={breachStarted ? { color: '#ef4444', scale: [1, 1.1, 1] } : { color: '#64748b' }}
                  transition={{ duration: 1 }}
                >
                  =
                </motion.div>

                <motion.div
                  className="flex items-center justify-center gap-3"
                  animate={breachStarted ? { 
                    color: '#ef4444',
                    textShadow: '0 0 20px rgba(239, 68, 68, 0.4)'
                  } : { color: '#94a3b8' }}
                  transition={{ duration: 1 }}
                >
                  <XCircle className="h-8 w-8" />
                  <p className="text-2xl font-black">FULL NETWORK ACCESS</p>
                </motion.div>

                {/* Risk factors */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: breachStarted ? 1 : 0 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  className="pt-6 border-t border-destructive/20 mt-6"
                >
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { icon: Database, text: 'Customer data' },
                      { icon: Server, text: 'Core systems' },
                      { icon: Shield, text: 'Admin tools' },
                      { icon: AlertTriangle, text: 'Undetectable' }
                    ].map((risk, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ scale: 0 }}
                        animate={breachStarted ? { scale: 1 } : { scale: 0 }}
                        transition={{ delay: 0.7 + idx * 0.1, type: "spring" }}
                        className="flex items-center gap-2 text-destructive/80"
                      >
                        <risk.icon className="h-4 w-4" strokeWidth={2} />
                        <p className="text-xs font-medium">{risk.text}</p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.p 
          className="text-center text-xs text-muted-foreground mt-10"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
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
      {/* Subtle floating question marks - smaller and more transparent */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-4xl text-accent/5 font-bold"
          style={{
            left: `${15 + i * 14}%`,
            top: `${25 + (i % 3) * 15}%`,
          }}
          animate={{
            y: [0, -15, 0],
            opacity: [0.03, 0.08, 0.03],
          }}
          transition={{
            duration: 4 + i * 0.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.3,
          }}
        >
          ?
        </motion.div>
      ))}

      {/* Decorative accent orbs */}
      <motion.div
        className="absolute top-1/4 right-1/4 w-64 h-64 bg-accent/5 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.4, 0.2]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute bottom-1/4 left-1/4 w-72 h-72 bg-primary/5 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <div className="text-center max-w-5xl px-12 relative z-10">
        {/* Icon with enhanced design */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
          className="relative inline-block mb-8"
        >
          {/* Multiple glow layers */}
          <motion.div
            className="absolute inset-0 blur-3xl rounded-full"
            style={{ background: 'hsl(45 100% 51% / 0.15)' }}
            animate={{ 
              scale: [1, 1.4, 1],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{ 
              duration: 3, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute inset-0 blur-xl rounded-full"
            style={{ background: 'hsl(220 90% 56% / 0.1)' }}
            animate={{ 
              scale: [1.2, 1, 1.2],
              opacity: [0.2, 0.4, 0.2]
            }}
            transition={{ 
              duration: 4, 
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5
            }}
          />
          
          {/* Icon container with gradient border */}
          <div className="relative bg-gradient-to-br from-card/50 to-background/50 backdrop-blur-sm rounded-full p-6 border border-accent/20">
            <HelpCircle className="h-20 w-20 text-accent relative z-10" strokeWidth={2} />
          </div>
        </motion.div>

        {/* Title */}
        <motion.h1 
          className="text-4xl font-bold text-foreground mb-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          The Challenge
        </motion.h1>

        {/* Main question - styled card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="relative"
        >
          {/* Gradient glow background */}
          <div className="absolute -inset-4 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 rounded-3xl blur-2xl opacity-50" />
          
          {/* Content card */}
          <div className="relative bg-card/40 backdrop-blur-md border border-primary/20 rounded-2xl p-8">
            <p className="text-3xl text-primary font-semibold leading-relaxed">
              How do we secure sensitive data in a<br />
              <span className="bg-gradient-to-r from-accent to-accent/80 bg-clip-text text-transparent">'work-from-anywhere'</span> world<br />
              <span className="text-foreground">WITHOUT compromising productivity?</span>
            </p>
          </div>

          {/* Decorative corner accents */}
          <div className="absolute -top-2 -left-2 w-4 h-4 border-t-2 border-l-2 border-accent/40 rounded-tl-lg" />
          <div className="absolute -top-2 -right-2 w-4 h-4 border-t-2 border-r-2 border-primary/40 rounded-tr-lg" />
          <div className="absolute -bottom-2 -left-2 w-4 h-4 border-b-2 border-l-2 border-primary/40 rounded-bl-lg" />
          <div className="absolute -bottom-2 -right-2 w-4 h-4 border-b-2 border-r-2 border-accent/40 rounded-br-lg" />
        </motion.div>

        <motion.p 
          className="text-sm text-muted-foreground mt-10"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          initial={{ opacity: 0 }}
        >
          Press Enter to continue
        </motion.p>
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
      className="fixed inset-0 bg-gradient-to-br from-primary/20 via-background to-accent/10 flex items-center justify-center z-50"
    >
      {/* Orbiting shield icons */}
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            left: '50%',
            top: '50%',
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
              src="/src/Logo/logo-no-bg.png"
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
      className="fixed inset-0 bg-gradient-to-br from-background via-primary/10 to-accent/10 flex items-center justify-center z-50"
    >
      {/* Animated shield constellation */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            left: `${20 + i * 10}%`,
            top: `${20 + (i % 3) * 25}%`,
          }}
          animate={{
            opacity: [0.1, 0.3, 0.1],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 2 + i * 0.3,
            repeat: Infinity,
            delay: i * 0.2,
          }}
        >
          <CheckCircle2 className="h-6 w-6 text-accent" />
        </motion.div>
      ))}
      
      <div className="text-center space-y-12 px-4 relative z-10">
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
              src="/src/Logo/logo-no-bg.png"
              alt="TRUST-LOCK Logo"
              className="relative z-10 w-40 h-40 drop-shadow-2xl"
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
          transition={{ delay: 2.0, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <h1 className="text-6xl font-black text-foreground mb-6">
            Ready for Live Demo
          </h1>
          <p className="text-3xl bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent font-semibold mb-3">
            Watch Trust-Lock block a real attack in real-time
          </p>
          <p className="text-xl text-muted-foreground">
            Demonstrating: <span className="text-accent font-semibold">Impossible Travel Detection</span>
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
            <div className="w-3 h-3 bg-accent rounded-full" />
            <motion.div
              className="absolute inset-0 bg-accent/30 rounded-full"
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
          <span className="text-lg">Initializing security gateway...</span>
        </motion.div>
      </div>
    </motion.div>
  );
};
