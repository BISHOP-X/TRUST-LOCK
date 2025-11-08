import { motion } from 'framer-motion';
import { Activity, AlertTriangle, CheckCircle, TrendingUp, Shield, Brain, XCircle } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export const ThreatOverview = () => {
  // Floating particles for background
  const particles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    top: Math.random() * 100,
    delay: Math.random() * 5,
    duration: 3 + Math.random() * 2,
  }));

  // Sample data for visualizations
  const loginStats = {
    total: 1247,
    successful: 1089,
    challenged: 112,
    blocked: 46,
  };

  const riskDistribution = [
    { label: 'Low Risk', count: 892, color: '#10B981', percentage: 71 },
    { label: 'Medium Risk', count: 268, color: '#F59E0B', percentage: 22 },
    { label: 'High Risk', count: 87, color: '#EF4444', percentage: 7 },
  ];

  const timelineData = [
    { hour: '00:00', attempts: 12, blocked: 1 },
    { hour: '04:00', attempts: 8, blocked: 0 },
    { hour: '08:00', attempts: 145, blocked: 4 },
    { hour: '12:00', attempts: 198, blocked: 8 },
    { hour: '16:00', attempts: 176, blocked: 6 },
    { hour: '20:00', attempts: 89, blocked: 2 },
  ];

  const aiSuggestions = [
    {
      priority: 'high',
      title: 'Unusual Login Pattern Detected',
      description: 'Multiple failed attempts from Lagos, Nigeria detected for user Carol. Recommend enabling 2FA.',
      icon: AlertTriangle,
      color: '#EF4444',
    },
    {
      priority: 'medium',
      title: 'New Device Onboarding Spike',
      description: '15% increase in new device registrations. Review device trust policies.',
      icon: Shield,
      color: '#F59E0B',
    },
    {
      priority: 'low',
      title: 'Geolocation Verification Success',
      description: '99.2% of logins verified successfully with context analysis.',
      icon: CheckCircle,
      color: '#10B981',
    },
  ];

  const topThreats = [
    { type: 'Impossible Travel', count: 23, trend: '+12%', severity: 'critical' },
    { type: 'Compromised Device', count: 18, trend: '+5%', severity: 'high' },
    { type: 'Suspicious Location', count: 31, trend: '-8%', severity: 'medium' },
    { type: 'New Device', count: 94, trend: '+22%', severity: 'low' },
  ];

  const maxAttempts = Math.max(...timelineData.map(d => d.attempts));

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#0B0F1C] via-[#050810] to-[#000000] overflow-hidden">
      {/* Animated Grid Background */}
      <div className="absolute inset-0 opacity-10">
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(248, 197, 55, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(248, 197, 55, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
          animate={{
            backgroundPosition: ['0px 0px', '60px 60px'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      </div>

      {/* Data Packet Particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute w-1 h-1 rounded-full bg-[#F8C537]"
          style={{
            left: `${particle.left}%`,
            top: `${particle.top}%`,
            boxShadow: '0 0 8px rgba(248, 197, 55, 0.6)',
          }}
          animate={{
            y: [0, -100, 0],
            x: [0, 30, 0],
            opacity: [0, 0.6, 0],
            scale: [0.5, 1, 0.5],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Network Connection Lines */}
      <svg className="absolute inset-0 w-full h-full opacity-20" style={{ zIndex: 1 }}>
        {[0, 1, 2, 3].map((i) => (
          <motion.line
            key={i}
            x1={`${20 + i * 20}%`}
            y1="0%"
            x2={`${30 + i * 20}%`}
            y2="100%"
            stroke="url(#lineGradientThreat)"
            strokeWidth="1"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{
              pathLength: [0, 1, 0],
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.5,
              ease: 'easeInOut',
            }}
          />
        ))}
        <defs>
          <linearGradient id="lineGradientThreat" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#F8C537" stopOpacity="0" />
            <stop offset="50%" stopColor="#F8C537" stopOpacity="1" />
            <stop offset="100%" stopColor="#F8C537" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>

      <div className="relative z-10 container mx-auto px-6 py-8">
        {/* Top Stats Cards */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          {[
            { label: 'Total Logins', value: loginStats.total, icon: Activity, color: '#3B82F6' },
            { label: 'Successful', value: loginStats.successful, icon: CheckCircle, color: '#10B981' },
            { label: 'Challenged', value: loginStats.challenged, icon: Shield, color: '#F59E0B' },
            { label: 'Blocked', value: loginStats.blocked, icon: XCircle, color: '#EF4444' },
          ].map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="bg-black/40 backdrop-blur-md border-[#3B82F6]/30 p-5 relative overflow-hidden">
                  <div className="relative flex items-center justify-between">
                    <div>
                      <p className="text-xs text-gray-400 mb-1">{stat.label}</p>
                      <p className="text-2xl font-bold text-white">{stat.value.toLocaleString()}</p>
                    </div>
                    <div 
                      className="w-12 h-12 rounded-lg flex items-center justify-center border"
                      style={{ borderColor: `${stat.color}40` }}
                    >
                      <Icon className="w-6 h-6" style={{ color: stat.color }} />
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-6">
          {/* Login Timeline Chart */}
          <Card className="lg:col-span-2 bg-black/40 backdrop-blur-md border-[#3B82F6]/30 p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 rounded-lg border border-[#3B82F6]/30">
                <TrendingUp className="h-5 w-5 text-[#3B82F6]" strokeWidth={2} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Login Activity Timeline</h2>
                <p className="text-xs text-gray-400">Last 24 hours</p>
              </div>
            </div>

            {/* Bar Chart */}
            <div className="space-y-4">
              {timelineData.map((data, index) => (
                <motion.div
                  key={data.hour}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="space-y-1"
                >
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400 w-16">{data.hour}</span>
                    <div className="flex items-center gap-3 flex-1 mx-4">
                      <div className="flex-1 bg-gray-800 rounded-full h-8 overflow-hidden relative">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${(data.attempts / maxAttempts) * 100}%` }}
                          transition={{ duration: 1, delay: index * 0.1, ease: "easeOut" }}
                          className="h-full bg-[#3B82F6] rounded-full flex items-center justify-end pr-2"
                        >
                          <span className="text-xs font-semibold text-white">{data.attempts}</span>
                        </motion.div>
                      </div>
                      {data.blocked > 0 && (
                        <Badge variant="destructive" className="text-xs">
                          {data.blocked} blocked
                        </Badge>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>

          {/* Risk Distribution */}
          <Card className="bg-black/40 backdrop-blur-md border-[#3B82F6]/30 p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 rounded-lg border border-[#F8C537]/30">
                <Activity className="h-5 w-5 text-[#F8C537]" strokeWidth={2} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Risk Distribution</h2>
                <p className="text-xs text-gray-400">Current period</p>
              </div>
            </div>

            {/* Donut Chart Simulation */}
            <div className="flex items-center justify-center mb-6">
              <div className="relative w-40 h-40">
                <svg className="w-full h-full transform -rotate-90">
                  {riskDistribution.map((item, index) => {
                    const prevPercentage = riskDistribution.slice(0, index).reduce((sum, d) => sum + d.percentage, 0);
                    const circumference = 2 * Math.PI * 60;
                    const offset = (prevPercentage / 100) * circumference;
                    const dashArray = `${(item.percentage / 100) * circumference} ${circumference}`;

                    return (
                      <motion.circle
                        key={item.label}
                        cx="80"
                        cy="80"
                        r="60"
                        fill="none"
                        stroke={item.color}
                        strokeWidth="20"
                        strokeDasharray={dashArray}
                        strokeDashoffset={-offset}
                        initial={{ strokeDashoffset: -circumference }}
                        animate={{ strokeDashoffset: -offset }}
                        transition={{ duration: 1, delay: index * 0.2, ease: "easeOut" }}
                      />
                    );
                  })}
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-white">{loginStats.total}</p>
                    <p className="text-xs text-gray-400">Total</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Legend */}
            <div className="space-y-3">
              {riskDistribution.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-sm text-gray-300">{item.label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-white">{item.count}</span>
                    <span className="text-xs text-gray-500">({item.percentage}%)</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>
        </div>

        {/* Bottom Section */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Top Threats */}
          <Card className="bg-black/40 backdrop-blur-md border-[#3B82F6]/30 p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 rounded-lg border border-red-500/30">
                <AlertTriangle className="h-5 w-5 text-red-500" strokeWidth={2} />
              </div>
              <h2 className="text-xl font-bold text-white">Top Threat Vectors</h2>
            </div>

            <div className="space-y-3">
              {topThreats.map((threat, index) => (
                <motion.div
                  key={threat.type}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-black/60 backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:border-white/20 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Badge 
                        variant="outline"
                        className={`text-xs ${
                          threat.severity === 'critical' ? 'border-red-500 text-red-500' :
                          threat.severity === 'high' ? 'border-orange-500 text-orange-500' :
                          threat.severity === 'medium' ? 'border-yellow-500 text-yellow-500' :
                          'border-green-500 text-green-500'
                        }`}
                      >
                        {threat.severity}
                      </Badge>
                      <span className="text-sm font-medium text-white">{threat.type}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-lg font-bold text-white">{threat.count}</span>
                      <span className={`text-xs font-semibold ${
                        threat.trend.startsWith('+') ? 'text-red-400' : 'text-green-400'
                      }`}>
                        {threat.trend}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>

          {/* AI Suggestions */}
          <Card className="bg-black/40 backdrop-blur-md border-[#3B82F6]/30 p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 rounded-lg border border-purple-500/30">
                <Brain className="h-5 w-5 text-purple-500" strokeWidth={2} />
              </div>
              <h2 className="text-xl font-bold text-white">AI Security Recommendations</h2>
            </div>

            <div className="space-y-4">
              {aiSuggestions.map((suggestion, index) => {
                const Icon = suggestion.icon;
                return (
                  <motion.div
                    key={suggestion.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.15 }}
                    className="bg-gradient-to-br from-black/60 to-black/40 backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:border-white/20 transition-colors"
                  >
                    <div className="flex items-start gap-3">
                      <div 
                        className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: `${suggestion.color}20` }}
                      >
                        <Icon className="w-5 h-5" style={{ color: suggestion.color }} />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-sm font-semibold text-white mb-1">{suggestion.title}</h3>
                        <p className="text-xs text-gray-400 leading-relaxed">{suggestion.description}</p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
