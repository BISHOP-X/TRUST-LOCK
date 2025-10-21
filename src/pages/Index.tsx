import { useState } from 'react';
import { DashboardProvider } from '@/contexts/DashboardContext';
import { PresentationProvider } from '@/contexts/PresentationContext';
import { PresentationWrapper } from '@/components/presentation/PresentationWrapper';
import { NavigationBar } from '@/components/dashboard/NavigationBar';
import { ScenarioController } from '@/components/dashboard/ScenarioController';
import { RiskDetailsPanel } from '@/components/dashboard/RiskDetailsPanel';
import { AuditLogView } from '@/components/dashboard/AuditLogView';
import { SystemInfoView } from '@/components/dashboard/SystemInfoView';
import { RiskGauge } from '@/components/dashboard/RiskGauge';
import { useDashboard } from '@/contexts/DashboardContext';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { CheckCircle, AlertCircle, XCircle, Shield } from 'lucide-react';

const DemoView = () => {
  const { decision, riskFactors } = useDashboard();

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
            
            <motion.div
              key={decision}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="mt-6"
            >
              <Badge className={`text-lg px-6 py-2 ${getDecisionStyle()}`}>
                <span className="mr-2">{getDecisionIcon()}</span>
                ACCESS {decision}
              </Badge>
            </motion.div>
          </div>

          {riskFactors.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-xs font-semibold text-muted-foreground mb-2">Detected Risks</h3>
              {riskFactors.map((factor, index) => (
                <motion.div
                  key={factor.name}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-card/40 backdrop-blur-sm rounded-lg p-2 border border-border"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-foreground">{factor.name}</span>
                    <span className="text-xs text-muted-foreground">+{factor.points}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </Card>

        {/* Scenario Controller - Main Focus */}
        <div className="lg:col-span-2">
          <ScenarioController />
        </div>
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
