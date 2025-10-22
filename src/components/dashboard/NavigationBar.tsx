import { Shield, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useDashboard } from '@/contexts/DashboardContext';

interface NavigationBarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const NavigationBar = ({ activeTab, onTabChange }: NavigationBarProps) => {
  const { toast } = useToast();
  const { auditLog } = useDashboard();

  const handleExport = () => {
    try {
      // Convert audit log to CSV
      const headers = ['Timestamp', 'User', 'Device', 'Location', 'Risk Score', 'Decision', 'Reason'];
      const csvRows = [
        headers.join(','),
        ...auditLog.map(entry => [
          `"${entry.timestamp}"`,
          `"${entry.user}"`,
          `"${entry.device}"`,
          `"${entry.location}"`,
          entry.riskScore,
          entry.decision,
          `"${entry.reason.replace(/"/g, '""')}"` // Escape quotes
        ].join(','))
      ];
      
      const csvContent = csvRows.join('\n');
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `audit-log-${new Date().toISOString().split('T')[0]}.csv`;
      link.click();
      URL.revokeObjectURL(url);

      toast({
        title: '✅ CSV Exported Successfully',
        description: `Downloaded ${auditLog.length} audit log entries.`,
      });
    } catch (error) {
      toast({
        title: '❌ Export Failed',
        description: 'Could not export audit log. Please try again.',
        variant: 'destructive',
      });
    }
  };

  return (
    <nav className="bg-card/60 backdrop-blur-glass border-b border-border shadow-card">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-primary p-2 rounded-lg shadow-glow">
              <Shield className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">Smart Access Gateway</h1>
              <p className="text-xs text-muted-foreground">Wema Bank Security Demo</p>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={() => onTabChange('demo')}
              className={`text-sm font-medium transition-colors px-4 py-2 rounded-lg ${
                activeTab === 'demo'
                  ? 'bg-primary text-primary-foreground shadow-glow'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Live Demo
            </button>
            <button
              onClick={() => onTabChange('audit')}
              className={`text-sm font-medium transition-colors px-4 py-2 rounded-lg ${
                activeTab === 'audit'
                  ? 'bg-primary text-primary-foreground shadow-glow'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Audit Log
            </button>
            <button
              onClick={() => onTabChange('info')}
              className={`text-sm font-medium transition-colors px-4 py-2 rounded-lg ${
                activeTab === 'info'
                  ? 'bg-primary text-primary-foreground shadow-glow'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              System Info
            </button>

            {activeTab === 'audit' && (
              <Button
                onClick={handleExport}
                size="sm"
                className="bg-gradient-primary hover:opacity-90 shadow-glow"
              >
                <Download className="mr-2 h-4 w-4" />
                Export CSV
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
