import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Shield, Loader2, CheckCircle, AlertTriangle, XCircle, Lock, User, Mail, Phone } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { motion, AnimatePresence } from 'framer-motion';

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
        return <CheckCircle className="h-12 w-12 text-green-500" strokeWidth={2.5} />;
      case 'CHALLENGE':
        return <AlertTriangle className="h-12 w-12 text-yellow-500" strokeWidth={2.5} />;
      case 'BLOCKED':
        return <XCircle className="h-12 w-12 text-red-500" strokeWidth={2.5} />;
      default:
        return null;
    }
  };

  const getDecisionColor = () => {
    switch (decision) {
      case 'GRANTED':
        return 'border-green-500/30 bg-green-500/5';
      case 'CHALLENGE':
        return 'border-yellow-500/30 bg-yellow-500/5';
      case 'BLOCKED':
        return 'border-red-500/30 bg-red-500/5';
      default:
        return '';
    }
  };

  const isImpossibleTravel = () => {
    return decision === 'BLOCKED' && 
           (message.toLowerCase().includes('impossible travel') || 
            message.toLowerCase().includes('lagos'));
  };

  const shouldShowAdminContact = () => {
    return decision === 'BLOCKED' || decision === 'CHALLENGE';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0B0F1C] via-[#050810] to-[#000000] relative overflow-hidden">
      {/* Animated Grid Background */}
      <div className="absolute inset-0 opacity-10">
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(248, 197, 55, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(248, 197, 55, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
          animate={{
            backgroundPosition: ['0px 0px', '60px 60px'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      </div>

      {/* Data Packet Particles */}
      {Array.from({ length: 30 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        delay: Math.random() * 5,
        duration: 3 + Math.random() * 2,
      })).map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute w-1 h-1 rounded-full bg-[#F8C537]"
          style={{
            left: `${particle.left}%`,
            top: `${particle.top}%`,
            boxShadow: '0 0 8px rgba(248, 197, 55, 0.6)',
          }}
          animate={{
            y: [0, -100, 0],
            x: [0, 30, 0],
            opacity: [0, 0.6, 0],
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

      {/* Network Connection Lines */}
      <svg className="absolute inset-0 w-full h-full opacity-20" style={{ zIndex: 1 }}>
        {[0, 1, 2, 3].map((i) => (
          <motion.line
            key={i}
            x1={`${20 + i * 20}%`}
            y1="0%"
            x2={`${30 + i * 20}%`}
            y2="100%"
            stroke="url(#lineGradientLogin)"
            strokeWidth="1"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{
              pathLength: [0, 1, 0],
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.5,
              ease: 'easeInOut',
            }}
          />
        ))}
        <defs>
          <linearGradient id="lineGradientLogin" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#F8C537" stopOpacity="0" />
            <stop offset="50%" stopColor="#F8C537" stopOpacity="1" />
            <stop offset="100%" stopColor="#F8C537" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>

      <div className="relative z-10 container mx-auto px-6 py-12 min-h-screen flex flex-col items-center justify-center">
        {/* Header with Logo */}
        <motion.div 
          className="text-center space-y-3 mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-[#F8C537] to-[#3B82F6] bg-clip-text text-transparent">
            TRUST-LOCK
          </h1>
          <p className="text-gray-400 font-medium">Zero Trust Security Gateway</p>
        </motion.div>

        {/* Two Column Layout */}
        <div className="w-full max-w-6xl">
          <div className={`grid gap-6 transition-all duration-500 ${decision ? 'lg:grid-cols-2' : 'lg:grid-cols-1 max-w-md mx-auto'}`}>
            {/* Login Form - Left Side */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className={decision ? '' : 'w-full'}
            >
              <Card className="bg-black/40 backdrop-blur-md border-[#3B82F6]/30 shadow-xl">
                <CardHeader className="space-y-1 pb-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 rounded-lg border border-[#3B82F6]/30">
                      <User className="h-5 w-5 text-[#3B82F6]" strokeWidth={2} />
                    </div>
                    <CardTitle className="text-2xl text-white">Employee Login</CardTitle>
                  </div>
                  <CardDescription className="text-gray-400">
                    Select a demo account to test security scenarios
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleLogin} className="space-y-5">
                    <div className="space-y-3">
                      <Label htmlFor="account" className="text-white font-medium flex items-center gap-2">
                        <Lock className="h-4 w-4 text-[#F8C537]" />
                        Demo Account
                      </Label>
                      <Select value={selectedEmail} onValueChange={setSelectedEmail}>
                        <SelectTrigger className="bg-black/60 border-white/10 text-white hover:border-[#3B82F6]/50 transition-colors">
                          <SelectValue placeholder="Choose a scenario..." />
                        </SelectTrigger>
                        <SelectContent className="bg-black/95 border-white/10 backdrop-blur-xl">
                          {DEMO_ACCOUNTS.map((account) => (
                            <SelectItem key={account.email} value={account.email} className="text-white hover:bg-white/10">
                              <div className="flex flex-col py-1">
                                <span className="font-semibold text-white">{account.scenario}</span>
                                <span className="text-xs text-gray-400">{account.name}</span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <div className="flex items-center gap-2 bg-[#F8C537]/5 border border-[#F8C537]/20 rounded-lg px-3 py-2">
                        <Shield className="h-4 w-4 text-[#F8C537] flex-shrink-0" />
                        <p className="text-xs text-gray-400">
                          Password: <code className="bg-black/60 px-2 py-0.5 rounded text-[#F8C537] font-mono">demo</code>
                        </p>
                      </div>
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 text-white font-semibold py-6 text-base transition-all"
                      disabled={loading || !selectedEmail}
                    >
                      {loading ? (
                        <>
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                          Verifying...
                        </>
                      ) : (
                        <>
                          <Lock className="mr-2 h-5 w-5" />
                          Login
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            {/* Decision Result - Right Side */}
            <AnimatePresence mode="wait">
              {decision && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.5, type: "spring", stiffness: 200 }}
                >
                  <Card className={`bg-black/40 backdrop-blur-md border-2 ${getDecisionColor()} shadow-xl h-full`}>
                    <CardContent className="p-6 flex flex-col h-full">
                      <div className="flex items-start gap-4 mb-4">
                        <motion.div
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                        >
                          {getDecisionIcon()}
                        </motion.div>
                        
                        <div className="flex-1 space-y-3">
                          <motion.h3 
                            className={`font-bold text-2xl ${
                              decision === 'GRANTED' ? 'text-green-500' :
                              decision === 'CHALLENGE' ? 'text-yellow-500' :
                              'text-red-500'
                            }`}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 }}
                          >
                            {decision === 'GRANTED' && 'Access Granted'}
                            {decision === 'CHALLENGE' && 'Additional Verification'}
                            {decision === 'BLOCKED' && 'Access Blocked'}
                          </motion.h3>
                          
                          <motion.div
                            className="text-sm text-white leading-relaxed"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                          >
                            {message}
                          </motion.div>

                          {/* Contact Administrator for Blocked/Challenge */}
                          {shouldShowAdminContact() && (
                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.6 }}
                              className={`mt-4 pt-4 border-t ${
                                decision === 'BLOCKED' ? 'border-red-500/20' : 'border-yellow-500/20'
                              }`}
                            >
                              <p className={`text-xs font-semibold mb-2 ${
                                decision === 'BLOCKED' ? 'text-red-400' : 'text-yellow-400'
                              }`}>
                                Contact Administrator:
                              </p>
                              <div className="space-y-1">
                                <div className="flex items-center gap-2 text-xs text-gray-300">
                                  <Mail className="h-3 w-3 text-[#F8C537]" />
                                  <span>admin@trustlock.com</span>
                                </div>
                                <div className="flex items-center gap-2 text-xs text-gray-300">
                                  <Phone className="h-3 w-3 text-[#F8C537]" />
                                  <span>+234 800 123 4567</span>
                                </div>
                              </div>
                            </motion.div>
                          )}

                          {/* Status Badge */}
                          <motion.div
                            className="pt-3 mt-3 border-t border-white/10"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                          >
                            <div className="flex items-center justify-between text-xs">
                              <span className="text-gray-400 font-medium">Security Status</span>
                              <span className={`font-semibold px-3 py-1 rounded-full ${
                                decision === 'GRANTED' ? 'bg-green-500/20 text-green-500' :
                                decision === 'CHALLENGE' ? 'bg-yellow-500/20 text-yellow-500' :
                                'bg-red-500/20 text-red-500'
                              }`}>
                                {decision}
                              </span>
                            </div>
                          </motion.div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
