import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  user: string;
  device: string;
  location: string;
  riskScore: number;
  decision: 'GRANTED' | 'CHALLENGE' | 'BLOCKED';
  reason: string;
}

export interface RiskFactor {
  name: string;
  status: 'success' | 'warning' | 'danger';
  points: number;
  label: string;
}

export interface Scenario {
  name: string;
  riskScore: number;
  decision: 'GRANTED' | 'CHALLENGE' | 'BLOCKED';
  reason: string;
  factors: RiskFactor[];
}

interface DashboardContextType {
  currentScenario: number;
  riskScore: number;
  decision: 'GRANTED' | 'CHALLENGE' | 'BLOCKED';
  reason: string;
  riskFactors: RiskFactor[];
  auditLog: AuditLogEntry[];
  setScenario: (scenarioIndex: number) => void;
  resetScenario: () => void;
}

const scenarios: Scenario[] = [
  {
    name: 'Trusted Employee',
    riskScore: 15,
    decision: 'GRANTED',
    reason: 'All security checks passed. User authenticated from known device and trusted location.',
    factors: [
      { name: 'Identity Verified', status: 'success', points: 0, label: '✅ MFA Passed' },
      { name: 'Device Status', status: 'success', points: 5, label: '✅ Known Device' },
      { name: 'Location', status: 'success', points: 0, label: '✅ Lagos, Nigeria' },
      { name: 'Behavior', status: 'success', points: 10, label: '✅ Normal Activity' },
    ],
  },
  {
    name: 'New Device',
    riskScore: 25,
    decision: 'CHALLENGE',
    reason: 'New device detected. Multi-factor authentication required before granting access.',
    factors: [
      { name: 'Identity Verified', status: 'success', points: 0, label: '✅ Password Valid' },
      { name: 'Device Status', status: 'warning', points: 20, label: '⚠️ New Device' },
      { name: 'Location', status: 'success', points: 0, label: '✅ Lagos, Nigeria' },
      { name: 'Behavior', status: 'success', points: 5, label: '✅ Normal Hours' },
    ],
  },
  {
    name: 'Impossible Travel',
    riskScore: 70,
    decision: 'BLOCKED',
    reason: 'Impossible travel detected: User logged in from Lagos 5 minutes ago, now attempting access from London.',
    factors: [
      { name: 'Identity Verified', status: 'warning', points: 10, label: '⚠️ Credential Reuse' },
      { name: 'Device Status', status: 'success', points: 5, label: '✅ Known Device' },
      { name: 'Location', status: 'danger', points: 50, label: '🚨 London, UK' },
      { name: 'Behavior', status: 'warning', points: 5, label: '⚠️ Unusual Time' },
    ],
  },
  {
    name: 'Compromised Device',
    riskScore: 85,
    decision: 'BLOCKED',
    reason: 'Critical security issues detected: Disk encryption disabled, firewall off, outdated security patches.',
    factors: [
      { name: 'Identity Verified', status: 'success', points: 0, label: '✅ MFA Passed' },
      { name: 'Device Status', status: 'danger', points: 50, label: '🚨 Security Failed' },
      { name: 'Location', status: 'warning', points: 20, label: '⚠️ Public WiFi' },
      { name: 'Behavior', status: 'warning', points: 15, label: '⚠️ Unusual Access' },
    ],
  },
];

const initialAuditLog: AuditLogEntry[] = [
  {
    id: '1',
    timestamp: new Date(Date.now() - 3600000).toLocaleString(),
    user: 'john.doe@wemabank.com',
    device: 'MacBook Pro (Corporate)',
    location: 'Lagos, Nigeria',
    riskScore: 12,
    decision: 'GRANTED',
    reason: 'Trusted device and location',
  },
  {
    id: '2',
    timestamp: new Date(Date.now() - 7200000).toLocaleString(),
    user: 'jane.smith@wemabank.com',
    device: 'iPhone 14 (Personal)',
    location: 'Lagos, Nigeria',
    riskScore: 28,
    decision: 'CHALLENGE',
    reason: 'Personal device - MFA required',
  },
  {
    id: '3',
    timestamp: new Date(Date.now() - 10800000).toLocaleString(),
    user: 'admin@wemabank.com',
    device: 'Windows PC (Unknown)',
    location: 'Abuja, Nigeria',
    riskScore: 45,
    decision: 'CHALLENGE',
    reason: 'New location detected',
  },
  {
    id: '4',
    timestamp: new Date(Date.now() - 14400000).toLocaleString(),
    user: 'finance@wemabank.com',
    device: 'Android Phone',
    location: 'Port Harcourt, Nigeria',
    riskScore: 8,
    decision: 'GRANTED',
    reason: 'All checks passed',
  },
  {
    id: '5',
    timestamp: new Date(Date.now() - 18000000).toLocaleString(),
    user: 'security@wemabank.com',
    device: 'iPad Pro (Corporate)',
    location: 'Lagos, Nigeria',
    riskScore: 5,
    decision: 'GRANTED',
    reason: 'Trusted corporate device',
  },
];

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export const DashboardProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentScenario, setCurrentScenario] = useState(0);
  const [auditLog, setAuditLog] = useState<AuditLogEntry[]>(initialAuditLog);

  const scenario = scenarios[currentScenario];

  const setScenario = (scenarioIndex: number) => {
    setCurrentScenario(scenarioIndex);
    
    // Add to audit log
    const newEntry: AuditLogEntry = {
      id: Date.now().toString(),
      timestamp: new Date().toLocaleString(),
      user: `demo.user@wemabank.com`,
      device: scenarioIndex === 1 ? 'Unknown Device' : scenarioIndex === 3 ? 'Compromised PC' : 'MacBook Pro',
      location: scenarioIndex === 2 ? 'London, UK' : 'Lagos, Nigeria',
      riskScore: scenarios[scenarioIndex].riskScore,
      decision: scenarios[scenarioIndex].decision,
      reason: scenarios[scenarioIndex].reason,
    };
    
    setAuditLog(prev => [newEntry, ...prev]);
  };

  const resetScenario = () => {
    setCurrentScenario(0);
  };

  return (
    <DashboardContext.Provider
      value={{
        currentScenario,
        riskScore: scenario.riskScore,
        decision: scenario.decision,
        reason: scenario.reason,
        riskFactors: scenario.factors,
        auditLog,
        setScenario,
        resetScenario,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error('useDashboard must be used within DashboardProvider');
  }
  return context;
};
