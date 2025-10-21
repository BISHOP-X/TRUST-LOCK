import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Shield, Loader2, CheckCircle, AlertTriangle, XCircle } from 'lucide-react';

type DecisionType = 'GRANTED' | 'CHALLENGE' | 'BLOCKED' | null;

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [decision, setDecision] = useState<DecisionType>(null);
  const [message, setMessage] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setDecision(null);
    setMessage('');

    try {
      // Get device fingerprint (simple random string for demo)
      const deviceFingerprint = `device_${Math.random().toString(36).substring(7)}`;
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
      
      setDecision(data.decision);
      setMessage(data.reason || 'Security analysis completed.');
    } catch (error) {
      console.error('Login error:', error);
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
                <Label htmlFor="email" className="text-white">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={loading}
                  className="bg-slate-900 border-slate-600 text-white placeholder:text-slate-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-white">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={loading}
                  className="bg-slate-900 border-slate-600 text-white placeholder:text-slate-500"
                />
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={loading}
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
                <h3 className="font-bold text-lg mb-1">
                  {decision === 'GRANTED' && 'Access Granted'}
                  {decision === 'CHALLENGE' && 'Additional Verification Required'}
                  {decision === 'BLOCKED' && 'Access Blocked'}
                </h3>
                <AlertDescription className="text-sm">
                  {message}
                </AlertDescription>
              </div>
            </div>
          </Alert>
        )}

        {/* Demo Users Hint (for testing) */}
        {import.meta.env.VITE_DEMO_MODE === 'true' && (
          <Card className="border-slate-700 bg-slate-800/30 backdrop-blur">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-slate-300">Demo Accounts</CardTitle>
            </CardHeader>
            <CardContent className="text-xs text-slate-400 space-y-1">
              <p>• alice@company.com - Trusted employee</p>
              <p>• bob@company.com - New device</p>
              <p>• carol@company.com - Impossible travel</p>
              <p>• david@company.com - Compromised device</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
