import { Download, Activity, FileText, TrendingUp } from 'lucide-react';
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

  // Floating particles for background
  const particles = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    top: Math.random() * 100,
    delay: Math.random() * 5,
    duration: 3 + Math.random() * 2,
  }));

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
    { id: 'demo', label: 'Live Monitor', icon: Activity },
    { id: 'threat', label: 'Threat Overview', icon: TrendingUp },
    { id: 'audit', label: 'Audit Logs', icon: FileText },
  ];

  return (
    <nav className="relative bg-gradient-to-br from-[#0B0F1C] via-[#050810] to-[#000000] border-b border-white/10 shadow-xl sticky top-0 z-40 overflow-hidden">
      {/* Background Particles */}
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
            y: [0, -30, 0],
            x: [0, 15, 0],
            opacity: [0, 0.4, 0],
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

      <div className="relative container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo Only */}
          <div className="flex items-center">
            <motion.div
              className="relative"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <div className="absolute inset-0 bg-[#F8C537]/20 rounded-full blur-lg" />
              <img
                src="/icon.png"
                alt="TRUST-LOCK"
                className="relative h-12 w-auto"
              />
            </motion.div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                
                return (
                  <motion.button
                    key={tab.id}
                    onClick={() => onTabChange(tab.id)}
                    className={`relative flex flex-col items-center gap-2 px-5 py-2.5 text-sm font-medium transition-all ${
                      isActive
                        ? 'text-white'
                        : 'text-gray-400 hover:text-white'
                    }`}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <div className="flex items-center gap-2">
                      <Icon className="h-4 w-4" strokeWidth={2} />
                      <span className="font-semibold">
                        {tab.label}
                      </span>
                    </div>
                    {isActive && (
                      <motion.div
                        layoutId="activeTabIndicator"
                        className="absolute -bottom-2 left-0 right-0 h-0.5 bg-gradient-to-r from-[#3B82F6] via-[#F8C537] to-[#3B82F6] rounded-full"
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}
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
                  className="bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 text-white font-semibold transition-all"
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
