import { useState } from 'react';
import { DashboardProvider } from '@/contexts/DashboardContext';
import { PresentationProvider } from '@/contexts/PresentationContext';
import { PresentationWrapper } from '@/components/presentation/PresentationWrapper';
import { NavigationBar } from '@/components/dashboard/NavigationBar';
import { RiskDetailsPanel } from '@/components/dashboard/RiskDetailsPanel';
import { AuditLogView } from '@/components/dashboard/AuditLogView';
import { SystemInfoView } from '@/components/dashboard/SystemInfoView';
import { ThreatOverview } from '@/components/dashboard/ThreatOverview';
import { RiskGauge } from '@/components/dashboard/RiskGauge';
import { useDashboard } from '@/contexts/DashboardContext';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CheckCircle, AlertCircle, XCircle, Shield, Activity, TrendingUp, Lock,
  MapPin, Clock, Globe, Wifi, Smartphone, Monitor, AlertTriangle,
  User, Calendar, Zap, Eye, Radio
} from 'lucide-react';

const DemoView = () => {
  const { decision, riskFactors, reason, riskScore, auditLog } = useDashboard();

  // Floating particles for background
  const particles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    top: Math.random() * 100,
    delay: Math.random() * 5,
    duration: 3 + Math.random() * 2,
  }));

  const getDecisionStyle = () => {
    switch (decision) {
      case 'GRANTED':
        return 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg';
      case 'CHALLENGE':
        return 'bg-gradient-to-r from-yellow-500 to-yellow-600 text-white shadow-lg';
      case 'BLOCKED':
        return 'bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg';
    }
  };

  const getDecisionIcon = () => {
    switch (decision) {
      case 'GRANTED':
        return <CheckCircle className="h-6 w-6" strokeWidth={2.5} />;
      case 'CHALLENGE':
        return <AlertCircle className="h-6 w-6" strokeWidth={2.5} />;
      case 'BLOCKED':
        return <XCircle className="h-6 w-6" strokeWidth={2.5} />;
    }
  };

  // Real-time metrics
  const totalAttempts = auditLog.length;
  const successRate = Math.round((auditLog.filter(log => log.decision === 'GRANTED').length / (totalAttempts || 1)) * 100);
  const blockedToday = auditLog.filter(log => log.decision === 'BLOCKED').length;
  const avgRiskScore = Math.round(auditLog.reduce((acc, log) => acc + log.riskScore, 0) / (totalAttempts || 1));

  // Recent activity (first 5 are newest since we prepend new entries)
  const recentActivity = auditLog.slice(0, 5);

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
            stroke="url(#lineGradientDashboard)"
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
          <linearGradient id="lineGradientDashboard" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#F8C537" stopOpacity="0" />
            <stop offset="50%" stopColor="#F8C537" stopOpacity="1" />
            <stop offset="100%" stopColor="#F8C537" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>

      <div className="relative z-10 container mx-auto px-6 py-8">
        {/* Live Metrics Row */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          {[
            { label: 'Total Attempts', value: totalAttempts, icon: Activity, color: '#3B82F6' },
            { label: 'Success Rate', value: `${successRate}%`, icon: TrendingUp, color: '#10B981' },
            { label: 'Blocked Today', value: blockedToday, icon: Shield, color: '#EF4444' },
            { label: 'Avg Risk Score', value: avgRiskScore, icon: AlertTriangle, color: '#F8C537' },
          ].map((metric, index) => {
            const MetricIcon = metric.icon;
            return (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="bg-black/40 backdrop-blur-md border-white/10 p-4 relative overflow-hidden group hover:border-white/20 transition-all">
                  <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br opacity-10 rounded-full blur-2xl" style={{ backgroundColor: metric.color }} />
                  <div className="relative flex items-start justify-between">
                    <div>
                      <p className="text-xs text-gray-400 mb-1">{metric.label}</p>
                      <motion.p
                        className="text-2xl font-bold text-white"
                        key={metric.value}
                        initial={{ scale: 1.2, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                      >
                        {metric.value}
                      </motion.p>
                    </div>
                    <div className="p-2 rounded-lg border" style={{ borderColor: `${metric.color}40` }}>
                      <MetricIcon className="h-4 w-4" style={{ color: metric.color }} />
                    </div>
                  </div>
                  <motion.div
                    className="absolute bottom-0 left-0 h-1 rounded-full"
                    style={{ backgroundColor: metric.color }}
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                  />
                </Card>
              </motion.div>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-6">
          {/* Risk Gauge - Center Focus */}
          <Card className="bg-black/40 backdrop-blur-md border-[#3B82F6]/30 shadow-xl p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#3B82F6]/10 to-[#F8C537]/10 rounded-full blur-3xl" />

            <div className="relative">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 rounded-lg border border-[#3B82F6]/30">
                  <Shield className="h-5 w-5 text-[#3B82F6]" strokeWidth={2} />
                </div>
                <h2 className="text-xl font-bold text-white">Risk Assessment</h2>
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

              {/* Risk Score Bar */}
              {decision && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-2"
                >
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Risk Score</span>
                    <span className="text-white font-bold">{riskScore}/100</span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-2 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${riskScore}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className={`h-2 rounded-full ${riskScore > 60 ? 'bg-gradient-to-r from-red-500 to-red-600' :
                        riskScore > 30 ? 'bg-gradient-to-r from-yellow-500 to-yellow-600' :
                          'bg-gradient-to-r from-green-500 to-green-600'
                        }`}
                    />
                  </div>
                </motion.div>
              )}
            </div>
          </Card>

          {/* Real-Time Activity Feed */}
          <Card className="lg:col-span-2 bg-black/40 backdrop-blur-md border-[#3B82F6]/30 shadow-xl p-6 relative overflow-hidden">
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-tr from-[#F8C537]/10 to-[#3B82F6]/10 rounded-full blur-3xl" />

            <div className="relative">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-lg border border-[#F8C537]/30 relative">
                    <Radio className="h-5 w-5 text-[#F8C537]" strokeWidth={2} />
                    <motion.div
                      className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full"
                      animate={{ scale: [1, 1.3, 1], opacity: [1, 0.5, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">Live Activity Stream</h2>
                    <p className="text-xs text-gray-400">Real-time security monitoring</p>
                  </div>
                </div>
                <Badge variant="outline" className="border-green-500/50 text-green-400">
                  <Eye className="h-3 w-3 mr-1" />
                  LIVE
                </Badge>
              </div>

              {/* Activity Timeline */}
              <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                <AnimatePresence>
                  {recentActivity.length > 0 ? recentActivity.map((log, index) => {
                    const timeAgo = `${Math.floor(Math.random() * 5) + 1}m ago`;
                    // Extract friendly name from email (e.g., alice@company.com -> Alice)
                    const friendlyName = log.user.split('@')[0].charAt(0).toUpperCase() + log.user.split('@')[0].slice(1);
                    const getActivityColor = () => {
                      switch (log.decision) {
                        case 'GRANTED': return { border: 'border-green-500/30', bg: 'bg-green-500/10', text: 'text-green-400', icon: CheckCircle };
                        case 'CHALLENGE': return { border: 'border-yellow-500/30', bg: 'bg-yellow-500/10', text: 'text-yellow-400', icon: AlertCircle };
                        case 'BLOCKED': return { border: 'border-red-500/30', bg: 'bg-red-500/10', text: 'text-red-400', icon: XCircle };
                        default: return { border: 'border-gray-500/30', bg: 'bg-gray-500/10', text: 'text-gray-400', icon: Activity };
                      }
                    };
                    const style = getActivityColor();
                    const ActivityIcon = style.icon;

                    return (
                      <motion.div
                        key={`${log.timestamp}-${index}`}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ delay: index * 0.1 }}
                        className={`bg-black/40 backdrop-blur-sm border ${style.border} rounded-xl p-4 hover:bg-black/60 transition-colors`}
                      >
                        <div className="flex items-start gap-4">
                          <div className={`p-2 rounded-lg ${style.bg} border ${style.border}`}>
                            <ActivityIcon className={`h-4 w-4 ${style.text}`} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center gap-2">
                                <User className="h-4 w-4 text-gray-400" />
                                <span className="font-semibold text-white text-sm">{friendlyName}</span>
                                <Badge variant="outline" className={`text-xs ${style.text} border-current`}>
                                  {log.decision}
                                </Badge>
                              </div>
                              <div className="flex items-center gap-1 text-xs text-gray-500">
                                <Clock className="h-3 w-3" />
                                {timeAgo}
                              </div>
                            </div>
                            <div className="grid grid-cols-2 gap-2 text-xs">
                              <div className="flex items-center gap-1.5 text-gray-400">
                                <Monitor className="h-3 w-3" />
                                <span className="truncate">{log.device}</span>
                              </div>
                              <div className="flex items-center gap-1.5 text-gray-400">
                                <MapPin className="h-3 w-3" />
                                <span className="truncate">{log.location}</span>
                              </div>
                            </div>
                            <div className="flex items-center justify-between mt-2 pt-2 border-t border-white/5">
                              <span className="text-xs text-gray-500">Risk Score</span>
                              <div className="flex items-center gap-2">
                                <div className="w-16 h-1.5 bg-gray-800 rounded-full overflow-hidden">
                                  <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${log.riskScore}%` }}
                                    className={`h-full ${log.riskScore > 60 ? 'bg-red-500' : log.riskScore > 30 ? 'bg-yellow-500' : 'bg-green-500'}`}
                                  />
                                </div>
                                <span className={`text-xs font-bold ${log.riskScore > 60 ? 'text-red-400' : log.riskScore > 30 ? 'text-yellow-400' : 'text-green-400'}`}>
                                  {log.riskScore}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  }) : (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                      <motion.div
                        className="relative mb-4"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                      >
                        <Radio className="h-12 w-12 text-[#3B82F6]/40" />
                      </motion.div>
                      <p className="text-sm text-gray-400">Waiting for login attempts...</p>
                    </div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </Card>
        </div>

        {/* Bottom Section: Threat Radar & Security Breakdown */}
        <div className="grid lg:grid-cols-2 gap-6 mb-6">
          {/* Threat Level Radar */}
          <Card className="bg-black/40 backdrop-blur-md border-[#3B82F6]/30 shadow-xl p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#3B82F6]/10 to-transparent rounded-full blur-3xl" />
            <div className="relative">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 rounded-lg border border-[#3B82F6]/30">
                  <Zap className="h-5 w-5 text-[#3B82F6]" strokeWidth={2} />
                </div>
                <h2 className="text-xl font-bold text-white">Threat Radar</h2>
              </div>

              <div className="flex items-center justify-center py-6">
                {decision ? (
                  <div className="relative w-48 h-48">
                    {/* Circular radar rings */}
                    {[0, 1, 2, 3].map((ring) => (
                      <motion.div
                        key={ring}
                        className="absolute inset-0 rounded-full border border-[#3B82F6]/20"
                        style={{
                          width: `${(ring + 1) * 25}%`,
                          height: `${(ring + 1) * 25}%`,
                          left: `${(4 - ring - 1) * 12.5}%`,
                          top: `${(4 - ring - 1) * 12.5}%`,
                        }}
                        animate={{ opacity: [0.3, 0.6, 0.3] }}
                        transition={{ duration: 2, repeat: Infinity, delay: ring * 0.2 }}
                      />
                    ))}

                    {/* Center indicator */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.div
                        className={`w-16 h-16 rounded-full flex items-center justify-center ${decision === 'GRANTED' ? 'bg-green-500/20 border-green-500' :
                          decision === 'CHALLENGE' ? 'bg-yellow-500/20 border-yellow-500' :
                            'bg-red-500/20 border-red-500'
                          } border-2`}
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        {getDecisionIcon()}
                      </motion.div>
                    </div>

                    {/* Sweeping radar line */}
                    <motion.div
                      className="absolute inset-0"
                      style={{ transformOrigin: 'center' }}
                      animate={{ rotate: 360 }}
                      transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    >
                      <div className="absolute top-0 left-1/2 w-0.5 h-1/2 bg-gradient-to-t from-[#3B82F6] to-transparent" />
                    </motion.div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center py-8">
                    <Shield className="h-16 w-16 text-[#3B82F6]/40 mb-3" />
                    <p className="text-sm text-gray-400">Radar on standby</p>
                  </div>
                )}
              </div>

              {decision && (
                <div className="grid grid-cols-3 gap-3 mt-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-400">{100 - riskScore}</div>
                    <div className="text-xs text-gray-400">Trust</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-[#F8C537]">{riskScore}</div>
                    <div className="text-xs text-gray-400">Risk</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-[#3B82F6]">{Math.max(0, 100 - riskScore - 20)}</div>
                    <div className="text-xs text-gray-400">Confidence</div>
                  </div>
                </div>
              )}
            </div>
          </Card>

          {/* Security Pillars Breakdown */}
          <Card className="bg-black/40 backdrop-blur-md border-[#3B82F6]/30 shadow-xl p-6 relative overflow-hidden">
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-[#F8C537]/10 to-transparent rounded-full blur-3xl" />
            <div className="relative">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 rounded-lg border border-[#F8C537]/30">
                  <Shield className="h-5 w-5 text-[#F8C537]" strokeWidth={2} />
                </div>
                <h2 className="text-xl font-bold text-white">Security Pillars</h2>
              </div>

              {!decision && (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <motion.div
                    className="relative mb-4"
                    animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Shield className="h-16 w-16 text-[#3B82F6]/40" />
                  </motion.div>
                  <p className="text-sm text-gray-400">Awaiting analysis...</p>
                </div>
              )}

              {decision && riskFactors && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-4"
                >
                  {[
                    { icon: User, label: 'Identity Verification', factor: riskFactors[0], color: '#3B82F6' },
                    { icon: Monitor, label: 'Device Trust', factor: riskFactors[1], color: '#F8C537' },
                    { icon: Globe, label: 'Location Context', factor: riskFactors[2], color: '#10B981' },
                  ].map((pillar, index) => {
                    const PillarIcon = pillar.icon;
                    const riskLevel = pillar.factor?.points || 0;

                    return (
                      <motion.div
                        key={pillar.label}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-black/40 backdrop-blur-sm rounded-xl p-4 border border-white/10"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg border" style={{ borderColor: `${pillar.color}40` }}>
                              <PillarIcon className="h-4 w-4" style={{ color: pillar.color }} />
                            </div>
                            <div>
                              <div className="text-sm font-semibold text-white">{pillar.label}</div>
                              <div className="text-xs text-gray-400">{pillar.factor?.label || 'Verified'}</div>
                            </div>
                          </div>
                          <Badge
                            variant="outline"
                            className="text-xs font-bold"
                            style={{ borderColor: pillar.color, color: pillar.color }}
                          >
                            +{riskLevel}
                          </Badge>
                        </div>
                        <div className="w-full bg-gray-800 rounded-full h-2 overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${(riskLevel / 40) * 100}%` }}
                            transition={{ duration: 1, delay: index * 0.1 }}
                            className="h-2 rounded-full"
                            style={{ backgroundColor: pillar.color }}
                          />
                        </div>
                      </motion.div>
                    );
                  })}

                  {/* AI Assessment */}
                  {reason && (
                    <div className="bg-gradient-to-br from-[#3B82F6]/10 to-[#F8C537]/10 backdrop-blur-sm rounded-xl p-4 border border-white/10 mt-4">
                      <h4 className="text-sm font-semibold text-gray-300 mb-2 flex items-center gap-2">
                        <Activity className="h-4 w-4 text-[#F8C537]" />
                        AI Assessment
                      </h4>
                      <p className="text-xs text-white leading-relaxed">{reason}</p>
                    </div>
                  )}
                </motion.div>
              )}
            </div>
          </Card>
        </div>

        {/* Risk Details Panel */}
        <RiskDetailsPanel />
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

const Index = () => {
  const [activeTab, setActiveTab] = useState('demo');

  return (
    <PresentationProvider>
      <DashboardProvider>
        <PresentationWrapper>
          <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
            <NavigationBar activeTab={activeTab} onTabChange={setActiveTab} />

            {activeTab === 'demo' && <DemoView />}
            {activeTab === 'threat' && <ThreatOverview />}
            {activeTab === 'audit' && <AuditLogView />}
          </div>
        </PresentationWrapper>
      </DashboardProvider>
    </PresentationProvider>
  );
};

export default Index;
