import { useState } from 'react';
import { DashboardProvider } from '@/contexts/DashboardContext';
import { PresentationProvider } from '@/contexts/PresentationContext';
import { PresentationWrapper } from '@/components/presentation/PresentationWrapper';
import { NavigationBar } from '@/components/dashboard/NavigationBar';
import { OldSecurityPanel } from '@/components/dashboard/OldSecurityPanel';
import { NewSecurityPanel } from '@/components/dashboard/NewSecurityPanel';
import { ScenarioController } from '@/components/dashboard/ScenarioController';
import { RiskDetailsPanel } from '@/components/dashboard/RiskDetailsPanel';
import { AuditLogView } from '@/components/dashboard/AuditLogView';
import { SystemInfoView } from '@/components/dashboard/SystemInfoView';

const Index = () => {
  const [activeTab, setActiveTab] = useState('demo');

  return (
    <PresentationProvider>
      <DashboardProvider>
        <PresentationWrapper>
          <div className="min-h-screen bg-background">
            <NavigationBar activeTab={activeTab} onTabChange={setActiveTab} />
            
            {activeTab === 'demo' && (
              <div className="container mx-auto px-6 py-8">
                <div className="grid lg:grid-cols-2 gap-6 mb-8" style={{ minHeight: '500px' }}>
                  <OldSecurityPanel />
                  <NewSecurityPanel />
                </div>
                
                <RiskDetailsPanel />
                <ScenarioController />
              </div>
            )}

            {activeTab === 'audit' && <AuditLogView />}
            {activeTab === 'info' && <SystemInfoView />}
          </div>
        </PresentationWrapper>
      </DashboardProvider>
    </PresentationProvider>
  );
};

export default Index;
