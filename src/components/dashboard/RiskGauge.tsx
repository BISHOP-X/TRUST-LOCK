import { motion } from 'framer-motion';
import { useDashboard } from '@/contexts/DashboardContext';

export const RiskGauge = () => {
  const { riskScore } = useDashboard();

  const getColor = () => {
    if (riskScore <= 20) return 'hsl(var(--success))';
    if (riskScore <= 49) return 'hsl(var(--warning))';
    return 'hsl(var(--destructive))';
  };

  const getGradientStops = () => {
    if (riskScore <= 20) {
      return { start: 'hsl(var(--success))', end: 'hsl(142 76% 45%)' };
    }
    if (riskScore <= 49) {
      return { start: 'hsl(var(--warning))', end: 'hsl(38 92% 50%)' };
    }
    return { start: 'hsl(var(--destructive))', end: 'hsl(0 84% 55%)' };
  };

  const circumference = 2 * Math.PI * 70;
  const offset = circumference - (riskScore / 100) * circumference;
  const gradientStops = getGradientStops();

  return (
    <div className="relative w-48 h-48 mx-auto">
      {/* Decorative glow behind gauge */}
      <motion.div
        className="absolute inset-0 rounded-full blur-2xl opacity-20"
        style={{ backgroundColor: getColor() }}
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.15, 0.25, 0.15]
        }}
        transition={{ 
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <svg className="transform -rotate-90 w-full h-full relative z-10">
        <defs>
          <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: gradientStops.start, stopOpacity: 0.6 }} />
            <stop offset="100%" style={{ stopColor: gradientStops.end, stopOpacity: 1 }} />
          </linearGradient>
          <filter id="gaugeShadow">
            <feGaussianBlur in="SourceGraphic" stdDeviation="3" />
            <feOffset dx="0" dy="0" result="offsetblur" />
            <feFlood floodColor={getColor()} floodOpacity="0.5" />
            <feComposite in2="offsetblur" operator="in" />
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        
        {/* Background circle */}
        <circle
          cx="96"
          cy="96"
          r="70"
          stroke="hsl(var(--muted))"
          strokeWidth="12"
          fill="none"
          opacity="0.15"
        />
        
        {/* Animated progress circle with gradient */}
        <motion.circle
          cx="96"
          cy="96"
          r="70"
          stroke="url(#gaugeGradient)"
          strokeWidth="12"
          fill="none"
          strokeLinecap="round"
          filter="url(#gaugeShadow)"
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          style={{
            strokeDasharray: circumference,
          }}
        />
      </svg>

      {/* Center text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
        <motion.span
          key={riskScore}
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4, type: "spring", stiffness: 200 }}
          className="text-5xl font-bold"
          style={{ 
            color: getColor(),
            textShadow: `0 0 20px ${getColor()}40`
          }}
        >
          {riskScore}
        </motion.span>
        <span className="text-xs font-semibold text-muted-foreground mt-1 tracking-wider">RISK SCORE</span>
      </div>
    </div>
  );
};
