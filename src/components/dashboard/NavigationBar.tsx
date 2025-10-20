import { Shield, Download, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { usePresentation } from '@/contexts/PresentationContext';

interface NavigationBarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const NavigationBar = ({ activeTab, onTabChange }: NavigationBarProps) => {
  const { toast } = useToast();
  const { isPresentationMode, startPresentation } = usePresentation();

  const handleStartPresentation = () => {
    startPresentation();
    toast({
      title: '🎬 Presentation Mode Started',
      description: 'Use arrow keys or Enter to navigate. Press Escape to exit.',
    });
  };

  const handleExport = () => {
    toast({
      title: '✅ CSV Exported Successfully',
      description: 'Audit log has been downloaded to your device.',
    });
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
            {/* Start Presentation Button - Only show when NOT in presentation mode */}
            {!isPresentationMode && (
              <Button
                onClick={handleStartPresentation}
                size="sm"
                className="bg-gradient-primary hover:opacity-90 shadow-glow"
              >
                <Play className="mr-2 h-4 w-4" />
                Start Presentation
              </Button>
            )}

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
