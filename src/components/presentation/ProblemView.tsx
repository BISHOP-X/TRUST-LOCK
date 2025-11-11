import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { AlertTriangle, Lock, FileX, FolderLock, Database, FileCode, Users, FileText, Briefcase, Wifi, Server, Shield, XCircle } from 'lucide-react';

export const ProblemView = () => {
  const [stage, setStage] = useState(0); // 0: login, 1: breach, 2: data loss
  
  // Cycle through animation stages
  useEffect(() => {
    const interval = setInterval(() => {
      setStage((prev) => (prev + 1) % 3);
    }, 4000); // 4 seconds per stage
    
    return () => clearInterval(interval);
  }, []);

  // Floating particles for background
  const particles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    top: Math.random() * 100,
    delay: Math.random() * 5,
    duration: 3 + Math.random() * 2,
  }));

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-[#0B0F1C] via-[#050810] to-[#000000] overflow-hidden">
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
            stroke="url(#lineGradient)"
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
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#F8C537" stopOpacity="0" />
            <stop offset="50%" stopColor="#F8C537" stopOpacity="1" />
            <stop offset="100%" stopColor="#F8C537" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>

      {/* Main Content Container */}
      <div className="relative z-10 h-screen flex items-center px-8 lg:px-16">
        <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* LEFT SIDE - Content */}
          <div className="space-y-8 lg:pr-8 max-w-xl">
            {/* Main Heading */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-6"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                The Problem with{' '}
                <motion.span 
                  className="relative inline-block"
                  style={{
                    background: 'linear-gradient(90deg, #FFFFFF 0%, #3B82F6 25%, #F5C542 50%, #FFFFFF 75%, #3B82F6 100%)',
                    backgroundSize: '200% auto',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                  animate={{
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                  }}
                  transition={{
                    backgroundPosition: {
                      duration: 5,
                      repeat: Infinity,
                      ease: 'linear'
                    }
                  }}
                >
                  Password-Based Access
                </motion.span>
              </h2>

              <p className="text-[#A0A0A0] text-lg leading-relaxed">
                In today's remote-first world, a single compromised VPN password gives hackers 
                complete access to your entire network.
              </p>

              <motion.div
                className="relative p-6 rounded-2xl bg-gradient-to-br from-[#1a1f35] to-[#0f1420] border-2 border-blue-500/50 backdrop-blur-sm"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <motion.div
                  className="absolute inset-0 rounded-2xl border-2 border-blue-400"
                  animate={{
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                />
                
                <div className="relative z-10 space-y-3">
                  <div className="flex items-center gap-3">
                    <AlertTriangle className="w-6 h-6 text-blue-400" />
                    <p className="text-white font-semibold text-lg">
                      One password = Full network access
                    </p>
                  </div>
                  <p className="text-[#E0E0E0] text-sm">
                    Customer data, core systems, admin tools—all exposed. 
                    And the worst part? It's undetectable.
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* RIGHT SIDE - Animation Zone */}
          <div className="relative h-[500px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              {/* Stage 0: VPN Password Being Stolen */}
              {stage === 0 && (
                <motion.div
                  key="stage-0"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.6 }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  {/* MacBook Only */}
                  <div className="relative">
                    <img 
                      src="/mockups/Apple Macbook/Device/Apple-Macbook-Space-Grey.png" 
                      alt="MacBook"
                      className="w-[600px] h-auto"
                    />
                    
                    {/* Content Overlay - Centered Login Page */}
                    <div className="absolute top-[14%] left-[14%] w-[72%] h-[75%] bg-gradient-to-br from-[#0f1420] to-[#0B0F1C] rounded-md flex items-center justify-center overflow-hidden">
                      {/* Centered Login Card */}
                      <div className="w-[80%] max-w-[250px] bg-[#1a1f35]/50 backdrop-blur-sm rounded-lg p-4 border border-blue-500/20">
                        {/* Logo/Header */}
                        <div className="flex flex-col items-center gap-1.5 mb-3">
                          <Shield className="w-6 h-6 text-blue-400" />
                          <h3 className="text-white font-semibold text-[10px]">Corporate VPN</h3>
                          <p className="text-[#A0A0A0] text-[7px] text-center">Secure Access Portal</p>
                        </div>
                        
                        {/* Login Form */}
                        <div className="space-y-2">
                          <div>
                            <label className="text-[#A0A0A0] text-[7px] mb-0.5 block">Email Address</label>
                            <div className="bg-[#0f1420] rounded px-2 py-1.5 text-[#E0E0E0] text-[8px] border border-blue-500/10">
                              john.doe@company.com
                            </div>
                          </div>
                          
                          <div>
                            <label className="text-[#A0A0A0] text-[7px] mb-0.5 flex items-center gap-1">
                              <Lock className="w-2 h-2" />
                              Password
                            </label>
                            <div className="bg-[#0f1420] rounded px-2 py-1.5 relative overflow-visible border border-blue-500/10 h-6">
                              {/* Password dots floating upward */}
                              <div className="flex gap-1 absolute top-1/2 -translate-y-1/2 left-2">
                                {Array.from({ length: 8 }).map((_, i) => (
                                  <motion.div
                                    key={i}
                                    className="w-1 h-1 rounded-full bg-[#E0E0E0]"
                                    animate={{
                                      opacity: [1, 0.3, 0],
                                      y: [0, -30],
                                    }}
                                    transition={{
                                      duration: 2,
                                      repeat: Infinity,
                                      delay: i * 0.15,
                                      ease: 'easeOut',
                                    }}
                                  />
                                ))}
                              </div>
                              
                              {/* Data stream lines going up */}
                              {Array.from({ length: 2 }).map((_, i) => (
                                <motion.div
                                  key={`stream-${i}`}
                                  className="absolute top-0 w-px bg-gradient-to-b from-blue-400/70 to-transparent"
                                  style={{
                                    height: '40px',
                                    left: `${40 + i * 30}%`,
                                  }}
                                  animate={{
                                    opacity: [0, 0.7, 0],
                                  }}
                                  transition={{
                                    duration: 1.5,
                                    repeat: Infinity,
                                    delay: i * 0.5,
                                    ease: 'easeInOut',
                                  }}
                                />
                              ))}
                            </div>
                          </div>

                          {/* Login Button */}
                          <button className="w-full bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/50 rounded py-1.5 text-[8px] text-blue-400 font-medium mt-2">
                            Sign In
                          </button>

                          {/* Status Alert */}
                          <motion.div
                            className="flex items-center gap-1 text-[7px] mt-2 bg-blue-500/10 border border-blue-500/30 rounded px-2 py-1"
                            animate={{
                              opacity: [0.5, 1, 0.5],
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                            }}
                          >
                            <motion.div 
                              className="w-1 h-1 rounded-full bg-blue-400"
                              animate={{
                                scale: [1, 1.5, 1],
                              }}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                              }}
                            />
                            <span className="text-blue-400 font-medium">Extracting credentials...</span>
                          </motion.div>
                        </div>
                      </div>

                      {/* Warning Icon - Top Right Corner */}
                      <motion.div
                        className="absolute top-3 right-3"
                        animate={{
                          opacity: [0.3, 0.7, 0.3],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                        }}
                      >
                        <Shield className="w-5 h-5 text-red-500/50" strokeWidth={1.5} />
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Stage 1: Breach Alert / Hacker Terminal */}
              {stage === 1 && (
                <motion.div
                  key="stage-1"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 50 }}
                  transition={{ duration: 0.6 }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  {/* MacBook with Real Image - Dark Mode */}
                  <div className="relative">
                    <img 
                      src="/mockups/Apple Macbook/Device/Apple-Macbook-Space-Grey.png" 
                      alt="MacBook"
                      className="w-[600px] h-auto"
                    />
                    
                    {/* Content Overlay - Hacker Terminal - NO OVERFLOW */}
                    <div className="absolute top-[14%] left-[14%] w-[72%] h-[75%] bg-black rounded-md overflow-hidden flex flex-col">
                      {/* Terminal Header - Fixed at top */}
                      <div className="flex items-center gap-1.5 px-2 py-1.5 border-b border-red-900/50 flex-shrink-0">
                        <div className="flex gap-1">
                          <div className="w-2 h-2 rounded-full bg-red-500"></div>
                          <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                          <div className="w-2 h-2 rounded-full bg-green-500"></div>
                        </div>
                        <span className="text-red-500 text-[8px] font-mono ml-1">BREACH DETECTED</span>
                      </div>

                      {/* Terminal Content - Scrollable content area */}
                      <div className="flex-1 p-2 overflow-hidden">
                        <div className="font-mono text-[8px] space-y-1">
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="text-green-400"
                          >
                            $ access_granted: john.doe@company.com
                          </motion.div>
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6 }}
                            className="text-yellow-400"
                          >
                            $ extracting_credentials...
                          </motion.div>
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.9 }}
                            className="text-blue-400"
                          >
                            $ scanning_network...
                          </motion.div>
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.2 }}
                            className="text-red-400"
                          >
                            $ downloading_database... [████] 100%
                          </motion.div>
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.5 }}
                            className="text-red-500 font-bold"
                          >
                            $ BREACH COMPLETE - 847 FILES
                          </motion.div>
                        </div>
                      </div>

                      {/* Glitch Effect */}
                      <motion.div
                        className="absolute inset-0 bg-red-500 mix-blend-overlay pointer-events-none"
                        animate={{
                          opacity: [0, 0.15, 0],
                        }}
                        transition={{
                          duration: 0.5,
                          repeat: Infinity,
                          repeatDelay: 1,
                        }}
                      />

                      {/* Alert Icon - Top Right */}
                      <motion.div
                        className="absolute top-2 right-2"
                        animate={{
                          scale: [1, 1.2, 1],
                          rotate: [0, 10, -10, 0],
                        }}
                        transition={{
                          duration: 0.5,
                          repeat: Infinity,
                          repeatDelay: 0.5,
                        }}
                      >
                        <AlertTriangle className="w-4 h-4 text-red-400" />
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Stage 2: Data Loss Visualization */}
              {stage === 2 && (
                <motion.div
                  key="stage-2"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.6 }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  {/* MacBook with Real Image - Data Loss */}
                  <div className="relative">
                    <img 
                      src="/mockups/Apple Macbook/Device/Apple-Macbook-Space-Grey.png" 
                      alt="MacBook"
                      className="w-[600px] h-auto"
                    />
                    
                    {/* Content Overlay - Company Files - NO OVERFLOW */}
                    <div className="absolute top-[14%] left-[14%] w-[72%] h-[75%] bg-gradient-to-br from-[#0f1420] to-[#0B0F1C] rounded-md overflow-hidden flex flex-col">
                      {/* File Manager Header - Fixed at top */}
                      <div className="flex items-center gap-1.5 px-2 py-1.5 border-b border-blue-500/30 flex-shrink-0">
                        <Database className="w-3 h-3 text-blue-400" />
                        <span className="text-white text-[8px] font-semibold">Company Files - Compromised</span>
                      </div>

                      {/* Files Grid - Fits within remaining space */}
                      <div className="flex-1 p-2 overflow-hidden">
                        <div className="grid grid-cols-3 gap-1.5 h-full content-start">
                          {[
                            { name: 'Financial', icon: Database },
                            { name: 'Customers', icon: Users },
                            { name: 'IP Docs', icon: FolderLock },
                            { name: 'Employee', icon: FileText },
                            { name: 'Secrets', icon: Briefcase },
                            { name: 'Contracts', icon: FileCode },
                          ].map((file, i) => {
                            const IconComponent = file.icon;
                            return (
                              <motion.div
                                key={i}
                                className="bg-gradient-to-br from-[#1a1f35]/80 to-[#0f1420]/80 rounded p-1.5 border border-blue-500/20 relative backdrop-blur-sm"
                                animate={{
                                  opacity: [1, 0.5, 0],
                                  scale: [1, 0.95, 0.8],
                                }}
                                transition={{
                                  duration: 2.5,
                                  repeat: Infinity,
                                  delay: i * 0.2,
                                  ease: 'easeInOut',
                                }}
                              >
                                <div className="text-center">
                                  <IconComponent className="w-4 h-4 text-blue-400 mx-auto mb-0.5" strokeWidth={1.5} />
                                  <FileX className="w-2.5 h-2.5 text-blue-500 mx-auto mb-0.5" />
                                  <p className="text-[#A0A0A0] text-[6px] leading-tight">{file.name}</p>
                                </div>

                                {/* Smooth fade particles */}
                                {[...Array(3)].map((_, j) => (
                                  <motion.div
                                    key={j}
                                    className="absolute w-0.5 h-0.5 bg-blue-400/60 rounded-full"
                                    style={{
                                      top: '50%',
                                      left: '50%',
                                    }}
                                    animate={{
                                      x: [0, (Math.random() - 0.5) * 40],
                                      y: [0, (Math.random() - 0.5) * 40],
                                      opacity: [0.8, 0],
                                      scale: [1, 0],
                                    }}
                                    transition={{
                                      duration: 2,
                                      repeat: Infinity,
                                      delay: i * 0.2 + j * 0.15,
                                      ease: 'easeOut',
                                    }}
                                  />
                                ))}
                              </motion.div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};
