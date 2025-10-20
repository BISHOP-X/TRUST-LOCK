import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useDashboard } from '@/contexts/DashboardContext';

export const AuditLogView = () => {
  const { auditLog } = useDashboard();

  const getDecisionBadge = (decision: string) => {
    switch (decision) {
      case 'GRANTED':
        return <Badge className="bg-success/20 text-success border-success/50">Granted</Badge>;
      case 'CHALLENGE':
        return <Badge className="bg-warning/20 text-warning border-warning/50">Challenge</Badge>;
      case 'BLOCKED':
        return <Badge className="bg-destructive/20 text-destructive border-destructive/50">Blocked</Badge>;
    }
  };

  const getRiskColor = (score: number) => {
    if (score <= 20) return 'text-success';
    if (score <= 49) return 'text-warning';
    return 'text-destructive';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-6 py-8"
    >
      <Card className="bg-card/60 backdrop-blur-glass border-border shadow-card">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-foreground mb-6">Access Audit Log</h2>
          
          <div className="rounded-lg border border-border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="font-semibold">Timestamp</TableHead>
                  <TableHead className="font-semibold">User</TableHead>
                  <TableHead className="font-semibold">Device</TableHead>
                  <TableHead className="font-semibold">Location</TableHead>
                  <TableHead className="font-semibold text-center">Risk Score</TableHead>
                  <TableHead className="font-semibold text-center">Decision</TableHead>
                  <TableHead className="font-semibold">Reason</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {auditLog.map((entry) => (
                  <TableRow key={entry.id} className="hover:bg-muted/30 transition-colors">
                    <TableCell className="text-sm text-muted-foreground">
                      {entry.timestamp}
                    </TableCell>
                    <TableCell className="text-sm font-medium">{entry.user}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{entry.device}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{entry.location}</TableCell>
                    <TableCell className="text-center">
                      <span className={`text-sm font-bold ${getRiskColor(entry.riskScore)}`}>
                        {entry.riskScore}
                      </span>
                    </TableCell>
                    <TableCell className="text-center">{getDecisionBadge(entry.decision)}</TableCell>
                    <TableCell className="text-sm text-muted-foreground max-w-xs truncate">
                      {entry.reason}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <p className="text-sm text-muted-foreground mt-4">
            Showing {auditLog.length} access attempts. Click "Export CSV" to download full log.
          </p>
        </div>
      </Card>
    </motion.div>
  );
};
