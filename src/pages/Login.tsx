import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Shield, Loader2, CheckCircle, AlertTriangle, XCircle, Lock, User } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { motion } from 'framer-motion';

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
      
      // Carol's scenario: Force Lagos IP to trigger impossible travel from London
      if (email === 'carol@company.com') {
        userIp = '197.210.76.45'; // Lagos, Nigeria (impossible travel from London)
      } else {
        try {
          const ipResponse = await fetch('https://api.ipify.org?format=json');
          const ipData = await ipResponse.json();
          userIp = ipData.ip;
        } catch (error) {
          console.error('Failed to get IP:', error);
          // Use fallback IP if service fails
          userIp = '197.210.76.45'; // Lagos, Nigeria (demo fallback)
        }
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
        return (
          <div className="relative">
            <div className="absolute inset-0 bg-success/20 rounded-full blur-lg" />
            <CheckCircle className="relative h-10 w-10 text-success" strokeWidth={2} />
          </div>
        );
      case 'CHALLENGE':
        return (
          <div className="relative">
            <div className="absolute inset-0 bg-warning/20 rounded-full blur-lg" />
            <AlertTriangle className="relative h-10 w-10 text-warning" strokeWidth={2} />
          </div>
        );
      case 'BLOCKED':
        return (
          <div className="relative">
            <div className="absolute inset-0 bg-destructive/20 rounded-full blur-lg" />
            <XCircle className="relative h-10 w-10 text-destructive" strokeWidth={2} />
          </div>
        );
      default:
        return null;
    }
  };

  const getDecisionColor = () => {
    switch (decision) {
      case 'GRANTED':
        return 'border-success/50 bg-success/5';
      case 'CHALLENGE':
        return 'border-warning/50 bg-warning/5';
      case 'BLOCKED':
        return 'border-destructive/50 bg-destructive/5';
      default:
        return '';
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-primary/5 p-4 relative overflow-hidden">
      {/* Decorative background orbs */}
      <motion.div
        className="absolute top-20 right-20 w-96 h-96 bg-accent/5 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute bottom-20 left-20 w-80 h-80 bg-primary/5 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Subtle background grid */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(hsl(220 90% 56% / 0.5) 1px, transparent 1px), linear-gradient(90deg, hsl(220 90% 56% / 0.5) 1px, transparent 1px)',
          backgroundSize: '80px 80px'
        }} />
      </div>

      <div className="w-full max-w-md space-y-6 relative z-10">
        {/* Header with Logo */}
        <motion.div 
          className="text-center space-y-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex justify-center mb-4">
            <motion.div
              className="relative"
              animate={{ 
                scale: [1, 1.05, 1]
              }}
              transition={{ 
                duration: 4, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <motion.div
                className="absolute inset-0 blur-2xl rounded-full"
                style={{ background: 'hsl(45 100% 51% / 0.15)' }}
                animate={{ 
                  scale: [1, 1.3, 1],
                  opacity: [0.3, 0.6, 0.3]
                }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <img
                src="/logo-no-bg.png"
                alt="TRUSTLOCK Logo"
                className="relative z-10 w-24 h-24 drop-shadow-2xl"
              />
            </motion.div>
          </div>
          <h1 className="text-4xl font-black bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            TRUSTLOCK
          </h1>
          <p className="text-muted-foreground font-medium">Zero Trust Security Gateway</p>
        </motion.div>

        {/* Login Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="border-border/50 bg-card/40 backdrop-blur-md shadow-xl">
            <CardHeader className="space-y-1 pb-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="relative">
                  <div className="absolute inset-0 bg-primary/20 rounded-lg blur-md" />
                  <User className="relative h-6 w-6 text-primary" strokeWidth={2} />
                </div>
                <CardTitle className="text-2xl text-foreground">Employee Login</CardTitle>
              </div>
              <CardDescription className="text-muted-foreground">
                Enter your credentials to access the system
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-5">
                <div className="space-y-3">
                  <Label htmlFor="account" className="text-foreground font-medium flex items-center gap-2">
                    <Lock className="h-4 w-4 text-accent" />
                    Select Demo Account
                  </Label>
                  <Select value={selectedEmail} onValueChange={setSelectedEmail}>
                    <SelectTrigger className="bg-background/60 border-border/50 text-foreground hover:border-primary/50 transition-colors">
                      <SelectValue placeholder="Choose a scenario..." />
                    </SelectTrigger>
                    <SelectContent className="bg-card border-border/50">
                      {DEMO_ACCOUNTS.map((account) => (
                        <SelectItem key={account.email} value={account.email}>
                          <div className="flex flex-col py-1">
                            <span className="font-semibold text-foreground">{account.scenario}</span>
                            <span className="text-xs text-muted-foreground">{account.name}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <div className="flex items-center gap-2 bg-accent/5 border border-accent/20 rounded-lg px-3 py-2">
                    <Shield className="h-4 w-4 text-accent flex-shrink-0" />
                    <p className="text-xs text-muted-foreground">
                      Password is automatically set to: <code className="bg-background/60 px-2 py-0.5 rounded text-accent font-mono">demo</code>
                    </p>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity text-primary-foreground font-semibold py-6 text-base shadow-lg"
                  disabled={loading || !selectedEmail}
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Verifying Security...
                    </>
                  ) : (
                    <>
                      <Lock className="mr-2 h-5 w-5" />
                      Secure Login
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>

        {/* Decision Result */}
        {decision && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.5, type: "spring", stiffness: 200 }}
          >
            <div className={`relative overflow-hidden rounded-2xl border-2 ${getDecisionColor()} backdrop-blur-md shadow-2xl`}>
              {/* Animated background gradient */}
              <motion.div
                className={`absolute inset-0 opacity-10 ${
                  decision === 'GRANTED' ? 'bg-gradient-to-br from-success to-success/50' :
                  decision === 'CHALLENGE' ? 'bg-gradient-to-br from-warning to-warning/50' :
                  'bg-gradient-to-br from-destructive to-destructive/50'
                }`}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.05, 0.15, 0.05]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />

              <div className="relative p-6">
                <div className="flex items-start gap-5">
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  >
                    {getDecisionIcon()}
                  </motion.div>
                  
                  <div className="flex-1 space-y-2">
                    <motion.h3 
                      className={`font-bold text-xl flex items-center gap-2 ${
                        decision === 'GRANTED' ? 'text-success' :
                        decision === 'CHALLENGE' ? 'text-warning' :
                        'text-destructive'
                      }`}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      {decision === 'GRANTED' && (
                        <>
                          <span>Access Granted</span>
                          <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 1, repeat: Infinity }}
                          >
                            ✓
                          </motion.div>
                        </>
                      )}
                      {decision === 'CHALLENGE' && 'Additional Verification Required'}
                      {decision === 'BLOCKED' && (
                        <>
                          <span>Access Blocked</span>
                          <Shield className="h-5 w-5" />
                        </>
                      )}
                    </motion.h3>
                    
                    <motion.div
                      className={`text-sm leading-relaxed ${
                        decision === 'GRANTED' ? 'text-success/90' :
                        decision === 'CHALLENGE' ? 'text-warning/90' :
                        'text-destructive/90'
                      }`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4 }}
                    >
                      {message}
                    </motion.div>

                    {/* Additional info bar */}
                    <motion.div
                      className={`pt-3 mt-3 border-t ${
                        decision === 'GRANTED' ? 'border-success/20' :
                        decision === 'CHALLENGE' ? 'border-warning/20' :
                        'border-destructive/20'
                      }`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                    >
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-muted-foreground font-medium">Security Status</span>
                        <span className={`font-semibold px-2 py-1 rounded-full ${
                          decision === 'GRANTED' ? 'bg-success/10 text-success' :
                          decision === 'CHALLENGE' ? 'bg-warning/10 text-warning' :
                          'bg-destructive/10 text-destructive'
                        }`}>
                          {decision}
                        </span>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
