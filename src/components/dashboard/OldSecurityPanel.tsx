import { AlertTriangle, Network } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { motion } from 'framer-motion';

export const OldSecurityPanel = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="h-full flex flex-col"
    >
      <Card className="flex-1 bg-gradient-danger border-destructive/50 shadow-danger-glow">
        <div className="p-6 h-full flex flex-col">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-destructive/20 p-2 rounded-lg">
              <Network className="h-6 w-6 text-destructive" />
            </div>
            <h2 className="text-2xl font-bold text-destructive-foreground">Traditional VPN Security</h2>
          </div>

          {/* TODO: Replace with Three.js network visualization */}
          <div className="flex-1 flex items-center justify-center mb-6">
            <div className="relative w-full max-w-md aspect-square">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-32 h-32 rounded-full bg-destructive/30 border-4 border-destructive animate-pulse flex items-center justify-center">
                  <Network className="h-16 w-16 text-destructive" />
                </div>
              </div>
              <div className="absolute top-4 left-4 w-12 h-12 rounded-full bg-destructive/20 border-2 border-destructive" />
              <div className="absolute top-4 right-4 w-12 h-12 rounded-full bg-destructive/20 border-2 border-destructive" />
              <div className="absolute bottom-4 left-4 w-12 h-12 rounded-full bg-destructive/20 border-2 border-destructive" />
              <div className="absolute bottom-4 right-4 w-12 h-12 rounded-full bg-destructive/20 border-2 border-destructive" />
              <div className="absolute top-1/2 left-4 right-4 h-0.5 bg-destructive/50" />
              <div className="absolute top-4 bottom-4 left-1/2 w-0.5 bg-destructive/50" />
            </div>
          </div>

          <div className="bg-destructive/20 border-2 border-destructive rounded-lg p-4 mb-6 backdrop-blur-sm">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="h-5 w-5 text-destructive animate-pulse" />
              <span className="font-bold text-destructive-foreground">⚠️ BREACHED</span>
            </div>
            <p className="text-sm text-destructive-foreground/90">
              Full network access compromised through single entry point
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-card/40 backdrop-blur-sm rounded-lg p-4 border border-destructive/30">
              <p className="text-xs text-muted-foreground mb-1">Access Control</p>
              <p className="text-lg font-bold text-destructive">All or Nothing</p>
            </div>
            <div className="bg-card/40 backdrop-blur-sm rounded-lg p-4 border border-destructive/30">
              <p className="text-xs text-muted-foreground mb-1">Devices Checked</p>
              <p className="text-lg font-bold text-destructive">None</p>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};
