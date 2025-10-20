import { Shield, CheckCircle, AlertCircle, XCircle } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { useDashboard } from '@/contexts/DashboardContext';
import { RiskGauge } from './RiskGauge';

export const NewSecurityPanel = () => {
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
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="h-full flex flex-col"
    >
      <Card className="flex-1 bg-card/60 backdrop-blur-glass border-primary/50 shadow-glow">
        <div className="p-6 h-full flex flex-col">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-gradient-primary p-2 rounded-lg shadow-glow">
              <Shield className="h-6 w-6 text-primary-foreground" />
            </div>
            <h2 className="text-2xl font-bold text-foreground">Smart Access Gateway</h2>
          </div>

          <div className="flex-1 flex flex-col items-center justify-center mb-6">
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

          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-muted-foreground mb-3">Risk Factors</h3>
            {riskFactors.map((factor, index) => (
              <motion.div
                key={factor.name}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-card/40 backdrop-blur-sm rounded-lg p-3 border border-border"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-foreground">{factor.name}</span>
                  <span className="text-sm text-muted-foreground">+{factor.points} pts</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">{factor.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </Card>
    </motion.div>
  );
};
