import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Shield, Loader2, CheckCircle, AlertTriangle, XCircle } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

type DecisionType = 'GRANTED' | 'CHALLENGE' | 'BLOCKED' | null;

const DEMO_ACCOUNTS = [
  { 
    email: 'alice@company.com', 
    name: 'Alice - Trusted Employee', 
    scenario: 'Scenario 1',
    deviceFingerprint: 'device_alice_trusted_2024',
  },
  { 
    email: 'bob@company.com', 
    name: 'Bob - New Device', 
    scenario: 'Scenario 2',
    deviceFingerprint: 'device_bob_new_unknown',
  },
  { 
    email: 'carol@company.com', 
    name: 'Carol - Impossible Travel', 
    scenario: 'Scenario 3',
    deviceFingerprint: 'device_carol_trusted_2024',
  },
  { 
    email: 'david@company.com', 
    name: 'David - Compromised Device', 
    scenario: 'Scenario 4',
    deviceFingerprint: 'device_david_compromised',
  },
];

export default function Login() {
  const [selectedEmail, setSelectedEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [decision, setDecision] = useState<DecisionType>(null);
  const [message, setMessage] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedEmail) {
      setDecision('BLOCKED');
      setMessage('Please select a demo account.');
      return;
    }
    
    setLoading(true);
    setDecision(null);
    setMessage('');

    try {
      const email = selectedEmail;
      const password = 'demo'; // All demo accounts use this password
      
      // Get device fingerprint for selected account (consistent for demo)
      const selectedAccount = DEMO_ACCOUNTS.find(acc => acc.email === selectedEmail);
      const deviceFingerprint = selectedAccount?.deviceFingerprint || `device_unknown_${Date.now()}`;
      const userAgent = navigator.userAgent;
      
      // Get user's IP address
      let userIp = '0.0.0.0';
      try {
        const ipResponse = await fetch('https://api.ipify.org?format=json');
        const ipData = await ipResponse.json();
        userIp = ipData.ip;
      } catch (error) {
        console.error('Failed to get IP:', error);
        // Use fallback IP if service fails
        userIp = '197.210.76.45'; // Lagos, Nigeria (demo fallback)
      }

      // Call Supabase Edge Function
      const edgeFunctionUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/check-access`;
      
      const response = await fetch(edgeFunctionUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`
        },
        body: JSON.stringify({
          email,
          password,
          ip: userIp,
          userAgent,
          deviceFingerprint
        })
      });

      const data = await response.json();
      
      console.log('🔐 Login response received:', {
        email,
        decision: data.decision,
        riskScore: data.riskScore,
        timestamp: new Date().toISOString()
      });
      
      setDecision(data.decision);
      setMessage(data.reason || 'Security analysis completed.');
      
      console.log('✅ Login attempt recorded - Dashboard should update in real-time');
    } catch (error) {
      console.error('❌ Login error:', error);
      setDecision('BLOCKED');
      setMessage('An error occurred during security analysis. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getDecisionIcon = () => {
    switch (decision) {
      case 'GRANTED':
        return <CheckCircle className="h-12 w-12 text-green-500" />;
      case 'CHALLENGE':
        return <AlertTriangle className="h-12 w-12 text-yellow-500" />;
      case 'BLOCKED':
        return <XCircle className="h-12 w-12 text-red-500" />;
      default:
        return null;
    }
  };

  const getDecisionColor = () => {
    switch (decision) {
      case 'GRANTED':
        return 'border-green-500 bg-green-50 dark:bg-green-950';
      case 'CHALLENGE':
        return 'border-yellow-500 bg-yellow-50 dark:bg-yellow-950';
      case 'BLOCKED':
        return 'border-red-500 bg-red-50 dark:bg-red-950';
      default:
        return '';
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="flex justify-center mb-4">
            <div className="relative">
              <Shield className="h-16 w-16 text-blue-500" />
              <div className="absolute inset-0 bg-blue-500/20 blur-xl rounded-full" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-white">TRUST-LOCK</h1>
          <p className="text-slate-400">Zero Trust Security Gateway</p>
        </div>

        {/* Login Form */}
        <Card className="border-slate-700 bg-slate-800/50 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-white">Employee Login</CardTitle>
            <CardDescription className="text-slate-400">
              Enter your credentials to access the system
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="account" className="text-white">Select Demo Account</Label>
                <Select value={selectedEmail} onValueChange={setSelectedEmail}>
                  <SelectTrigger className="bg-slate-900 border-slate-600 text-white">
                    <SelectValue placeholder="Choose a scenario..." />
                  </SelectTrigger>
                  <SelectContent>
                    {DEMO_ACCOUNTS.map((account) => (
                      <SelectItem key={account.email} value={account.email}>
                        <div className="flex flex-col">
                          <span className="font-medium">{account.scenario}</span>
                          <span className="text-xs text-muted-foreground">{account.name}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-xs text-slate-400">
                  Password is automatically set to: <code className="bg-slate-800 px-1 rounded">demo</code>
                </p>
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={loading || !selectedEmail}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  'Login'
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Decision Result */}
        {decision && (
          <Alert className={`border-2 ${getDecisionColor()}`}>
            <div className="flex items-start gap-4">
              {getDecisionIcon()}
              <div className="flex-1">
                <h3 className={`font-bold text-lg mb-1 ${
                  decision === 'GRANTED' ? 'text-green-800 dark:text-green-200' :
                  decision === 'CHALLENGE' ? 'text-yellow-800 dark:text-yellow-200' :
                  'text-red-800 dark:text-red-200'
                }`}>
                  {decision === 'GRANTED' && 'Access Granted'}
                  {decision === 'CHALLENGE' && 'Additional Verification Required'}
                  {decision === 'BLOCKED' && 'Access Blocked'}
                </h3>
                <AlertDescription className={`text-sm ${
                  decision === 'GRANTED' ? 'text-green-700 dark:text-green-300' :
                  decision === 'CHALLENGE' ? 'text-yellow-700 dark:text-yellow-300' :
                  'text-red-700 dark:text-red-300'
                }`}>
                  {message}
                </AlertDescription>
              </div>
            </div>
          </Alert>
        )}
      </div>
    </div>
  );
}
