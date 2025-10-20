/**
 * Landing View - Trust-Lock Branding Page
 * 
 * PLACEHOLDER for Phase 2 testing
 * Full implementation in Phase 3
 */

import { motion } from 'framer-motion';
import { Shield } from 'lucide-react';

export const LandingView = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.2 }}
      transition={{ duration: 0.6 }}
      className="fixed inset-0 bg-gradient-to-br from-background via-primary/20 to-background flex items-center justify-center z-50"
    >
      <div className="text-center space-y-8">
        {/* Logo */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
          className="flex justify-center"
        >
          <div className="bg-gradient-primary p-6 rounded-2xl shadow-glow">
            <Shield className="h-24 w-24 text-primary-foreground" />
          </div>
        </motion.div>

        {/* Product Name */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <h1 className="text-7xl font-bold text-foreground mb-4">
            TRUST<span className="text-primary">-</span>LOCK
          </h1>
          <p className="text-2xl text-muted-foreground mb-2">Smart Access Gateway</p>
          <p className="text-xl text-muted-foreground">Zero Trust Security for Modern Banking</p>
        </motion.div>

        {/* Branding */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-sm text-muted-foreground"
        >
          Wema Bank Hackathon 2025
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="space-y-4"
        >
          <div className="inline-block px-8 py-4 bg-gradient-primary rounded-lg shadow-glow">
            <span className="text-xl font-semibold text-primary-foreground">Explore →</span>
          </div>
          
          <p className="text-sm text-muted-foreground animate-pulse">
            Press Enter to begin
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};
