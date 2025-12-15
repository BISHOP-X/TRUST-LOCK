import { motion, AnimatePresence } from 'framer-motion';
import { 
  Activity, AlertTriangle, CheckCircle, TrendingUp, Shield, Brain, XCircle,
  Globe, Target, Zap, Eye, Lock, Unlock, Users, Network, Database,
  TrendingDown, BarChart3, PieChart, LineChart, Clock, MapPin, Wifi, Radio
} from 'lucide-react';
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

  // Threat Intelligence Feed
  const threatIntelligence = [
    { 
      id: 1, 
      type: 'Credential Stuffing', 
      severity: 'critical', 
      source: 'Lagos, Nigeria', 
      targets: 12, 
      status: 'active',
      confidence: 94,
      firstSeen: '2m ago',
      icon: Target
    },
    { 
      id: 2, 
      type: 'Brute Force Attack', 
      severity: 'high', 
      source: 'Moscow, Russia', 
      targets: 8, 
      status: 'mitigated',
      confidence: 87,
      firstSeen: '15m ago',
      icon: Lock
    },
    { 
      id: 3, 
      type: 'Session Hijacking', 
      severity: 'high', 
      source: 'Unknown', 
      targets: 3, 
      status: 'investigating',
      confidence: 72,
      firstSeen: '1h ago',
      icon: Wifi
    },
    { 
      id: 4, 
      type: 'Anomalous Behavior', 
      severity: 'medium', 
      source: 'London, UK', 
      targets: 5, 
      status: 'monitoring',
      confidence: 68,
      firstSeen: '3h ago',
      icon: Eye
    },
  ];

  // Attack Vector Correlations
  const attackVectors = [
    { vector: 'Location Anomaly', frequency: 45, impact: 85, trend: 'up' },
    { vector: 'Device Compromise', frequency: 32, impact: 92, trend: 'stable' },
    { vector: 'Time-based Pattern', frequency: 28, impact: 65, trend: 'down' },
    { vector: 'Network Fingerprint', frequency: 19, impact: 78, trend: 'up' },
  ];

  // Predictive Analytics
  const predictions = [
    { 
      metric: 'Attack Likelihood',
      current: 67,
      predicted: 82,
      change: '+15%',
      timeframe: 'Next 24h',
      confidence: 89,
      color: '#EF4444'
    },
    { 
      metric: 'User Risk Score',
      current: 42,
      predicted: 38,
      change: '-4%',
      timeframe: 'Next 24h',
      confidence: 76,
      color: '#10B981'
    },
    { 
      metric: 'System Load',
      current: 54,
      predicted: 71,
      change: '+17%',
      timeframe: 'Next 24h',
      confidence: 92,
      color: '#F59E0B'
    },
  ];

  // Geographical threat origins
  const geoThreats = [
    { country: 'Nigeria', threats: 45, risk: 'high', lat: 9.0820, lng: 8.6753 },
    { country: 'Russia', threats: 32, risk: 'high', lat: 55.7558, lng: 37.6173 },
    { country: 'China', threats: 28, risk: 'medium', lat: 39.9042, lng: 116.4074 },
    { country: 'Brazil', threats: 19, risk: 'medium', lat: -15.7975, lng: -47.8919 },
    { country: 'Unknown', threats: 12, risk: 'low', lat: 0, lng: 0 },
  ];

  // Security posture metrics
  const securityPosture = {
    overall: 78,
    identity: 85,
    device: 72,
    network: 81,
    data: 74,
  };

  // Industry benchmarks
  const industryBenchmark = [
    { category: 'Authentication', score: 85, industry: 72, status: 'above' },
    { category: 'Access Control', score: 78, industry: 81, status: 'below' },
    { category: 'Threat Detection', score: 92, industry: 76, status: 'above' },
    { category: 'Incident Response', score: 68, industry: 74, status: 'below' },
  ];

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
        {/* Security Posture Header */}
        <div className="mb-6">
          <Card className="bg-black/40 backdrop-blur-md border-[#3B82F6]/30 p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-[#3B82F6]/10 via-[#F8C537]/5 to-transparent rounded-full blur-3xl" />
            <div className="relative flex items-center justify-between">
              <div className="flex items-center gap-6">
                <div className="relative">
                  <svg className="w-24 h-24 transform -rotate-90">
                    <circle cx="48" cy="48" r="40" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="8" />
                    <motion.circle
                      cx="48"
                      cy="48"
                      r="40"
                      fill="none"
                      stroke="url(#postureGradient)"
                      strokeWidth="8"
                      strokeDasharray={`${2 * Math.PI * 40}`}
                      initial={{ strokeDashoffset: 2 * Math.PI * 40 }}
                      animate={{ strokeDashoffset: 2 * Math.PI * 40 * (1 - securityPosture.overall / 100) }}
                      transition={{ duration: 2, ease: "easeOut" }}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-white">{securityPosture.overall}</div>
                      <div className="text-[10px] text-gray-400">SCORE</div>
                    </div>
                  </div>
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-white mb-2">Threat Intelligence Center</h1>
                  <p className="text-gray-400">Real-time security posture & predictive analytics</p>
                </div>
              </div>
              <div className="flex gap-4">
                {[
                  { label: 'Identity', value: securityPosture.identity, icon: Users, color: '#3B82F6' },
                  { label: 'Device', value: securityPosture.device, icon: Shield, color: '#F8C537' },
                  { label: 'Network', value: securityPosture.network, icon: Network, color: '#10B981' },
                  { label: 'Data', value: securityPosture.data, icon: Database, color: '#A855F7' },
                ].map((metric, index) => {
                  const Icon = metric.icon;
                  return (
                    <motion.div
                      key={metric.label}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className="text-center"
                    >
                      <div className="w-14 h-14 rounded-xl flex items-center justify-center border mx-auto mb-2" style={{ borderColor: `${metric.color}40`, backgroundColor: `${metric.color}10` }}>
                        <Icon className="w-6 h-6" style={{ color: metric.color }} />
                      </div>
                      <div className="text-lg font-bold text-white">{metric.value}</div>
                      <div className="text-[10px] text-gray-400">{metric.label}</div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
            <defs>
              <linearGradient id="postureGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3B82F6" />
                <stop offset="100%" stopColor="#F8C537" />
              </linearGradient>
            </defs>
          </Card>
        </div>

        {/* Threat Intelligence Feed & Predictive Analytics */}
        <div className="grid lg:grid-cols-3 gap-6 mb-6">
          {/* Live Threat Intelligence Feed */}
          <Card className="lg:col-span-2 bg-black/40 backdrop-blur-md border-[#3B82F6]/30 p-6 relative overflow-hidden">
            <div className="absolute bottom-0 right-0 w-40 h-40 bg-gradient-to-tl from-red-500/10 to-transparent rounded-full blur-3xl" />
            <div className="relative">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-lg border border-red-500/30 relative">
                    <Radio className="h-5 w-5 text-red-500" strokeWidth={2} />
                    <motion.div 
                      className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"
                      animate={{ scale: [1, 1.3, 1], opacity: [1, 0.5, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">Live Threat Intelligence</h2>
                    <p className="text-xs text-gray-400">Active threat monitoring</p>
                  </div>
                </div>
                <Badge variant="outline" className="border-red-500/50 text-red-400">
                  <Target className="h-3 w-3 mr-1" />
                  {threatIntelligence.filter(t => t.status === 'active').length} ACTIVE
                </Badge>
              </div>

              <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                <AnimatePresence>
                  {threatIntelligence.map((threat, index) => {
                    const ThreatIcon = threat.icon;
                    const getSeverityColor = () => {
                      switch (threat.severity) {
                        case 'critical': return { bg: 'bg-red-500/10', border: 'border-red-500/30', text: 'text-red-400', badge: 'border-red-500' };
                        case 'high': return { bg: 'bg-orange-500/10', border: 'border-orange-500/30', text: 'text-orange-400', badge: 'border-orange-500' };
                        case 'medium': return { bg: 'bg-yellow-500/10', border: 'border-yellow-500/30', text: 'text-yellow-400', badge: 'border-yellow-500' };
                        default: return { bg: 'bg-blue-500/10', border: 'border-blue-500/30', text: 'text-blue-400', badge: 'border-blue-500' };
                      }
                    };
                    const colors = getSeverityColor();

                    return (
                      <motion.div
                        key={threat.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ delay: index * 0.1 }}
                        className={`${colors.bg} backdrop-blur-sm border ${colors.border} rounded-xl p-4 hover:border-opacity-50 transition-all`}
                      >
                        <div className="flex items-start gap-4">
                          <div className={`p-2 rounded-lg ${colors.bg} border ${colors.border}`}>
                            <ThreatIcon className={`h-4 w-4 ${colors.text}`} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-2">
                              <h3 className="font-semibold text-white text-sm">{threat.type}</h3>
                              <Badge variant="outline" className={`text-xs ${colors.text} ${colors.badge}`}>
                                {threat.severity.toUpperCase()}
                              </Badge>
                            </div>
                            <div className="grid grid-cols-2 gap-2 text-xs mb-2">
                              <div className="flex items-center gap-1.5 text-gray-400">
                                <MapPin className="h-3 w-3" />
                                <span className="truncate">{threat.source}</span>
                              </div>
                              <div className="flex items-center gap-1.5 text-gray-400">
                                <Target className="h-3 w-3" />
                                <span>{threat.targets} targets</span>
                              </div>
                            </div>
                            <div className="flex items-center justify-between pt-2 border-t border-white/5">
                              <div className="flex items-center gap-2">
                                <Badge 
                                  variant="outline" 
                                  className={`text-[10px] ${
                                    threat.status === 'active' ? 'border-red-500 text-red-400' :
                                    threat.status === 'mitigated' ? 'border-green-500 text-green-400' :
                                    'border-yellow-500 text-yellow-400'
                                  }`}
                                >
                                  {threat.status.toUpperCase()}
                                </Badge>
                                <span className="text-xs text-gray-500">Confidence: {threat.confidence}%</span>
                              </div>
                              <div className="flex items-center gap-1 text-xs text-gray-500">
                                <Clock className="h-3 w-3" />
                                {threat.firstSeen}
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>
            </div>
          </Card>

          {/* Predictive Analytics */}
          <Card className="bg-black/40 backdrop-blur-md border-[#3B82F6]/30 p-6 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-purple-500/10 to-transparent rounded-full blur-3xl" />
            <div className="relative">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 rounded-lg border border-purple-500/30">
                  <Brain className="h-5 w-5 text-purple-500" strokeWidth={2} />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">AI Predictions</h2>
                  <p className="text-xs text-gray-400">Next 24 hours</p>
                </div>
              </div>

              <div className="space-y-4">
                {predictions.map((pred, index) => (
                  <motion.div
                    key={pred.metric}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.15 }}
                    className="bg-black/40 backdrop-blur-sm rounded-xl p-4 border border-white/10"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <div className="text-sm font-semibold text-white">{pred.metric}</div>
                        <div className="text-xs text-gray-400">{pred.timeframe}</div>
                      </div>
                      <Badge 
                        variant="outline"
                        className={`text-xs font-bold ${
                          pred.change.startsWith('+') ? 'border-red-400 text-red-400' : 'border-green-400 text-green-400'
                        }`}
                      >
                        {pred.change}
                      </Badge>
                    </div>
                    
                    <div className="flex items-end gap-4 mb-2">
                      <div className="text-center">
                        <div className="text-xs text-gray-500 mb-1">Current</div>
                        <div className="text-2xl font-bold text-white">{pred.current}</div>
                      </div>
                      <div className="flex-1 flex items-center">
                        {pred.change.startsWith('+') ? (
                          <TrendingUp className="h-5 w-5 text-red-400" />
                        ) : (
                          <TrendingDown className="h-5 w-5 text-green-400" />
                        )}
                        <div className="flex-1 h-px bg-gray-700 mx-2" />
                      </div>
                      <div className="text-center">
                        <div className="text-xs text-gray-500 mb-1">Predicted</div>
                        <div className="text-2xl font-bold" style={{ color: pred.color }}>
                          {pred.predicted}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-500">Confidence</span>
                      <div className="flex items-center gap-2">
                        <div className="w-20 h-1.5 bg-gray-800 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${pred.confidence}%` }}
                            transition={{ duration: 1, delay: index * 0.15 }}
                            className="h-full bg-purple-500"
                          />
                        </div>
                        <span className="text-purple-400 font-bold">{pred.confidence}%</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </Card>
        </div>

        {/* Attack Vector Correlation & Geographical Threats */}
        <div className="grid lg:grid-cols-2 gap-6 mb-6">
          {/* Attack Vector Correlation Matrix */}
          <Card className="bg-black/40 backdrop-blur-md border-[#3B82F6]/30 p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-[#F8C537]/10 to-transparent rounded-full blur-3xl" />
            <div className="relative">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 rounded-lg border border-[#F8C537]/30">
                  <Network className="h-5 w-5 text-[#F8C537]" strokeWidth={2} />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">Attack Vector Analysis</h2>
                  <p className="text-xs text-gray-400">Correlation & Impact</p>
                </div>
              </div>

              <div className="space-y-4">
                {attackVectors.map((vector, index) => (
                  <motion.div
                    key={vector.vector}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-black/40 backdrop-blur-sm rounded-xl p-4 border border-white/10"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-white">{vector.vector}</span>
                        {vector.trend === 'up' && <TrendingUp className="h-4 w-4 text-red-400" />}
                        {vector.trend === 'down' && <TrendingDown className="h-4 w-4 text-green-400" />}
                        {vector.trend === 'stable' && <Activity className="h-4 w-4 text-gray-400" />}
                      </div>
                      <div className="flex gap-4 text-xs">
                        <div>
                          <span className="text-gray-500">Freq:</span>
                          <span className="text-white font-bold ml-1">{vector.frequency}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Impact:</span>
                          <span className="text-white font-bold ml-1">{vector.impact}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <div className="text-[10px] text-gray-500 mb-1">Frequency</div>
                        <div className="w-full bg-gray-800 rounded-full h-2 overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${vector.frequency}%` }}
                            transition={{ duration: 1, delay: index * 0.1 }}
                            className="h-full bg-[#3B82F6]"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="text-[10px] text-gray-500 mb-1">Impact Score</div>
                        <div className="w-full bg-gray-800 rounded-full h-2 overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${vector.impact}%` }}
                            transition={{ duration: 1, delay: index * 0.1 }}
                            className="h-full bg-[#F8C537]"
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </Card>

          {/* Geographical Threat Map */}
          <Card className="bg-black/40 backdrop-blur-md border-[#3B82F6]/30 p-6 relative overflow-hidden">
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-tr from-[#3B82F6]/10 to-transparent rounded-full blur-3xl" />
            <div className="relative">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 rounded-lg border border-[#3B82F6]/30">
                  <Globe className="h-5 w-5 text-[#3B82F6]" strokeWidth={2} />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">Global Threat Origins</h2>
                  <p className="text-xs text-gray-400">Top attack sources</p>
                </div>
              </div>

              {/* Simplified World Map Representation */}
              <div className="mb-6 relative h-48 bg-gradient-to-br from-[#0B0F1C] to-black rounded-xl border border-white/5 overflow-hidden">
                {/* Animated global grid */}
                <motion.div
                  className="absolute inset-0 opacity-20"
                  style={{
                    backgroundImage: `
                      linear-gradient(rgba(59, 130, 246, 0.3) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(59, 130, 246, 0.3) 1px, transparent 1px)
                    `,
                    backgroundSize: '30px 30px',
                  }}
                  animate={{
                    backgroundPosition: ['0px 0px', '30px 30px'],
                  }}
                  transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                />

                {/* Threat markers */}
                {geoThreats.slice(0, 4).map((threat, index) => {
                  const getRiskColor = () => {
                    switch (threat.risk) {
                      case 'high': return '#EF4444';
                      case 'medium': return '#F59E0B';
                      default: return '#10B981';
                    }
                  };

                  return (
                    <motion.div
                      key={threat.country}
                      className="absolute"
                      style={{
                        left: `${20 + index * 20}%`,
                        top: `${30 + (index % 2) * 30}%`,
                      }}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: index * 0.2 }}
                    >
                      <motion.div
                        className="relative"
                        animate={{
                          scale: [1, 1.2, 1],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: index * 0.3,
                        }}
                      >
                        <div 
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: getRiskColor(), boxShadow: `0 0 20px ${getRiskColor()}` }}
                        />
                        <motion.div
                          className="absolute inset-0 rounded-full"
                          style={{ border: `2px solid ${getRiskColor()}`, opacity: 0.3 }}
                          animate={{
                            scale: [1, 2, 2],
                            opacity: [0.5, 0, 0],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: index * 0.3,
                          }}
                        />
                      </motion.div>
                    </motion.div>
                  );
                })}

                {/* Connection lines */}
                <svg className="absolute inset-0 w-full h-full">
                  {geoThreats.slice(0, 3).map((_, index) => (
                    <motion.line
                      key={index}
                      x1={`${20 + index * 20}%`}
                      y1={`${30 + (index % 2) * 30}%`}
                      x2={`${20 + (index + 1) * 20}%`}
                      y2={`${30 + ((index + 1) % 2) * 30}%`}
                      stroke="rgba(59, 130, 246, 0.3)"
                      strokeWidth="1"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 0.5 }}
                      transition={{ duration: 2, delay: index * 0.5 }}
                    />
                  ))}
                </svg>
              </div>

              {/* Threat list */}
              <div className="space-y-2">
                {geoThreats.map((threat, index) => (
                  <motion.div
                    key={threat.country}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 + index * 0.1 }}
                    className="flex items-center justify-between text-sm"
                  >
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-2 h-2 rounded-full"
                        style={{ 
                          backgroundColor: threat.risk === 'high' ? '#EF4444' : threat.risk === 'medium' ? '#F59E0B' : '#10B981'
                        }}
                      />
                      <span className="text-gray-300">{threat.country}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-white font-bold">{threat.threats}</span>
                      <Badge 
                        variant="outline"
                        className={`text-xs ${
                          threat.risk === 'high' ? 'border-red-500 text-red-400' :
                          threat.risk === 'medium' ? 'border-yellow-500 text-yellow-400' :
                          'border-green-500 text-green-400'
                        }`}
                      >
                        {threat.risk}
                      </Badge>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </Card>
        </div>

        {/* Industry Benchmarking */}
        <Card className="bg-black/40 backdrop-blur-md border-[#3B82F6]/30 p-6 relative overflow-hidden mb-6">
          <div className="absolute top-0 left-1/2 w-64 h-64 bg-gradient-to-b from-[#3B82F6]/5 to-transparent rounded-full blur-3xl" />
          <div className="relative">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 rounded-lg border border-[#3B82F6]/30">
                <BarChart3 className="h-5 w-5 text-[#3B82F6]" strokeWidth={2} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Industry Benchmark Comparison</h2>
                <p className="text-xs text-gray-400">vs. Financial Services Average</p>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-4">
              {industryBenchmark.map((item, index) => (
                <motion.div
                  key={item.category}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-black/40 backdrop-blur-sm rounded-xl p-4 border border-white/10"
                >
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-semibold text-white">{item.category}</h3>
                    {item.status === 'above' ? (
                      <TrendingUp className="h-4 w-4 text-green-400" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-red-400" />
                    )}
                  </div>

                  <div className="space-y-2">
                    <div>
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="text-gray-400">Your Score</span>
                        <span className={`font-bold ${item.status === 'above' ? 'text-green-400' : 'text-red-400'}`}>
                          {item.score}
                        </span>
                      </div>
                      <div className="w-full bg-gray-800 rounded-full h-2 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${item.score}%` }}
                          transition={{ duration: 1, delay: index * 0.1 }}
                          className={`h-full ${item.status === 'above' ? 'bg-green-500' : 'bg-red-500'}`}
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="text-gray-400">Industry Avg</span>
                        <span className="font-bold text-gray-400">{item.industry}</span>
                      </div>
                      <div className="w-full bg-gray-800 rounded-full h-2 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${item.industry}%` }}
                          transition={{ duration: 1, delay: 0.2 + index * 0.1 }}
                          className="h-full bg-gray-600"
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </Card>
      </div>

      {/* Custom scrollbar styles */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.2);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(59, 130, 246, 0.3);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(59, 130, 246, 0.5);
        }
      `}</style>
    </div>
  );
};
