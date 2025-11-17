import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Shield, CheckCircle, Loader2, Check, X } from 'lucide-react';

export const Pillar2View = () => {
  const [verificationStage, setVerificationStage] = useState(0);
  const [currentDeviceIndex, setCurrentDeviceIndex] = useState(0);
  const [isVerifying, setIsVerifying] = useState(false);
  const [hasLitUp, setHasLitUp] = useState(false);

  const devices = [
    {
      name: 'MacBook Pro',
      image: '/mockups/Apple Macbook/Device with Shadow/Apple-Macbook-Space-Grey.png',
      status: 'granted',
      scale: 0.9,
    },
    {
      name: 'iPad Pro',
      image: '/mockups/Apple iPad Pro/Device with Shadow/Device without Pencil/Apple iPad Pro 11 Space Gray - Landscape.png',
      status: 'denied',
      scale: 0.85,
    },
  ];

  const statusItems = [
    { label: 'Stage 1: Device Fingerprint Captured', stage: 1 },
    { label: 'Stage 2: Database Lookup Performed', stage: 2 },
    { label: 'Stage 3: Security Health Assessed', stage: 3 },
    { label: 'Stage 4: Device Trust Score Assigned', stage: 4 },
  ];

  // Floating particles for background
  const particles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    top: Math.random() * 100,
    delay: Math.random() * 5,
    duration: 3 + Math.random() * 2,
  }));

  // Animation sequence - Loops infinitely
  useEffect(() => {
    // Light up status items progressively on first load
    if (!hasLitUp) {
      const stage1Timer = setTimeout(() => setVerificationStage(1), 500);
      const stage2Timer = setTimeout(() => setVerificationStage(2), 1000);
      const stage3Timer = setTimeout(() => setVerificationStage(3), 1500);
      const stage4Timer = setTimeout(() => {
        setVerificationStage(4);
        setHasLitUp(true);
      }, 2000);

      // Cleanup timers
      return () => {
        clearTimeout(stage1Timer);
        clearTimeout(stage2Timer);
        clearTimeout(stage3Timer);
        clearTimeout(stage4Timer);
      };
    }
  }, [hasLitUp]);

  // Separate effect for device cycling
  useEffect(() => {
    const sequence = async () => {
      while (true) {
        // Cycle through each device
        for (let i = 0; i < devices.length; i++) {
          setCurrentDeviceIndex(i);
          setIsVerifying(true);
          
          // Keep status items lit
          if (hasLitUp) {
            setVerificationStage(4);
          }
          
          // Verification animation (2 seconds)
          await new Promise(resolve => setTimeout(resolve, 2000));
          
          setIsVerifying(false);
          
          // Pause to show verified state (1 second)
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
      }
    };

    sequence();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasLitUp]);

  const currentDevice = devices[currentDeviceIndex];

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
            stroke="url(#lineGradientPillar2)"
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
          <linearGradient id="lineGradientPillar2" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#F8C537" stopOpacity="0" />
            <stop offset="50%" stopColor="#F8C537" stopOpacity="1" />
            <stop offset="100%" stopColor="#F8C537" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>

      {/* Main Content */}
      <div className="relative z-20 h-screen flex flex-col">
        {/* Pillar 2 Indicator at Top */}
        <motion.div
          className="pt-6 pb-2 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="inline-block px-6 py-2 rounded-full bg-gradient-to-r from-[#3B82F6]/20 to-[#F8C537]/20 border border-[#3B82F6]/30 backdrop-blur-sm">
            <span className="text-sm font-bold tracking-widest uppercase bg-gradient-to-r from-[#3B82F6] to-[#F8C537] bg-clip-text text-transparent">
              Pillar 2 of 3
            </span>
          </div>
        </motion.div>

        {/* Two Column Layout */}
        <div className="flex-1 flex items-center justify-center px-8 -mt-4">
          <div className="w-full max-w-7xl grid grid-cols-2 gap-16 items-center">
            
            {/* LEFT COLUMN - Text Content */}
            <div className="space-y-6">
              {/* Title */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <h2 className="text-5xl font-bold text-white mb-3">
                  Device Intelligence
                </h2>
                <p className="text-3xl font-semibold bg-gradient-to-r from-[#3B82F6] to-[#F8C537] bg-clip-text text-transparent">
                  WHAT device is used?
                </p>
              </motion.div>

              {/* Status Items */}
              <div className="space-y-4">
                {statusItems.map((item, index) => {
                  const isActive = verificationStage >= item.stage;
                  
                  return (
                    <motion.div
                      key={index}
                      className="flex items-center gap-4"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{
                        opacity: isActive ? 1 : 0.3,
                        x: 0
                      }}
                      transition={{ delay: 0.2 * index }}
                    >
                      <motion.div
                        className="w-8 h-8 rounded-full border-2 flex items-center justify-center"
                        style={{
                          borderColor: isActive ? '#F8C537' : 'rgba(255,255,255,0.2)',
                          backgroundColor: isActive ? 'rgba(248, 197, 55, 0.1)' : 'transparent'
                        }}
                        animate={{
                          scale: isActive ? [1, 1.1, 1] : 1
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        <CheckCircle
                          className={`w-5 h-5 ${isActive ? 'text-[#F8C537]' : 'text-gray-600'}`}
                        />
                      </motion.div>
                      <span className={`text-base ${isActive ? 'text-white' : 'text-gray-500'}`}>
                        {item.label}
                      </span>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* RIGHT COLUMN - Device Visual (One at a time) */}
            <div className="relative flex items-center justify-center" style={{ height: '550px' }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentDeviceIndex}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -50 }}
                  transition={{ duration: 0.6, type: 'spring', stiffness: 100 }}
                  className="relative w-full flex items-center justify-center"
                  style={{ 
                    maxWidth: currentDeviceIndex === 2 ? '300px' : '600px',
                    transform: `scale(${currentDevice.scale})`
                  }}
                >
                  {/* Device Image Container */}
                  <div className="relative w-full">
                    <img
                      src={currentDevice.image}
                      alt={currentDevice.name}
                      className="w-full h-auto object-contain"
                    />

                    {/* Overlay on Device Screen - Centered */}
                    <motion.div
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      {isVerifying ? (
                        /* Verifying State */
                        <motion.div
                          initial={{ scale: 0, rotate: -10 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                          className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 backdrop-blur-md rounded-3xl px-12 py-10 shadow-2xl border-4 border-blue-400/50"
                        >
                            <div className="flex flex-col items-center gap-4">
                              <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                              >
                                <Loader2 className="w-16 h-16 text-white drop-shadow-lg" strokeWidth={2.5} />
                              </motion.div>
                              <div className="text-center">
                                <span className="block text-2xl font-black text-white tracking-widest drop-shadow-md">
                                  VERIFYING
                                </span>
                                <motion.span
                                  className="block text-sm text-blue-200 mt-1"
                                  animate={{ opacity: [0.5, 1, 0.5] }}
                                  transition={{ duration: 1.5, repeat: Infinity }}
                                >
                                  Please wait...
                                </motion.span>
                              </div>
                            </div>
                        </motion.div>
                      ) : (
                        /* Access Granted/Denied State */
                        <motion.div
                          className="relative"
                          initial={{ scale: 0, rotate: -10 }}
                          animate={{ scale: 1, rotate: 0 }}
                          exit={{ scale: 0, rotate: 10 }}
                          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                        >
                          {/* Subtle Glow Behind */}
                          <motion.div
                            className={`absolute inset-0 rounded-3xl blur-xl ${
                              currentDevice.status === 'granted' ? 'bg-green-500/40' : 'bg-red-500/40'
                            }`}
                            animate={{
                              scale: [1, 1.1, 1],
                              opacity: [0.3, 0.5, 0.3],
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              ease: 'easeInOut',
                            }}
                          />
                          
                          <div
                            className={`relative backdrop-blur-md rounded-3xl px-12 py-10 shadow-2xl border-4 ${
                              currentDevice.status === 'granted'
                                ? 'bg-gradient-to-br from-green-600 via-green-700 to-green-800 border-green-400/50'
                                : 'bg-gradient-to-br from-red-600 via-red-700 to-red-800 border-red-400/50'
                            }`}
                          >
                            <div className="flex flex-col items-center gap-4">
                              {currentDevice.status === 'granted' ? (
                                <>
                                  <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: 0.1, type: 'spring', stiffness: 300 }}
                                  >
                                    <div className="relative">
                                      <motion.div
                                        className="absolute inset-0 bg-white rounded-full"
                                        animate={{
                                          scale: [1, 1.5, 1],
                                          opacity: [0.5, 0, 0.5],
                                        }}
                                        transition={{
                                          duration: 1.5,
                                          repeat: Infinity,
                                        }}
                                      />
                                      <Check className="w-20 h-20 text-white drop-shadow-lg relative" strokeWidth={3.5} />
                                    </div>
                                  </motion.div>
                                  <div className="text-center">
                                    <motion.span
                                      className="block text-3xl font-black text-white tracking-widest drop-shadow-md"
                                      initial={{ opacity: 0, y: 10 }}
                                      animate={{ opacity: 1, y: 0 }}
                                      transition={{ delay: 0.2 }}
                                    >
                                      ACCESS GRANTED
                                    </motion.span>
                                    <motion.div
                                      className="flex items-center justify-center gap-2 mt-2"
                                      initial={{ opacity: 0 }}
                                      animate={{ opacity: 1 }}
                                      transition={{ delay: 0.3 }}
                                    >
                                      <div className="w-2 h-2 bg-green-300 rounded-full animate-pulse" />
                                      <span className="text-sm text-green-200 font-semibold">
                                        Device Verified
                                      </span>
                                    </motion.div>
                                  </div>
                                </>
                              ) : (
                                <>
                                  <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1, rotate: [0, -10, 10, -10, 0] }}
                                    transition={{ 
                                      scale: { delay: 0.1, type: 'spring', stiffness: 300 },
                                      rotate: { delay: 0.3, duration: 0.5 }
                                    }}
                                  >
                                    <X className="w-20 h-20 text-white drop-shadow-lg" strokeWidth={3.5} />
                                  </motion.div>
                                  <div className="text-center">
                                    <motion.span
                                      className="block text-3xl font-black text-white tracking-widest drop-shadow-md"
                                      initial={{ opacity: 0, y: 10 }}
                                      animate={{ opacity: 1, y: 0 }}
                                      transition={{ delay: 0.2 }}
                                    >
                                      ACCESS DENIED
                                    </motion.span>
                                    <motion.div
                                      className="flex items-center justify-center gap-2 mt-2"
                                      initial={{ opacity: 0 }}
                                      animate={{ opacity: 1 }}
                                      transition={{ delay: 0.3 }}
                                    >
                                      <div className="w-2 h-2 bg-red-300 rounded-full animate-pulse" />
                                      <span className="text-sm text-red-200 font-semibold">
                                        Device Rejected
                                      </span>
                                    </motion.div>
                                  </div>
                                </>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </motion.div>

                    {/* Device Name Label */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="absolute -bottom-12 left-1/2 -translate-x-1/2 text-center"
                    >
                      <span className="text-lg font-semibold bg-gradient-to-r from-[#3B82F6] to-[#F8C537] bg-clip-text text-transparent">
                        {currentDevice.name}
                      </span>
                    </motion.div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Bottom Text - Centered */}
        <motion.div
          className="pb-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          <p className="text-sm text-gray-500">
            Identifying and validating device security status
          </p>
        </motion.div>
      </div>
    </div>
  );
};
