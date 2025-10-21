import { useState } from 'react';
import { DashboardProvider } from '@/contexts/DashboardContext';
import { PresentationProvider } from '@/contexts/PresentationContext';
import { PresentationWrapper } from '@/components/presentation/PresentationWrapper';
import { NavigationBar } from '@/components/dashboard/NavigationBar';
import { RiskDetailsPanel } from '@/components/dashboard/RiskDetailsPanel';
import { AuditLogView } from '@/components/dashboard/AuditLogView';
import { SystemInfoView } from '@/components/dashboard/SystemInfoView';
import { RiskGauge } from '@/components/dashboard/RiskGauge';
import { useDashboard } from '@/contexts/DashboardContext';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, AlertCircle, XCircle, Shield, Activity } from 'lucide-react';

const DemoView = () => {
  const { decision, riskFactors, reason, riskScore } = useDashboard();

  const getDecisionStyle = () => {
    switch (decision) {
      case 'GRANTED':
        return 'bg-gradient-success text-success-foreground shadow-[0_0_20px_hsl(var(--success)/0.5)]';
      case 'CHALLENGE':
        return 'bg-gradient-warning text-warning-foreground shadow-[0_0_20px_hsl(var(--warning)/0.5)]';
      case 'BLOCKED':
        return 'bg-gradient-danger text-destructive-foreground shadow-[0_0_20px_hsl(var(--destructive)/0.5)]';
    }
  };

  const getDecisionIcon = () => {
    switch (decision) {
      case 'GRANTED':
        return <CheckCircle className="h-5 w-5" />;
      case 'CHALLENGE':
        return <AlertCircle className="h-5 w-5" />;
      case 'BLOCKED':
        return <XCircle className="h-5 w-5" />;
    }
  };

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="grid lg:grid-cols-3 gap-6 mb-8">
        {/* Live Security Status */}
        <Card className="lg:col-span-1 bg-card/60 backdrop-blur-glass border-primary/50 shadow-glow p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-gradient-primary p-2 rounded-lg shadow-glow">
              <Shield className="h-5 w-5 text-primary-foreground" />
            </div>
            <h2 className="text-xl font-bold text-foreground">Live Security Status</h2>
          </div>

          <div className="flex flex-col items-center justify-center mb-6">
            <RiskGauge />
            
            <AnimatePresence mode="wait">
              {decision && (
                <motion.div
                  key={decision}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-6"
                >
                  <Badge className={`text-lg px-6 py-2 ${getDecisionStyle()}`}>
                    <span className="mr-2">{getDecisionIcon()}</span>
                    ACCESS {decision}
                  </Badge>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {riskFactors.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-xs font-semibold text-muted-foreground mb-2">Risk Factors</h3>
              {riskFactors.map((factor, index) => (
                <motion.div
                  key={`${factor.name}-${index}`}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-card/40 backdrop-blur-sm rounded-lg p-2 border border-border"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-foreground">{factor.label}</span>
                    <span className="text-xs text-muted-foreground">+{factor.points}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </Card>

        {/* Real-Time Analysis Panel */}
        <Card className="lg:col-span-2 bg-card/60 backdrop-blur-glass border-primary/50 shadow-glow p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-gradient-primary p-2 rounded-lg shadow-glow">
              <Activity className="h-5 w-5 text-primary-foreground" />
            </div>
            <h2 className="text-xl font-bold text-foreground">Real-Time Analysis</h2>
          </div>

          {/* Waiting State */}
          {!decision && (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <motion.div
                animate={{ 
                  scale: [1, 1.1, 1],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <Shield className="h-16 w-16 text-primary/50 mb-4" />
              </motion.div>
              <h3 className="text-lg font-semibold text-muted-foreground mb-2">
                Awaiting Login Attempt
              </h3>
              <p className="text-sm text-muted-foreground/70 max-w-md">
                Dashboard will update in real-time when an employee attempts to log in.
                All security pillars will be analyzed instantly.
              </p>
            </div>
          )}

          {/* Active Analysis */}
          {decision && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-4"
            >
              {/* Risk Score Display */}
              <div className="bg-card/40 backdrop-blur-sm rounded-lg p-4 border border-border">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-muted-foreground">Calculated Risk Score</span>
                  <Badge variant={riskScore > 60 ? 'destructive' : riskScore > 30 ? 'default' : 'outline'}>
                    {riskScore}/100
                  </Badge>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${riskScore}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className={`h-2 rounded-full ${
                      riskScore > 60 ? 'bg-destructive' : riskScore > 30 ? 'bg-yellow-500' : 'bg-green-500'
                    }`}
                  />
                </div>
              </div>

              {/* AI Analysis */}
              {reason && (
                <div className="bg-card/40 backdrop-blur-sm rounded-lg p-4 border border-border">
                  <h4 className="text-sm font-semibold text-muted-foreground mb-2">AI Analysis</h4>
                  <p className="text-sm text-foreground leading-relaxed">{reason}</p>
                </div>
              )}

              {/* Security Pillars Status */}
              <div className="grid grid-cols-2 gap-3">
                {riskFactors.slice(0, 4).map((factor, index) => (
                  <motion.div
                    key={`pillar-${index}`}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 * index }}
                    className={`p-3 rounded-lg border ${
                      factor.status === 'success' 
                        ? 'bg-green-500/10 border-green-500/30' 
                        : factor.status === 'warning'
                        ? 'bg-yellow-500/10 border-yellow-500/30'
                        : 'bg-red-500/10 border-red-500/30'
                    }`}
                  >
                    <div className="text-xs font-semibold text-muted-foreground mb-1">
                      {factor.name}
                    </div>
                    <div className="text-sm font-medium text-foreground">
                      {factor.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </Card>
      </div>
      
      {/* Risk Details */}
      <RiskDetailsPanel />
    </div>
  );
};

const Index = () => {
  const [activeTab, setActiveTab] = useState('demo');

  return (
    <PresentationProvider>
      <DashboardProvider>
        <PresentationWrapper>
          <div className="min-h-screen bg-background">
            <NavigationBar activeTab={activeTab} onTabChange={setActiveTab} />
            
            {activeTab === 'demo' && <DemoView />}
            {activeTab === 'audit' && <AuditLogView />}
            {activeTab === 'info' && <SystemInfoView />}
          </div>
        </PresentationWrapper>
      </DashboardProvider>
    </PresentationProvider>
  );
};

export default Index;
