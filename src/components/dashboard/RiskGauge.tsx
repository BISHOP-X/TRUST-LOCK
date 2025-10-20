import { motion } from 'framer-motion';
import { useDashboard } from '@/contexts/DashboardContext';

export const RiskGauge = () => {
  const { riskScore } = useDashboard();

  const getColor = () => {
    if (riskScore <= 20) return 'hsl(var(--success))';
    if (riskScore <= 49) return 'hsl(var(--warning))';
    return 'hsl(var(--destructive))';
  };

  const getGradient = () => {
    if (riskScore <= 20) return 'var(--gradient-success)';
    if (riskScore <= 49) return 'var(--gradient-warning)';
    return 'var(--gradient-danger)';
  };

  const circumference = 2 * Math.PI * 70;
  const offset = circumference - (riskScore / 100) * circumference;

  return (
    <div className="relative w-48 h-48 mx-auto">
      {/* TODO: Replace with Three.js risk reactor visualization */}
      <svg className="transform -rotate-90 w-full h-full">
        <defs>
          <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: getColor(), stopOpacity: 0.3 }} />
            <stop offset="100%" style={{ stopColor: getColor(), stopOpacity: 1 }} />
          </linearGradient>
        </defs>
        
        {/* Background circle */}
        <circle
          cx="96"
          cy="96"
          r="70"
          stroke="hsl(var(--muted))"
          strokeWidth="12"
          fill="none"
          opacity="0.2"
        />
        
        {/* Animated progress circle */}
        <motion.circle
          cx="96"
          cy="96"
          r="70"
          stroke="url(#gaugeGradient)"
          strokeWidth="12"
          fill="none"
          strokeLinecap="round"
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1, ease: 'easeInOut' }}
          style={{
            strokeDasharray: circumference,
            filter: `drop-shadow(0 0 8px ${getColor()})`,
          }}
        />
      </svg>

      {/* Center text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.span
          key={riskScore}
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="text-5xl font-bold"
          style={{ color: getColor() }}
        >
          {riskScore}
        </motion.span>
        <span className="text-xs text-muted-foreground mt-1">RISK SCORE</span>
      </div>
    </div>
  );
};
