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
              <h2 className="text-2xl font-bold text-foreground mb-4">About This Demo</h2>
              <p className="text-foreground/90 mb-3">
                This is a Zero Trust Access Gateway proof-of-concept developed for the Wema Bank Hackathon 2025. 
                The system demonstrates intelligent, risk-based access control that continuously evaluates security 
                posture before granting access to sensitive resources.
              </p>
              <p className="text-foreground/90">
                Unlike traditional VPN solutions that grant "all or nothing" access, this gateway makes dynamic 
                decisions based on multiple security factors, ensuring that only verified users on trusted devices 
                can access banking systems.
              </p>
            </section>

            <section className="bg-muted/30 rounded-lg p-6 border border-border">
              <h2 className="text-2xl font-bold text-foreground mb-4">Risk Scoring Model</h2>
              <div className="grid md:grid-cols-3 gap-4 mb-4">
                <div className="bg-card/40 rounded-lg p-4 border border-border">
                  <div className="flex items-center gap-2 mb-2">
                    <Lock className="h-5 w-5 text-primary" />
                    <h3 className="font-semibold text-foreground">Identity (0-20)</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Multi-factor authentication, password strength, credential freshness
                  </p>
                </div>
                
                <div className="bg-card/40 rounded-lg p-4 border border-border">
                  <div className="flex items-center gap-2 mb-2">
                    <Database className="h-5 w-5 text-warning" />
                    <h3 className="font-semibold text-foreground">Device (0-50)</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Device posture, encryption status, security patches, firewall state
                  </p>
                </div>
                
                <div className="bg-card/40 rounded-lg p-4 border border-border">
                  <div className="flex items-center gap-2 mb-2">
                    <Zap className="h-5 w-5 text-secondary" />
                    <h3 className="font-semibold text-foreground">Context (0-50)</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Location, time of access, behavioral patterns, network security
                  </p>
                </div>
              </div>
              <p className="text-sm text-foreground/90">
                <strong>Total Risk Score Range:</strong> 0-100 points
              </p>
            </section>

            <section className="bg-muted/30 rounded-lg p-6 border border-border">
              <h2 className="text-2xl font-bold text-foreground mb-4">Decision Thresholds</h2>
              <div className="space-y-3">
                <div className="flex items-center gap-4">
                  <div className="w-24 h-12 bg-gradient-success rounded-lg flex items-center justify-center text-success-foreground font-bold">
                    0-20
                  </div>
                  <div>
                    <h3 className="font-semibold text-success">Grant Access</h3>
                    <p className="text-sm text-muted-foreground">
                      Low risk - All security checks passed, user trusted
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-24 h-12 bg-gradient-warning rounded-lg flex items-center justify-center text-warning-foreground font-bold">
                    21-49
                  </div>
                  <div>
                    <h3 className="font-semibold text-warning">Challenge Required</h3>
                    <p className="text-sm text-muted-foreground">
                      Medium risk - Additional verification needed (MFA, security questions)
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-24 h-12 bg-gradient-danger rounded-lg flex items-center justify-center text-destructive-foreground font-bold">
                    50+
                  </div>
                  <div>
                    <h3 className="font-semibold text-destructive">Block Access</h3>
                    <p className="text-sm text-muted-foreground">
                      High risk - Critical security issues detected, access denied
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section className="bg-primary/10 border-2 border-primary/50 rounded-lg p-6">
              <h2 className="text-xl font-bold text-foreground mb-3">Demo Scenarios</h2>
              <p className="text-sm text-foreground/90 mb-3">
                Use the floating Demo Controller to test different security scenarios:
              </p>
              <ul className="space-y-2 text-sm text-foreground/90">
                <li><strong>Scenario 1:</strong> Trusted employee on known device → Access Granted</li>
                <li><strong>Scenario 2:</strong> New device detected → Challenge Required</li>
                <li><strong>Scenario 3:</strong> Impossible travel detected → Access Blocked</li>
                <li><strong>Scenario 4:</strong> Compromised device security → Access Blocked</li>
              </ul>
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
