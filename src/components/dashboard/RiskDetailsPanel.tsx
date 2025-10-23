import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, AlertTriangle, XCircle } from 'lucide-react';
import { useDashboard } from '@/contexts/DashboardContext';

export const RiskDetailsPanel = () => {
  const { riskScore, decision, reason } = useDashboard();

  const getDecisionColor = () => {
    switch (decision) {
      case 'GRANTED':
        return 'bg-success/10 text-success border-success/30';
      case 'CHALLENGE':
        return 'bg-warning/10 text-warning border-warning/30';
      case 'BLOCKED':
        return 'bg-destructive/10 text-destructive border-destructive/30';
    }
  };

  const getDecisionIcon = () => {
    switch (decision) {
      case 'GRANTED':
        return <CheckCircle className="h-5 w-5" strokeWidth={2.5} />;
      case 'CHALLENGE':
        return <AlertTriangle className="h-5 w-5" strokeWidth={2.5} />;
      case 'BLOCKED':
        return <XCircle className="h-5 w-5" strokeWidth={2.5} />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <Card className="bg-card/50 backdrop-blur-md border-border/50 shadow-xl p-6 relative overflow-hidden">
        {/* Decorative gradient orb */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full blur-3xl" />
        
        <div className="relative">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-foreground">Access Decision Analysis</h3>
            <Badge variant="outline" className={`text-base px-5 py-2.5 font-semibold ${getDecisionColor()} flex items-center gap-2`}>
              {getDecisionIcon()}
              {decision}
            </Badge>
          </div>

          <div className="grid grid-cols-2 gap-6 mb-6">
            <div className="bg-card/60 backdrop-blur-sm rounded-xl p-5 border border-border/50">
              <p className="text-sm font-semibold text-muted-foreground mb-2">Total Risk Score</p>
              <p className="text-4xl font-bold text-foreground">
                {riskScore}
                <span className="text-xl text-muted-foreground ml-1">/100</span>
              </p>
            </div>
            
            <div className="bg-card/60 backdrop-blur-sm rounded-xl p-5 border border-border/50">
              <p className="text-sm font-semibold text-muted-foreground mb-3">Decision Thresholds</p>
              <div className="space-y-1.5">
                <p className="text-xs text-success font-medium">0-30: Grant Access</p>
                <p className="text-xs text-warning font-medium">31-60: Challenge Required</p>
                <p className="text-xs text-destructive font-medium">61+: Block Access</p>
              </div>
            </div>
          </div>

          {decision === 'BLOCKED' && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="bg-destructive/5 border-2 border-destructive/30 rounded-xl p-5 backdrop-blur-sm"
            >
              <div className="flex items-start gap-3">
                <div className="relative mt-0.5 flex-shrink-0">
                  <div className="absolute inset-0 bg-destructive/20 rounded-full blur-md" />
                  <XCircle className="relative h-5 w-5 text-destructive" strokeWidth={2.5} />
                </div>
                <div>
                  <h4 className="font-semibold text-destructive mb-2">Access Denied - Reason:</h4>
                  <p className="text-sm text-foreground/90 leading-relaxed">{reason}</p>
                </div>
              </div>
            </motion.div>
          )}

          {decision === 'CHALLENGE' && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="bg-warning/5 border-2 border-warning/30 rounded-xl p-5 backdrop-blur-sm"
            >
              <div className="flex items-start gap-3">
                <div className="relative mt-0.5 flex-shrink-0">
                  <div className="absolute inset-0 bg-warning/20 rounded-full blur-md" />
                  <AlertTriangle className="relative h-5 w-5 text-warning" strokeWidth={2.5} />
                </div>
                <div>
                  <h4 className="font-semibold text-warning mb-2">Additional Verification Required:</h4>
                  <p className="text-sm text-foreground/90 leading-relaxed">{reason}</p>
                </div>
              </div>
            </motion.div>
          )}

          {decision === 'GRANTED' && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="bg-success/5 border-2 border-success/30 rounded-xl p-5 backdrop-blur-sm"
            >
              <div className="flex items-start gap-3">
                <div className="relative mt-0.5 flex-shrink-0">
                  <div className="absolute inset-0 bg-success/20 rounded-full blur-md" />
                  <CheckCircle className="relative h-5 w-5 text-success" strokeWidth={2.5} />
                </div>
                <div>
                  <h4 className="font-semibold text-success mb-2">Access Granted:</h4>
                  <p className="text-sm text-foreground/90 leading-relaxed">{reason}</p>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </Card>
    </motion.div>
  );
};
