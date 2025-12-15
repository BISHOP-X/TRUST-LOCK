import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
  CheckCircle, AlertTriangle, XCircle, FileText, Clock, User, Laptop, MapPin, 
  AlertOctagon, Filter, TrendingUp, Shield, Activity, BarChart3, Eye, 
  Download, Search, Calendar, Globe, Zap, Target
} from 'lucide-react';
import { useDashboard } from '@/contexts/DashboardContext';
import { useState } from 'react';

export const AuditLogView = () => {
  const { auditLog } = useDashboard();
  const [filter, setFilter] = useState<'ALL' | 'GRANTED' | 'CHALLENGE' | 'BLOCKED'>('ALL');
  const [viewMode, setViewMode] = useState<'table' | 'timeline'>('timeline');

  // Floating particles for background
  const particles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    top: Math.random() * 100,
    delay: Math.random() * 5,
    duration: 3 + Math.random() * 2,
  }));

  const filteredLog = filter === 'ALL' 
    ? auditLog 
    : auditLog.filter(entry => entry.decision === filter);

  // Pattern detection
  const patterns = {
    multipleFailures: auditLog.filter(log => log.decision === 'BLOCKED').length,
    suspiciousLocations: new Set(auditLog.filter(log => log.location.includes('Nigeria') || log.location.includes('Russia')).map(log => log.location)).size,
    newDevices: auditLog.filter(log => log.reason.toLowerCase().includes('new device')).length,
    impossibleTravel: auditLog.filter(log => log.reason.toLowerCase().includes('impossible travel')).length,
  };

  // Analytics metrics
  const analytics = {
    avgRiskScore: Math.round(auditLog.reduce((acc, log) => acc + log.riskScore, 0) / (auditLog.length || 1)),
    peakHour: '14:00',
    mostActiveUser: 'Alice',
    topRiskLocation: 'Lagos, Nigeria',
  };

  const getDecisionBadge = (decision: string) => {
    switch (decision) {
      case 'GRANTED':
        return (
          <Badge className="bg-green-500/10 text-green-500 border-green-500/30 flex items-center gap-1.5">
            <CheckCircle className="h-3.5 w-3.5" strokeWidth={2.5} />
            Granted
          </Badge>
        );
      case 'CHALLENGE':
        return (
          <Badge className="bg-yellow-500/10 text-yellow-500 border-yellow-500/30 flex items-center gap-1.5">
            <AlertTriangle className="h-3.5 w-3.5" strokeWidth={2.5} />
            Challenge
          </Badge>
        );
      case 'BLOCKED':
        return (
          <Badge className="bg-red-500/10 text-red-500 border-red-500/30 flex items-center gap-1.5">
            <XCircle className="h-3.5 w-3.5" strokeWidth={2.5} />
            Blocked
          </Badge>
        );
    }
  };

  const getRiskColor = (score: number) => {
    if (score <= 30) return 'text-green-500 font-bold';
    if (score <= 60) return 'text-yellow-500 font-bold';
    return 'text-red-500 font-bold';
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
            stroke="url(#lineGradientAudit)"
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
          <linearGradient id="lineGradientAudit" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#F8C537" stopOpacity="0" />
            <stop offset="50%" stopColor="#F8C537" stopOpacity="1" />
            <stop offset="100%" stopColor="#F8C537" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 container mx-auto px-6 py-8"
      >
        {/* Header Card with Analytics */}
        <Card className="bg-black/40 backdrop-blur-md border-[#3B82F6]/30 shadow-xl relative overflow-hidden mb-6">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-[#3B82F6]/10 via-[#F8C537]/5 to-transparent rounded-full blur-3xl" />
          <div className="p-6 relative">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl border border-[#F8C537]/30 bg-[#F8C537]/10">
                  <FileText className="h-6 w-6 text-[#F8C537]" strokeWidth={2} />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-white">Security Audit Trail</h1>
                  <p className="text-sm text-gray-400">Complete access history & pattern analysis</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                {/* View Mode Toggle */}
                <div className="flex gap-2 bg-black/40 p-1 rounded-lg border border-white/10">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setViewMode('timeline')}
                    className={`px-3 py-2 rounded-md text-xs font-semibold transition-all flex items-center gap-2 ${
                      viewMode === 'timeline'
                        ? 'bg-[#3B82F6] text-white'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    <Activity className="h-3.5 w-3.5" />
                    Timeline
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setViewMode('table')}
                    className={`px-3 py-2 rounded-md text-xs font-semibold transition-all flex items-center gap-2 ${
                      viewMode === 'table'
                        ? 'bg-[#3B82F6] text-white'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    <BarChart3 className="h-3.5 w-3.5" />
                    Table
                  </motion.button>
                </div>
                {/* Export Button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white text-xs font-semibold flex items-center gap-2 hover:bg-white/20 transition-all"
                >
                  <Download className="h-3.5 w-3.5" />
                  Export CSV
                </motion.button>
              </div>
            </div>

            {/* Analytics Grid */}
            <div className="grid grid-cols-4 gap-4">
              {[
                { label: 'Avg Risk Score', value: analytics.avgRiskScore, icon: Target, color: '#F59E0B', sublabel: '/100' },
                { label: 'Peak Hour', value: analytics.peakHour, icon: Clock, color: '#3B82F6', sublabel: 'UTC' },
                { label: 'Most Active', value: analytics.mostActiveUser, icon: User, color: '#10B981', sublabel: 'user' },
                { label: 'Top Risk Zone', value: analytics.topRiskLocation, icon: Globe, color: '#EF4444', sublabel: '' },
              ].map((metric, index) => {
                const Icon = metric.icon;
                return (
                  <motion.div
                    key={metric.label}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-black/40 backdrop-blur-sm rounded-xl p-4 border border-white/10"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <div className="p-1.5 rounded-lg border" style={{ borderColor: `${metric.color}40`, backgroundColor: `${metric.color}10` }}>
                        <Icon className="h-3.5 w-3.5" style={{ color: metric.color }} />
                      </div>
                      <span className="text-xs text-gray-400">{metric.label}</span>
                    </div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-lg font-bold text-white">{metric.value}</span>
                      {metric.sublabel && <span className="text-xs text-gray-500">{metric.sublabel}</span>}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </Card>

        {/* Pattern Detection Insights */}
        <div className="grid grid-cols-2 gap-6 mb-6">
          <Card className="bg-black/40 backdrop-blur-md border-[#3B82F6]/30 p-6 relative overflow-hidden">
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-red-500/10 to-transparent rounded-full blur-3xl" />
            <div className="relative">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 rounded-lg border border-red-500/30">
                  <AlertTriangle className="h-5 w-5 text-red-500" strokeWidth={2} />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">Pattern Detection</h2>
                  <p className="text-xs text-gray-400">Security anomalies identified</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: 'Multiple Failures', value: patterns.multipleFailures, color: '#EF4444', icon: XCircle },
                  { label: 'Suspicious Locations', value: patterns.suspiciousLocations, color: '#F59E0B', icon: MapPin },
                  { label: 'New Devices', value: patterns.newDevices, color: '#3B82F6', icon: Laptop },
                  { label: 'Impossible Travel', value: patterns.impossibleTravel, color: '#A855F7', icon: Zap },
                ].map((pattern, index) => {
                  const Icon = pattern.icon;
                  return (
                    <motion.div
                      key={pattern.label}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-black/40 backdrop-blur-sm rounded-xl p-3 border border-white/10"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <Icon className="h-4 w-4" style={{ color: pattern.color }} />
                        <span className="text-xs text-gray-400">{pattern.label}</span>
                      </div>
                      <span className="text-2xl font-bold" style={{ color: pattern.color }}>{pattern.value}</span>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </Card>

          <Card className="bg-black/40 backdrop-blur-md border-[#3B82F6]/30 p-6 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-[#3B82F6]/10 to-transparent rounded-full blur-3xl" />
            <div className="relative">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 rounded-lg border border-[#3B82F6]/30">
                  <Filter className="h-5 w-5 text-[#3B82F6]" strokeWidth={2} />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">Filter Events</h2>
                  <p className="text-xs text-gray-400">Quick access by decision type</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: 'All Events', value: 'ALL' as const, color: '#3B82F6', count: auditLog.length },
                  { label: 'Granted', value: 'GRANTED' as const, color: '#10B981', count: auditLog.filter(e => e.decision === 'GRANTED').length },
                  { label: 'Challenged', value: 'CHALLENGE' as const, color: '#F59E0B', count: auditLog.filter(e => e.decision === 'CHALLENGE').length },
                  { label: 'Blocked', value: 'BLOCKED' as const, color: '#EF4444', count: auditLog.filter(e => e.decision === 'BLOCKED').length },
                ].map((btn) => (
                  <motion.button
                    key={btn.value}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setFilter(btn.value)}
                    className={`p-3 rounded-xl text-left transition-all ${
                      filter === btn.value
                        ? 'border-2'
                        : 'bg-black/40 border border-white/10 hover:border-white/20'
                    }`}
                    style={{
                      borderColor: filter === btn.value ? btn.color : undefined,
                      backgroundColor: filter === btn.value ? `${btn.color}20` : undefined
                    }}
                  >
                    <div className="text-xs text-gray-400 mb-1">{btn.label}</div>
                    <div className="text-2xl font-bold" style={{ color: filter === btn.value ? btn.color : '#ffffff' }}>
                      {btn.count}
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>
          </Card>
        </div>

        {/* Main Content Area */}
        <Card className="bg-black/40 backdrop-blur-md border-[#3B82F6]/30 shadow-xl relative overflow-hidden">
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-gradient-to-tr from-[#F8C537]/10 to-[#3B82F6]/10 rounded-full blur-3xl" />
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-bl from-[#3B82F6]/10 to-[#F8C537]/10 rounded-full blur-3xl" />
          
          <div className="p-6 relative">
            {/* Timeline View */}
            {viewMode === 'timeline' && (
              <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                <AnimatePresence>
                  {filteredLog.length > 0 ? filteredLog.reverse().map((entry, index) => {
                    const getDecisionColor = () => {
                      switch (entry.decision) {
                        case 'GRANTED': return { bg: 'bg-green-500/10', border: 'border-green-500/30', text: 'text-green-400', icon: CheckCircle };
                        case 'CHALLENGE': return { bg: 'bg-yellow-500/10', border: 'border-yellow-500/30', text: 'text-yellow-400', icon: AlertTriangle };
                        case 'BLOCKED': return { bg: 'bg-red-500/10', border: 'border-red-500/30', text: 'text-red-400', icon: XCircle };
                        default: return { bg: 'bg-gray-500/10', border: 'border-gray-500/30', text: 'text-gray-400', icon: Activity };
                      }
                    };
                    const colors = getDecisionColor();
                    const DecisionIcon = colors.icon;

                    return (
                      <motion.div
                        key={entry.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ delay: index * 0.05 }}
                        className="relative"
                      >
                        {/* Timeline connector */}
                        {index < filteredLog.length - 1 && (
                          <div className="absolute left-6 top-16 w-0.5 h-8 bg-gradient-to-b from-white/20 to-transparent" />
                        )}

                        <div className={`${colors.bg} backdrop-blur-sm border ${colors.border} rounded-xl p-5 hover:border-opacity-60 transition-all`}>
                          <div className="flex items-start gap-4">
                            {/* Icon & Timeline Marker */}
                            <div className="relative flex-shrink-0">
                              <div className={`p-3 rounded-xl ${colors.bg} border ${colors.border}`}>
                                <DecisionIcon className={`h-5 w-5 ${colors.text}`} />
                              </div>
                            </div>

                            {/* Content */}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between mb-3">
                                <div className="flex items-center gap-3">
                                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#3B82F6] to-[#F8C537] flex items-center justify-center text-sm font-bold text-white">
                                    {entry.user.split(' ').map(n => n[0]).join('')}
                                  </div>
                                  <div>
                                    <div className="font-semibold text-white">{entry.user}</div>
                                    <div className="flex items-center gap-2 text-xs text-gray-400">
                                      <Clock className="h-3 w-3" />
                                      {entry.timestamp}
                                    </div>
                                  </div>
                                </div>
                                <Badge 
                                  variant="outline" 
                                  className={`${colors.text} ${colors.border} font-semibold`}
                                >
                                  {entry.decision}
                                </Badge>
                              </div>

                              {/* Details Grid */}
                              <div className="grid grid-cols-3 gap-4 mb-3">
                                <div className="flex items-center gap-2 text-sm">
                                  <Laptop className="h-4 w-4 text-gray-400" />
                                  <div>
                                    <div className="text-xs text-gray-500">Device</div>
                                    <div className="text-white font-medium truncate">{entry.device}</div>
                                  </div>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                  <MapPin className="h-4 w-4 text-gray-400" />
                                  <div>
                                    <div className="text-xs text-gray-500">Location</div>
                                    <div className="text-white font-medium truncate">{entry.location}</div>
                                  </div>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                  <Target className="h-4 w-4 text-gray-400" />
                                  <div>
                                    <div className="text-xs text-gray-500">Risk Score</div>
                                    <div className={`font-bold ${
                                      entry.riskScore > 60 ? 'text-red-400' : 
                                      entry.riskScore > 30 ? 'text-yellow-400' : 
                                      'text-green-400'
                                    }`}>
                                      {entry.riskScore}/100
                                    </div>
                                  </div>
                                </div>
                              </div>

                              {/* Reason */}
                              <div className="bg-black/40 backdrop-blur-sm rounded-lg p-3 border border-white/5">
                                <div className="text-xs text-gray-500 mb-1">Security Assessment</div>
                                <div className="text-sm text-white leading-relaxed">{entry.reason}</div>
                              </div>

                              {/* Risk Score Bar */}
                              <div className="mt-3">
                                <div className="w-full bg-gray-800 rounded-full h-1.5 overflow-hidden">
                                  <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${entry.riskScore}%` }}
                                    transition={{ duration: 1, delay: index * 0.05 }}
                                    className={`h-full ${
                                      entry.riskScore > 60 ? 'bg-red-500' :
                                      entry.riskScore > 30 ? 'bg-yellow-500' :
                                      'bg-green-500'
                                    }`}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  }) : (
                    <div className="py-16 text-center">
                      <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-black/30 mb-4">
                        <FileText className="h-10 w-10 text-gray-400" strokeWidth={1.5} />
                      </div>
                      <h3 className="text-lg font-semibold text-white mb-2">No events found</h3>
                      <p className="text-sm text-gray-400">No audit log entries match the selected filter.</p>
                    </div>
                  )}
                </AnimatePresence>
              </div>
            )}

            {/* Table View */}
            {viewMode === 'table' && (
              <div className="rounded-xl border border-white/10 overflow-hidden bg-black/40 backdrop-blur-sm">
                <Table>
                <TableHeader>
                  <TableRow className="bg-black/30 hover:bg-black/30 border-b border-white/10">
                    <TableHead className="font-bold text-white">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        Timestamp
                      </div>
                    </TableHead>
                    <TableHead className="font-bold text-white">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        User
                      </div>
                    </TableHead>
                    <TableHead className="font-bold text-white">
                      <div className="flex items-center gap-2">
                        <Laptop className="h-4 w-4" />
                        Device
                      </div>
                    </TableHead>
                    <TableHead className="font-bold text-white">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        Location
                      </div>
                    </TableHead>
                    <TableHead className="font-bold text-white text-center">
                      <div className="flex items-center justify-center gap-2">
                        <AlertOctagon className="h-4 w-4" />
                        Risk
                      </div>
                    </TableHead>
                    <TableHead className="font-bold text-white text-center">Decision</TableHead>
                    <TableHead className="font-bold text-white">Reason</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredLog.map((entry, index) => (
                    <motion.tr
                      key={entry.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.03, type: "spring", stiffness: 100 }}
                      className="group hover:bg-white/5 transition-all border-b border-white/5"
                    >
                      <TableCell className="text-sm text-gray-400 font-medium">
                        <div className="flex items-center gap-2">
                          <Clock className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-[#F8C537]" />
                          {entry.timestamp}
                        </div>
                      </TableCell>
                      <TableCell className="text-sm font-semibold text-white">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#3B82F6] to-[#F8C537] flex items-center justify-center text-xs font-bold text-white">
                            {entry.user.split(' ').map(n => n[0]).join('')}
                          </div>
                          {entry.user}
                        </div>
                      </TableCell>
                      <TableCell className="text-sm text-gray-400">
                        <div className="flex items-center gap-2">
                          <Laptop className="h-3.5 w-3.5 opacity-50" />
                          {entry.device}
                        </div>
                      </TableCell>
                      <TableCell className="text-sm text-gray-400">
                        <div className="flex items-center gap-2">
                          <MapPin className="h-3.5 w-3.5 opacity-50" />
                          {entry.location}
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-black/30">
                          <span className={`text-sm ${getRiskColor(entry.riskScore)}`}>
                            {entry.riskScore}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="text-center">{getDecisionBadge(entry.decision)}</TableCell>
                      <TableCell className="text-sm text-gray-400 max-w-xs">
                        <div className="truncate group-hover:whitespace-normal transition-all">
                          {entry.reason}
                        </div>
                      </TableCell>
                    </motion.tr>
                  ))}
                </TableBody>
              </Table>

              {/* Empty State for Table */}
              {filteredLog.length === 0 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-16 text-center"
                >
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-black/30 mb-4">
                    <FileText className="h-10 w-10 text-gray-400" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">No entries found</h3>
                  <p className="text-sm text-gray-400">
                    No audit log entries match the selected filter.
                  </p>
                </motion.div>
              )}
            </div>
            )}

            {/* Footer */}
            <div className="flex items-center justify-between mt-6 pt-4 border-t border-white/10">
              <div className="flex items-center gap-4">
                <p className="text-sm text-gray-400 font-medium">
                  Showing <span className="font-bold text-white">{filteredLog.length}</span> of{' '}
                  <span className="font-bold text-white">{auditLog.length}</span> event{auditLog.length !== 1 ? 's' : ''}
                </p>
                <Badge variant="outline" className="border-[#3B82F6]/50 text-[#3B82F6] text-xs">
                  <Eye className="h-3 w-3 mr-1" />
                  {viewMode === 'timeline' ? 'Timeline View' : 'Table View'}
                </Badge>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-xs text-gray-400 font-medium">Live Updates Active</span>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>

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
