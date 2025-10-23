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
import { CheckCircle, AlertCircle, XCircle, Shield, Activity, TrendingUp, Lock } from 'lucide-react';

const DemoView = () => {
  const { decision, riskFactors, reason, riskScore } = useDashboard();

  const getDecisionStyle = () => {
    switch (decision) {
      case 'GRANTED':
        return 'bg-gradient-to-r from-success to-success/80 text-success-foreground shadow-lg';
      case 'CHALLENGE':
        return 'bg-gradient-to-r from-warning to-warning/80 text-warning-foreground shadow-lg';
      case 'BLOCKED':
        return 'bg-gradient-to-r from-destructive to-destructive/80 text-destructive-foreground shadow-lg';
    }
  };

  const getDecisionIcon = () => {
    switch (decision) {
      case 'GRANTED':
        return <CheckCircle className="h-5 w-5" strokeWidth={2.5} />;
      case 'CHALLENGE':
        return <AlertCircle className="h-5 w-5" strokeWidth={2.5} />;
      case 'BLOCKED':
        return <XCircle className="h-5 w-5" strokeWidth={2.5} />;
    }
  };

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="grid lg:grid-cols-3 gap-6 mb-8">
        {/* Live Security Status */}
        <Card className="lg:col-span-1 bg-card/50 backdrop-blur-md border-border/50 shadow-xl p-6 relative overflow-hidden">
          {/* Decorative gradient */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full blur-3xl" />
          
          <div className="relative">
            <div className="flex items-center gap-3 mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-primary/20 rounded-lg blur-md" />
                <div className="relative bg-gradient-to-br from-primary to-accent p-2.5 rounded-lg">
                  <Shield className="h-5 w-5 text-primary-foreground" strokeWidth={2} />
                </div>
              </div>
              <h2 className="text-xl font-bold text-foreground">Live Security Status</h2>
            </div>

            <div className="flex flex-col items-center justify-center mb-6">
              <RiskGauge />
              
              <AnimatePresence mode="wait">
                {decision && (
                  <motion.div
                    key={decision}
                    initial={{ scale: 0.8, opacity: 0, y: 10 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.8, opacity: 0, y: -10 }}
                    transition={{ duration: 0.4, type: "spring", stiffness: 200 }}
                    className="mt-6"
                  >
                    <Badge className={`text-base px-6 py-3 ${getDecisionStyle()} font-semibold`}>
                      <span className="mr-2">{getDecisionIcon()}</span>
                      ACCESS {decision}
                    </Badge>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {riskFactors.length > 0 && (
              <div className="space-y-2">
                <div className="flex items-center gap-2 mb-3">
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                  <h3 className="text-sm font-semibold text-muted-foreground">Risk Factors</h3>
                </div>
                {riskFactors.map((factor, index) => (
                  <motion.div
                    key={`${factor.name}-${index}`}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-card/60 backdrop-blur-sm rounded-lg p-3 border border-border/50 hover:border-primary/30 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-foreground">{factor.label}</span>
                      <Badge variant="outline" className="text-xs font-semibold">
                        +{factor.points}
                      </Badge>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </Card>

        {/* Real-Time Analysis Panel */}
        <Card className="lg:col-span-2 bg-card/50 backdrop-blur-md border-border/50 shadow-xl p-6 relative overflow-hidden">
          {/* Decorative gradient */}
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-tr from-accent/10 to-primary/10 rounded-full blur-3xl" />
          
          <div className="relative">
            <div className="flex items-center gap-3 mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-accent/20 rounded-lg blur-md" />
                <div className="relative bg-gradient-to-br from-accent to-accent/80 p-2.5 rounded-lg">
                  <Activity className="h-5 w-5 text-primary-foreground" strokeWidth={2} />
                </div>
              </div>
              <h2 className="text-xl font-bold text-foreground">Real-Time Analysis</h2>
            </div>

            {/* Waiting State */}
            {!decision && (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <motion.div
                  className="relative mb-6"
                  animate={{ 
                    scale: [1, 1.1, 1],
                    opacity: [0.3, 0.6, 0.3]
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <div className="absolute inset-0 bg-primary/20 rounded-full blur-2xl" />
                  <Shield className="relative h-20 w-20 text-primary/60" strokeWidth={1.5} />
                </motion.div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Awaiting Login Attempt
                </h3>
                <p className="text-sm text-muted-foreground max-w-md leading-relaxed">
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
                <div className="bg-card/60 backdrop-blur-sm rounded-xl p-5 border border-border/50">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Lock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-semibold text-muted-foreground">Calculated Risk Score</span>
                    </div>
                    <Badge 
                      variant={riskScore > 60 ? 'destructive' : riskScore > 30 ? 'default' : 'outline'}
                      className="text-sm font-bold px-3 py-1"
                    >
                      {riskScore}/100
                    </Badge>
                  </div>
                  <div className="w-full bg-muted/50 rounded-full h-3 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${riskScore}%` }}
                      transition={{ duration: 1.2, ease: "easeOut" }}
                      className={`h-3 rounded-full ${
                        riskScore > 60 ? 'bg-gradient-to-r from-destructive to-destructive/80' : 
                        riskScore > 30 ? 'bg-gradient-to-r from-warning to-warning/80' : 
                        'bg-gradient-to-r from-success to-success/80'
                      }`}
                    />
                  </div>
                </div>

                {/* AI Analysis */}
                {reason && (
                  <div className="bg-card/60 backdrop-blur-sm rounded-xl p-5 border border-border/50">
                    <h4 className="text-sm font-semibold text-muted-foreground mb-3 flex items-center gap-2">
                      <Activity className="h-4 w-4" />
                      AI Analysis
                    </h4>
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
                      transition={{ delay: 0.1 * index, type: "spring" }}
                      className={`p-4 rounded-xl border backdrop-blur-sm ${
                        factor.status === 'success' 
                          ? 'bg-success/5 border-success/30' 
                          : factor.status === 'warning'
                          ? 'bg-warning/5 border-warning/30'
                          : 'bg-destructive/5 border-destructive/30'
                      }`}
                    >
                      <div className="text-xs font-semibold text-muted-foreground mb-1.5">
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
          </div>
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
          <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
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
