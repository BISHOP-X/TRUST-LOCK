import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { CheckCircle, AlertTriangle, XCircle, FileText, Clock, User, Laptop, MapPin, AlertOctagon, Filter } from 'lucide-react';
import { useDashboard } from '@/contexts/DashboardContext';
import { useState } from 'react';

export const AuditLogView = () => {
  const { auditLog } = useDashboard();
  const [filter, setFilter] = useState<'ALL' | 'GRANTED' | 'CHALLENGE' | 'BLOCKED'>('ALL');

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
        <Card className="bg-black/40 backdrop-blur-md border-[#3B82F6]/30 shadow-xl relative overflow-hidden">
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-gradient-to-tr from-[#F8C537]/10 to-[#3B82F6]/10 rounded-full blur-3xl" />
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-bl from-[#3B82F6]/10 to-[#F8C537]/10 rounded-full blur-3xl" />
          
          <div className="p-6 relative">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              {/* Filter Buttons */}
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-gray-400" />
                <div className="flex gap-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setFilter('ALL')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      filter === 'ALL'
                        ? 'bg-gradient-to-r from-[#3B82F6] to-[#F8C537] text-white shadow-lg'
                        : 'bg-black/50 text-gray-400 hover:bg-black/70 border border-white/10'
                    }`}
                  >
                    All
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setFilter('GRANTED')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      filter === 'GRANTED'
                        ? 'bg-green-500 text-white shadow-lg'
                        : 'bg-black/50 text-gray-400 hover:bg-black/70 border border-white/10'
                    }`}
                  >
                    Granted
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setFilter('CHALLENGE')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      filter === 'CHALLENGE'
                        ? 'bg-yellow-500 text-white shadow-lg'
                        : 'bg-black/50 text-gray-400 hover:bg-black/70 border border-white/10'
                    }`}
                  >
                    Challenge
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setFilter('BLOCKED')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      filter === 'BLOCKED'
                        ? 'bg-red-500 text-white shadow-lg'
                        : 'bg-black/50 text-gray-400 hover:bg-black/70 border border-white/10'
                    }`}
                  >
                    Blocked
                  </motion.button>
                </div>
              </div>
            </div>

            {/* Stats Summary */}
            <div className="grid grid-cols-4 gap-4 mb-6">
              <div className="bg-black/60 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                <div className="flex items-center gap-2 mb-2">
                  <div className="p-1.5 rounded-lg border border-[#3B82F6]/30">
                    <AlertOctagon className="h-4 w-4 text-[#3B82F6]" strokeWidth={2} />
                  </div>
                  <p className="text-xs font-semibold text-gray-400">Total Events</p>
                </div>
                <p className="text-2xl font-bold text-white">{auditLog.length}</p>
              </div>
              <div className="bg-black/60 backdrop-blur-sm rounded-xl p-4 border border-green-500/30">
                <div className="flex items-center gap-2 mb-2">
                  <div className="p-1.5 rounded-lg border border-green-500/30">
                    <CheckCircle className="h-4 w-4 text-green-500" strokeWidth={2} />
                  </div>
                  <p className="text-xs font-semibold text-green-500">Granted</p>
                </div>
                <p className="text-2xl font-bold text-green-500">
                  {auditLog.filter(e => e.decision === 'GRANTED').length}
                </p>
              </div>
              <div className="bg-black/60 backdrop-blur-sm rounded-xl p-4 border border-yellow-500/30">
                <div className="flex items-center gap-2 mb-2">
                  <div className="p-1.5 rounded-lg border border-yellow-500/30">
                    <AlertTriangle className="h-4 w-4 text-yellow-500" strokeWidth={2} />
                  </div>
                  <p className="text-xs font-semibold text-yellow-500">Challenged</p>
                </div>
                <p className="text-2xl font-bold text-yellow-500">
                  {auditLog.filter(e => e.decision === 'CHALLENGE').length}
                </p>
              </div>
              <div className="bg-black/60 backdrop-blur-sm rounded-xl p-4 border border-red-500/30">
                <div className="flex items-center gap-2 mb-2">
                  <div className="p-1.5 rounded-lg border border-red-500/30">
                    <XCircle className="h-4 w-4 text-red-500" strokeWidth={2} />
                  </div>
                  <p className="text-xs font-semibold text-red-500">Blocked</p>
                </div>
                <p className="text-2xl font-bold text-red-500">
                  {auditLog.filter(e => e.decision === 'BLOCKED').length}
                </p>
              </div>
            </div>
            
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
            </div>

            {/* Empty State */}
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

            {/* Footer */}
            <div className="flex items-center justify-between mt-6 pt-4 border-t border-white/10">
              <p className="text-sm text-gray-400 font-medium">
                Showing <span className="font-bold text-white">{filteredLog.length}</span> of{' '}
                <span className="font-bold text-white">{auditLog.length}</span> access attempt{auditLog.length !== 1 ? 's' : ''}
              </p>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-xs text-gray-400 font-medium">Live Updates Active</span>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};
