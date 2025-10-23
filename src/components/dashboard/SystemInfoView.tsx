import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Shield, Laptop, MapPin, Activity, Info } from 'lucide-react';

export const SystemInfoView = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-6 py-8"
    >
      <Card className="bg-card/50 backdrop-blur-md border-border/50 shadow-xl p-8 relative overflow-hidden">
        {/* Decorative gradient */}
        <div className="absolute top-0 right-0 w-60 h-60 bg-gradient-to-bl from-primary/10 to-accent/10 rounded-full blur-3xl" />
        
        <div className="max-w-4xl mx-auto relative">
          <div className="text-center mb-10">
            <div className="inline-flex flex-col items-center gap-4 mb-4">
              <div className="relative">
                <div className="absolute inset-0 bg-primary/20 rounded-2xl blur-2xl" />
                <div className="relative bg-gradient-to-br from-primary to-accent p-4 rounded-2xl shadow-xl">
                  <Shield className="h-12 w-12 text-primary-foreground" strokeWidth={2} />
                </div>
              </div>
              <h1 className="text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Smart Access Gateway
              </h1>
            </div>
            <p className="text-xl text-muted-foreground font-medium">Zero Trust Security Platform</p>
          </div>

          <div className="space-y-6">
            <section className="bg-card/60 backdrop-blur-sm rounded-xl p-7 border border-border/50">
              <div className="flex items-center gap-3 mb-5">
                <div className="relative">
                  <div className="absolute inset-0 bg-primary/20 rounded-lg blur-md" />
                  <div className="relative bg-gradient-to-br from-primary to-primary/80 p-2 rounded-lg">
                    <Info className="h-5 w-5 text-primary-foreground" strokeWidth={2} />
                  </div>
                </div>
                <h2 className="text-2xl font-bold text-foreground">About This System</h2>
              </div>
              <p className="text-foreground/90 mb-3 leading-relaxed">
                TRUST-LOCK is a Zero Trust security gateway that analyzes every login attempt in real-time. 
                Instead of just checking passwords, it looks at device fingerprints, IP geolocation, and behavioral 
                patterns to calculate a risk score and decide whether to grant, challenge, or block access.
              </p>
              <p className="text-foreground/90 leading-relaxed">
                Built with React + TypeScript frontend, Supabase Edge Functions for the risk analysis backend, 
                and PostgreSQL with real-time subscriptions so the dashboard updates live when someone logs in.
              </p>
            </section>

            <section className="bg-card/60 backdrop-blur-sm rounded-xl p-7 border border-border/50">
              <div className="flex items-center gap-3 mb-5">
                <div className="relative">
                  <div className="absolute inset-0 bg-accent/20 rounded-lg blur-md" />
                  <div className="relative bg-gradient-to-br from-accent to-accent/80 p-2 rounded-lg">
                    <Activity className="h-5 w-5 text-primary-foreground" strokeWidth={2} />
                  </div>
                </div>
                <h2 className="text-2xl font-bold text-foreground">Risk Scoring Model</h2>
              </div>
              <div className="grid md:grid-cols-2 gap-4 mb-5">
                <div className="bg-card/60 backdrop-blur-sm rounded-xl p-5 border border-border/50 hover:border-primary/30 transition-colors">
                  <div className="flex items-center gap-2.5 mb-3">
                    <div className="bg-gradient-to-br from-primary/20 to-primary/10 p-2 rounded-lg">
                      <Shield className="h-5 w-5 text-primary" strokeWidth={2} />
                    </div>
                    <h3 className="font-bold text-foreground">Identity (+10)</h3>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Valid credentials verified - base points for authentication
                  </p>
                </div>
                
                <div className="bg-card/60 backdrop-blur-sm rounded-xl p-5 border border-border/50 hover:border-warning/30 transition-colors">
                  <div className="flex items-center gap-2.5 mb-3">
                    <div className="bg-gradient-to-br from-warning/20 to-warning/10 p-2 rounded-lg">
                      <Laptop className="h-5 w-5 text-warning" strokeWidth={2} />
                    </div>
                    <h3 className="font-bold text-foreground">Device (+5 to +25)</h3>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Trusted device +5 points, New/unknown device +25 points
                  </p>
                </div>
                
                <div className="bg-card/60 backdrop-blur-sm rounded-xl p-5 border border-border/50 hover:border-accent/30 transition-colors">
                  <div className="flex items-center gap-2.5 mb-3">
                    <div className="bg-gradient-to-br from-accent/20 to-accent/10 p-2 rounded-lg">
                      <MapPin className="h-5 w-5 text-accent" strokeWidth={2} />
                    </div>
                    <h3 className="font-bold text-foreground">Location (+5 to +25)</h3>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Known location +5, Same country +15, Different country +25
                  </p>
                </div>

                <div className="bg-card/60 backdrop-blur-sm rounded-xl p-5 border border-border/50 hover:border-success/30 transition-colors">
                  <div className="flex items-center gap-2.5 mb-3">
                    <div className="bg-gradient-to-br from-success/20 to-success/10 p-2 rounded-lg">
                      <Activity className="h-5 w-5 text-success" strokeWidth={2} />
                    </div>
                    <h3 className="font-bold text-foreground">Behavior (+5 to +60)</h3>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Normal +5, First login +10, Impossible travel +60 points
                  </p>
                </div>
              </div>
              <p className="text-sm text-foreground/90 font-medium">
                <strong>Additive Risk Model:</strong> Start at 0, add points for each pillar (Max: 100)
              </p>
            </section>

            <section className="bg-card/60 backdrop-blur-sm rounded-xl p-7 border border-border/50">
              <h2 className="text-2xl font-bold text-foreground mb-6">Decision Thresholds</h2>
              <div className="space-y-4">
                <div className="flex items-center gap-5">
                  <div className="w-28 h-14 bg-gradient-to-r from-success to-success/80 rounded-xl flex items-center justify-center text-success-foreground font-bold text-lg shadow-lg">
                    0-30
                  </div>
                  <div>
                    <h3 className="font-bold text-success flex items-center gap-2 mb-1">
                      <Shield className="h-4 w-4" strokeWidth={2.5} />
                      Grant Access
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Low risk - All security checks passed, trusted employee on known device
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-5">
                  <div className="w-28 h-14 bg-gradient-to-r from-warning to-warning/80 rounded-xl flex items-center justify-center text-warning-foreground font-bold text-lg shadow-lg">
                    31-60
                  </div>
                  <div>
                    <h3 className="font-bold text-warning flex items-center gap-2 mb-1">
                      <Shield className="h-4 w-4" strokeWidth={2.5} />
                      Challenge Required
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Medium risk - New device or location detected, additional MFA required
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-5">
                  <div className="w-28 h-14 bg-gradient-to-r from-destructive to-destructive/80 rounded-xl flex items-center justify-center text-destructive-foreground font-bold text-lg shadow-lg">
                    61+
                  </div>
                  <div>
                    <h3 className="font-bold text-destructive flex items-center gap-2 mb-1">
                      <Shield className="h-4 w-4" strokeWidth={2.5} />
                      Block Access
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      High risk - Impossible travel or compromised device detected, access denied
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <div className="text-center pt-6">
              <p className="text-sm text-muted-foreground font-medium">
                Built for Wema Bank Hackathon 2025 | Zero Trust Security Demonstration
              </p>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};
