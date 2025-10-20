import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertCircle } from 'lucide-react';
import { useDashboard } from '@/contexts/DashboardContext';

export const RiskDetailsPanel = () => {
  const { riskScore, decision, reason } = useDashboard();

  const getDecisionColor = () => {
    switch (decision) {
      case 'GRANTED':
        return 'bg-success/20 text-success border-success/50';
      case 'CHALLENGE':
        return 'bg-warning/20 text-warning border-warning/50';
      case 'BLOCKED':
        return 'bg-destructive/20 text-destructive border-destructive/50';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <Card className="bg-card/60 backdrop-blur-glass border-border shadow-card p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-foreground">Access Decision Analysis</h3>
          <Badge variant="outline" className={`text-lg px-4 py-2 ${getDecisionColor()}`}>
            {decision}
          </Badge>
        </div>

        <div className="grid grid-cols-2 gap-6 mb-6">
          <div className="bg-muted/30 rounded-lg p-4 border border-border">
            <p className="text-sm text-muted-foreground mb-2">Total Risk Score</p>
            <p className="text-4xl font-bold text-foreground">{riskScore}<span className="text-xl text-muted-foreground">/100</span></p>
          </div>
          
          <div className="bg-muted/30 rounded-lg p-4 border border-border">
            <p className="text-sm text-muted-foreground mb-2">Decision Threshold</p>
            <div className="space-y-1">
              <p className="text-xs text-success">0-20: Grant Access</p>
              <p className="text-xs text-warning">21-49: Challenge Required</p>
              <p className="text-xs text-destructive">50+: Block Access</p>
            </div>
          </div>
        </div>

        {decision === 'BLOCKED' && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="bg-destructive/10 border-2 border-destructive/50 rounded-lg p-4 backdrop-blur-sm"
          >
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-destructive mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-destructive mb-2">Access Denied - Reason:</h4>
                <p className="text-sm text-foreground/90">{reason}</p>
              </div>
            </div>
          </motion.div>
        )}

        {decision === 'CHALLENGE' && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="bg-warning/10 border-2 border-warning/50 rounded-lg p-4 backdrop-blur-sm"
          >
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-warning mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-warning mb-2">Additional Verification Required:</h4>
                <p className="text-sm text-foreground/90">{reason}</p>
              </div>
            </div>
          </motion.div>
        )}

        {decision === 'GRANTED' && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="bg-success/10 border-2 border-success/50 rounded-lg p-4 backdrop-blur-sm"
          >
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-success mb-2">Access Granted:</h4>
                <p className="text-sm text-foreground/90">{reason}</p>
              </div>
            </div>
          </motion.div>
        )}
      </Card>
    </motion.div>
  );
};
