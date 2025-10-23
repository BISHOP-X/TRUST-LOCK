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

  const filteredLog = filter === 'ALL' 
    ? auditLog 
    : auditLog.filter(entry => entry.decision === filter);

  const getDecisionBadge = (decision: string) => {
    switch (decision) {
      case 'GRANTED':
        return (
          <Badge className="bg-success/10 text-success border-success/30 flex items-center gap-1.5">
            <CheckCircle className="h-3.5 w-3.5" strokeWidth={2.5} />
            Granted
          </Badge>
        );
      case 'CHALLENGE':
        return (
          <Badge className="bg-warning/10 text-warning border-warning/30 flex items-center gap-1.5">
            <AlertTriangle className="h-3.5 w-3.5" strokeWidth={2.5} />
            Challenge
          </Badge>
        );
      case 'BLOCKED':
        return (
          <Badge className="bg-destructive/10 text-destructive border-destructive/30 flex items-center gap-1.5">
            <XCircle className="h-3.5 w-3.5" strokeWidth={2.5} />
            Blocked
          </Badge>
        );
    }
  };

  const getRiskColor = (score: number) => {
    if (score <= 30) return 'text-success font-bold';
    if (score <= 60) return 'text-warning font-bold';
    return 'text-destructive font-bold';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-6 py-8"
    >
      <Card className="bg-card/50 backdrop-blur-md border-border/50 shadow-xl relative overflow-hidden">
        {/* Decorative gradients */}
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-gradient-to-tr from-accent/10 to-primary/10 rounded-full blur-3xl" />
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-bl from-primary/10 to-accent/10 rounded-full blur-3xl" />
        
        <div className="p-6 relative">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="absolute inset-0 bg-primary/20 rounded-lg blur-md" />
                <div className="relative bg-gradient-to-br from-primary to-accent p-2.5 rounded-lg">
                  <FileText className="h-5 w-5 text-primary-foreground" strokeWidth={2} />
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-foreground">Access Audit Log</h2>
                <p className="text-sm text-muted-foreground">Real-time security event tracking</p>
              </div>
            </div>

            {/* Filter Buttons */}
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <div className="flex gap-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setFilter('ALL')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    filter === 'ALL'
                      ? 'bg-gradient-to-r from-primary to-accent text-primary-foreground shadow-lg'
                      : 'bg-muted/50 text-muted-foreground hover:bg-muted'
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
                      ? 'bg-success text-success-foreground shadow-lg'
                      : 'bg-muted/50 text-muted-foreground hover:bg-muted'
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
                      ? 'bg-warning text-warning-foreground shadow-lg'
                      : 'bg-muted/50 text-muted-foreground hover:bg-muted'
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
                      ? 'bg-destructive text-destructive-foreground shadow-lg'
                      : 'bg-muted/50 text-muted-foreground hover:bg-muted'
                  }`}
                >
                  Blocked
                </motion.button>
              </div>
            </div>
          </div>

          {/* Stats Summary */}
          <div className="grid grid-cols-4 gap-4 mb-6">
            <div className="bg-card/60 backdrop-blur-sm rounded-xl p-4 border border-border/50">
              <div className="flex items-center gap-2 mb-2">
                <div className="bg-primary/10 p-1.5 rounded-lg">
                  <AlertOctagon className="h-4 w-4 text-primary" strokeWidth={2} />
                </div>
                <p className="text-xs font-semibold text-muted-foreground">Total Events</p>
              </div>
              <p className="text-2xl font-bold text-foreground">{auditLog.length}</p>
            </div>
            <div className="bg-card/60 backdrop-blur-sm rounded-xl p-4 border border-success/30">
              <div className="flex items-center gap-2 mb-2">
                <div className="bg-success/10 p-1.5 rounded-lg">
                  <CheckCircle className="h-4 w-4 text-success" strokeWidth={2} />
                </div>
                <p className="text-xs font-semibold text-success">Granted</p>
              </div>
              <p className="text-2xl font-bold text-success">
                {auditLog.filter(e => e.decision === 'GRANTED').length}
              </p>
            </div>
            <div className="bg-card/60 backdrop-blur-sm rounded-xl p-4 border border-warning/30">
              <div className="flex items-center gap-2 mb-2">
                <div className="bg-warning/10 p-1.5 rounded-lg">
                  <AlertTriangle className="h-4 w-4 text-warning" strokeWidth={2} />
                </div>
                <p className="text-xs font-semibold text-warning">Challenged</p>
              </div>
              <p className="text-2xl font-bold text-warning">
                {auditLog.filter(e => e.decision === 'CHALLENGE').length}
              </p>
            </div>
            <div className="bg-card/60 backdrop-blur-sm rounded-xl p-4 border border-destructive/30">
              <div className="flex items-center gap-2 mb-2">
                <div className="bg-destructive/10 p-1.5 rounded-lg">
                  <XCircle className="h-4 w-4 text-destructive" strokeWidth={2} />
                </div>
                <p className="text-xs font-semibold text-destructive">Blocked</p>
              </div>
              <p className="text-2xl font-bold text-destructive">
                {auditLog.filter(e => e.decision === 'BLOCKED').length}
              </p>
            </div>
          </div>
          
          <div className="rounded-xl border border-border/50 overflow-hidden bg-card/40 backdrop-blur-sm">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/30 hover:bg-muted/30">
                  <TableHead className="font-bold text-foreground">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      Timestamp
                    </div>
                  </TableHead>
                  <TableHead className="font-bold text-foreground">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      User
                    </div>
                  </TableHead>
                  <TableHead className="font-bold text-foreground">
                    <div className="flex items-center gap-2">
                      <Laptop className="h-4 w-4" />
                      Device
                    </div>
                  </TableHead>
                  <TableHead className="font-bold text-foreground">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      Location
                    </div>
                  </TableHead>
                  <TableHead className="font-bold text-foreground text-center">
                    <div className="flex items-center justify-center gap-2">
                      <AlertOctagon className="h-4 w-4" />
                      Risk
                    </div>
                  </TableHead>
                  <TableHead className="font-bold text-foreground text-center">Decision</TableHead>
                  <TableHead className="font-bold text-foreground">Reason</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLog.map((entry, index) => (
                  <motion.tr
                    key={entry.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.03, type: "spring", stiffness: 100 }}
                    className="group hover:bg-muted/20 transition-all border-b border-border/30"
                  >
                    <TableCell className="text-sm text-muted-foreground font-medium">
                      <div className="flex items-center gap-2">
                        <Clock className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                        {entry.timestamp}
                      </div>
                    </TableCell>
                    <TableCell className="text-sm font-semibold text-foreground">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-xs font-bold text-primary-foreground">
                          {entry.user.split(' ').map(n => n[0]).join('')}
                        </div>
                        {entry.user}
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Laptop className="h-3.5 w-3.5 opacity-50" />
                        {entry.device}
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-3.5 w-3.5 opacity-50" />
                        {entry.location}
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-muted/30">
                        <span className={`text-sm ${getRiskColor(entry.riskScore)}`}>
                          {entry.riskScore}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-center">{getDecisionBadge(entry.decision)}</TableCell>
                    <TableCell className="text-sm text-muted-foreground max-w-xs">
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
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-muted/30 mb-4">
                <FileText className="h-10 w-10 text-muted-foreground" strokeWidth={1.5} />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">No entries found</h3>
              <p className="text-sm text-muted-foreground">
                No audit log entries match the selected filter.
              </p>
            </motion.div>
          )}

          {/* Footer */}
          <div className="flex items-center justify-between mt-6 pt-4 border-t border-border/50">
            <p className="text-sm text-muted-foreground font-medium">
              Showing <span className="font-bold text-foreground">{filteredLog.length}</span> of{' '}
              <span className="font-bold text-foreground">{auditLog.length}</span> access attempt{auditLog.length !== 1 ? 's' : ''}
            </p>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
              <span className="text-xs text-muted-foreground font-medium">Live Updates Active</span>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};
