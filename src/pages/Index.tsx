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
import { CheckCircle, AlertCircle, XCircle, Shield, Activity, TrendingUp, Lock } from 'lucide-react';

const DemoView = () => {
  const { decision, riskFactors, reason, riskScore } = useDashboard();

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
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {/* Risk Gauge - Center Focus */}
          <Card className="lg:col-span-1 bg-black/40 backdrop-blur-md border-[#3B82F6]/30 shadow-xl p-6 relative overflow-hidden">
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
                      className={`h-2 rounded-full ${
                        riskScore > 60 ? 'bg-gradient-to-r from-red-500 to-red-600' : 
                        riskScore > 30 ? 'bg-gradient-to-r from-yellow-500 to-yellow-600' : 
                        'bg-gradient-to-r from-green-500 to-green-600'
                      }`}
                    />
                  </div>
                </motion.div>
              )}
            </div>
          </Card>

          {/* Three Pillars Analysis */}
          <Card className="lg:col-span-2 bg-black/40 backdrop-blur-md border-[#3B82F6]/30 shadow-xl p-6 relative overflow-hidden">
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-tr from-[#F8C537]/10 to-[#3B82F6]/10 rounded-full blur-3xl" />
            
            <div className="relative">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 rounded-lg border border-[#F8C537]/30">
                  <Activity className="h-5 w-5 text-[#F8C537]" strokeWidth={2} />
                </div>
                <h2 className="text-xl font-bold text-white">Security Analysis</h2>
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
                    <div className="absolute inset-0 bg-[#3B82F6]/20 rounded-full blur-2xl" />
                    <Shield className="relative h-20 w-20 text-[#3B82F6]/60" strokeWidth={1.5} />
                  </motion.div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    Awaiting Login Attempt
                  </h3>
                  <p className="text-sm text-gray-400 max-w-md leading-relaxed">
                    Security gateway is active. All three pillars will analyze the next authentication attempt in real-time.
                  </p>
                </div>
              )}

              {/* Active Analysis - Three Pillars */}
              {decision && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-4"
                >
                  {/* Three Pillars Grid */}
                  <div className="grid grid-cols-3 gap-4">
                    {[
                      { icon: Lock, label: 'Identity', color: '#3B82F6' },
                      { icon: Shield, label: 'Device', color: '#F8C537' },
                      { icon: TrendingUp, label: 'Location', color: '#3B82F6' },
                    ].map((pillar, index) => {
                      const PillarIcon = pillar.icon;
                      const pillarFactor = riskFactors[index];
                      
                      return (
                        <motion.div
                          key={pillar.label}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.1 * index, type: "spring" }}
                          className="bg-black/60 backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:border-white/20 transition-colors"
                        >
                          <div className="flex items-center gap-3 mb-3">
                            <div 
                              className="w-10 h-10 rounded-lg flex items-center justify-center border"
                              style={{ 
                                borderColor: `${pillar.color}40`
                              }}
                            >
                              <PillarIcon className="w-5 h-5" style={{ color: pillar.color }} />
                            </div>
                            <div>
                              <div className="text-xs text-gray-400">{pillar.label}</div>
                              <div className="text-sm font-semibold text-white">
                                {pillarFactor?.label || 'Analyzing...'}
                              </div>
                            </div>
                          </div>
                          {pillarFactor && (
                            <Badge 
                              variant="outline" 
                              className="text-xs w-full justify-center"
                              style={{
                                borderColor: pillar.color,
                                color: pillar.color
                              }}
                            >
                              +{pillarFactor.points} risk
                            </Badge>
                          )}
                        </motion.div>
                      );
                    })}
                  </div>

                  {/* AI Analysis */}
                  {reason && (
                    <div className="bg-gradient-to-br from-[#3B82F6]/10 to-[#F8C537]/10 backdrop-blur-sm rounded-xl p-5 border border-white/10">
                      <h4 className="text-sm font-semibold text-gray-300 mb-3 flex items-center gap-2">
                        <Activity className="h-4 w-4 text-[#F8C537]" />
                        AI Security Assessment
                      </h4>
                      <p className="text-sm text-white leading-relaxed">{reason}</p>
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
