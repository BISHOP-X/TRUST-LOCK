/**
 * Placeholder Presentation Views
 * 
 * Simple placeholder components for Phase 2 testing
 * Will be replaced with full implementations in Phase 3
 */

import { motion } from 'framer-motion';
import { AlertTriangle, HelpCircle, Shield, Lock, Database, Zap } from 'lucide-react';

// Problem View Placeholder
export const ProblemView = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.6 }}
      className="fixed inset-0 bg-gradient-to-br from-destructive/30 to-background flex items-center justify-center z-50"
    >
      <div className="text-center max-w-4xl px-8">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring" }}
        >
          <AlertTriangle className="h-32 w-32 text-destructive mx-auto mb-8" />
        </motion.div>
        <h1 className="text-6xl font-bold text-destructive mb-6">The Problem</h1>
        <p className="text-3xl text-foreground/90 leading-relaxed">
          One stolen VPN password = <br />
          <span className="font-bold text-destructive">FULL NETWORK ACCESS</span>
        </p>
        <p className="text-sm text-muted-foreground mt-12 animate-pulse">
          Press Enter to continue
        </p>
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
      className="fixed inset-0 bg-background flex items-center justify-center z-50"
    >
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
      <div className="text-center max-w-5xl px-8">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.2, type: "spring", bounce: 0.4 }}
        >
          <div className="bg-gradient-primary p-8 rounded-2xl shadow-glow inline-block mb-8">
            <Shield className="h-32 w-32 text-primary-foreground" />
          </div>
        </motion.div>
        <h1 className="text-7xl font-bold text-foreground mb-6">
          Trust-Lock
        </h1>
        <p className="text-3xl text-primary/90">
          Zero Trust Security Built on Three Pillars
        </p>
        <p className="text-sm text-muted-foreground mt-12 animate-pulse">
          Press Enter to continue
        </p>
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
      className="fixed inset-0 bg-background flex items-center justify-center z-50"
    >
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

// Transition View Placeholder
export const TransitionView = () => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 1, delay: 0.5 }}
      className="fixed inset-0 bg-background flex items-center justify-center z-50"
    >
      <motion.h1
        initial={{ scale: 1 }}
        animate={{ scale: 1.5, opacity: 0 }}
        transition={{ duration: 1 }}
        className="text-6xl font-bold text-primary"
      >
        See Trust-Lock in Action...
      </motion.h1>
    </motion.div>
  );
};
