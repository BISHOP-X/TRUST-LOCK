import { Shield, Download, Activity, FileText, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useDashboard } from '@/contexts/DashboardContext';
import { motion } from 'framer-motion';

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
        title: 'CSV Exported Successfully',
        description: `Downloaded ${auditLog.length} audit log entries.`,
      });
    } catch (error) {
      toast({
        title: 'Export Failed',
        description: 'Could not export audit log. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const tabs = [
    { id: 'demo', label: 'Live Demo', icon: Activity },
    { id: 'audit', label: 'Audit Log', icon: FileText },
    { id: 'info', label: 'System Info', icon: Info },
  ];

  return (
    <nav className="bg-card/60 backdrop-blur-md border-b border-border/50 shadow-lg sticky top-0 z-40">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Title */}
          <div className="flex items-center gap-4">
            <motion.div
              className="relative"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <div className="absolute inset-0 bg-accent/10 rounded-xl blur-lg" />
              <div className="relative bg-gradient-to-br from-primary/10 to-accent/10 backdrop-blur-sm p-2 rounded-xl border border-primary/20">
                <img
                  src="/logo-no-bg.png"
                  alt="TRUSTLOCK Logo"
                  className="h-8 w-8"
                />
              </div>
            </motion.div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                TRUSTLOCK
              </h1>
              <p className="text-xs text-muted-foreground font-medium">Wema Bank Security Demo</p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 bg-background/50 backdrop-blur-sm p-1 rounded-xl border border-border/50">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                
                return (
                  <motion.button
                    key={tab.id}
                    onClick={() => onTabChange(tab.id)}
                    className={`relative flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      isActive
                        ? 'text-foreground'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 bg-gradient-to-r from-primary to-accent rounded-lg shadow-lg"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                    <Icon className={`relative h-4 w-4 ${isActive ? 'text-primary-foreground' : ''}`} />
                    <span className={`relative ${isActive ? 'text-primary-foreground' : ''}`}>
                      {tab.label}
                    </span>
                  </motion.button>
                );
              })}
            </div>

            {/* Export Button */}
            {activeTab === 'audit' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
              >
                <Button
                  onClick={handleExport}
                  size="sm"
                  className="bg-gradient-to-r from-primary to-accent hover:opacity-90 shadow-lg text-primary-foreground font-semibold"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Export CSV
                </Button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
