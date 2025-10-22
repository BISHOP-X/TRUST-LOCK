import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Shield, Database, Lock, Zap } from 'lucide-react';

export const SystemInfoView = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-6 py-8"
    >
      <Card className="bg-card/60 backdrop-blur-glass border-border shadow-card p-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="bg-gradient-primary p-3 rounded-lg shadow-glow">
                <Shield className="h-8 w-8 text-primary-foreground" />
              </div>
              <h1 className="text-4xl font-bold text-foreground">Smart Access Gateway</h1>
            </div>
            <p className="text-lg text-muted-foreground">Zero Trust Security Platform</p>
          </div>

          <div className="space-y-6">
            <section className="bg-muted/30 rounded-lg p-6 border border-border">
              <h2 className="text-2xl font-bold text-foreground mb-4">About This System</h2>
              <p className="text-foreground/90 mb-3">
                TRUST-LOCK is a Zero Trust security gateway that analyzes every login attempt in real-time. 
                Instead of just checking passwords, it looks at device fingerprints, IP geolocation, and behavioral 
                patterns to calculate a risk score and decide whether to grant, challenge, or block access.
              </p>
              <p className="text-foreground/90">
                Built with React + TypeScript frontend, Supabase Edge Functions for the risk analysis backend, 
                and PostgreSQL with real-time subscriptions so the dashboard updates live when someone logs in.
              </p>
            </section>

            <section className="bg-muted/30 rounded-lg p-6 border border-border">
              <h2 className="text-2xl font-bold text-foreground mb-4">Risk Scoring Model</h2>
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div className="bg-card/40 rounded-lg p-4 border border-border">
                  <div className="flex items-center gap-2 mb-2">
                    <Lock className="h-5 w-5 text-primary" />
                    <h3 className="font-semibold text-foreground">Identity (+10)</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Valid credentials verified - base points for authentication
                  </p>
                </div>
                
                <div className="bg-card/40 rounded-lg p-4 border border-border">
                  <div className="flex items-center gap-2 mb-2">
                    <Database className="h-5 w-5 text-warning" />
                    <h3 className="font-semibold text-foreground">Device (+5 to +25)</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Trusted device +5 points, New/unknown device +25 points
                  </p>
                </div>
                
                <div className="bg-card/40 rounded-lg p-4 border border-border">
                  <div className="flex items-center gap-2 mb-2">
                    <Zap className="h-5 w-5 text-secondary" />
                    <h3 className="font-semibold text-foreground">Location (+5 to +25)</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Known location +5, Same country +15, Different country +25
                  </p>
                </div>

                <div className="bg-card/40 rounded-lg p-4 border border-border">
                  <div className="flex items-center gap-2 mb-2">
                    <Shield className="h-5 w-5 text-success" />
                    <h3 className="font-semibold text-foreground">Behavior (+5 to +60)</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Normal +5, First login +10, Impossible travel +60 points
                  </p>
                </div>
              </div>
              <p className="text-sm text-foreground/90">
                <strong>Additive Risk Model:</strong> Start at 0, add points for each pillar (Max: 100)
              </p>
            </section>

            <section className="bg-muted/30 rounded-lg p-6 border border-border">
              <h2 className="text-2xl font-bold text-foreground mb-4">Decision Thresholds</h2>
              <div className="space-y-3">
                <div className="flex items-center gap-4">
                  <div className="w-24 h-12 bg-gradient-success rounded-lg flex items-center justify-center text-success-foreground font-bold">
                    0-30
                  </div>
                  <div>
                    <h3 className="font-semibold text-success">✅ Grant Access</h3>
                    <p className="text-sm text-muted-foreground">
                      Low risk - All security checks passed, trusted employee on known device
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-24 h-12 bg-gradient-warning rounded-lg flex items-center justify-center text-warning-foreground font-bold">
                    31-60
                  </div>
                  <div>
                    <h3 className="font-semibold text-warning">⚠️ Challenge Required</h3>
                    <p className="text-sm text-muted-foreground">
                      Medium risk - New device or location detected, additional MFA required
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-24 h-12 bg-gradient-danger rounded-lg flex items-center justify-center text-destructive-foreground font-bold">
                    61+
                  </div>
                  <div>
                    <h3 className="font-semibold text-destructive">🚨 Block Access</h3>
                    <p className="text-sm text-muted-foreground">
                      High risk - Impossible travel or compromised device detected, access denied
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <div className="text-center pt-4">
              <p className="text-sm text-muted-foreground">
                Built for Wema Bank Hackathon 2025 | Zero Trust Security Demonstration
              </p>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};
