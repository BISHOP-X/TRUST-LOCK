import { motion } from 'framer-motion';
import { User, Smartphone, Fingerprint, Shield, CheckCircle, Activity } from 'lucide-react';
import { useState, useEffect } from 'react';

export const Pillar1View = () => {
  const [verificationStage, setVerificationStage] = useState(0);

  // Floating particles for background (same as other views)
  const particles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    top: Math.random() * 100,
    delay: Math.random() * 5,
    duration: 3 + Math.random() * 2,
  }));

  // Network nodes matching your Canva layout
  const networkNodes = [
    { id: 1, icon: User, label: 'Identity', color: '#3B82F6', x: 25, y: 20 },
    { id: 2, icon: Smartphone, label: 'Device', color: '#22c55e', x: 50, y: 20 },
    { id: 3, icon: Fingerprint, label: 'Biometric', color: '#F8C537', x: 75, y: 20 },
    { id: 4, icon: Shield, label: 'Security', color: '#3B82F6', x: 37, y: 65 },
    { id: 5, icon: CheckCircle, label: 'Verified', color: '#F8C537', x: 63, y: 65 },
  ];

  // Connection lines matching your layout
  const connections = [
    { from: 1, to: 2, color: '#3B82F6' },
    { from: 2, to: 3, color: '#22c55e' },
    { from: 2, to: 4, color: '#3B82F6' },
    { from: 3, to: 5, color: '#F8C537' },
    { from: 4, to: 5, color: '#3B82F6' },
  ];

  // Status items for left column
  const statusItems = [
    { text: 'Device Trusted', icon: CheckCircle, delay: 1 },
    { text: 'User Pattern Matched', icon: CheckCircle, delay: 2 },
    { text: 'Biometric Verified', icon: CheckCircle, delay: 3 },
    { text: 'Continuous Monitoring ACTIVE', icon: Activity, delay: 4 },
  ];

  // Animation sequence
  useEffect(() => {
    const stages = [
      { delay: 500, stage: 1 },   // Start animation
      { delay: 1500, stage: 2 },  // Node 1
      { delay: 2500, stage: 3 },  // Node 2
      { delay: 3500, stage: 4 },  // Node 3
      { delay: 4500, stage: 5 },  // Node 4
      { delay: 5500, stage: 6 },  // Node 5
      { delay: 6500, stage: 7 },  // Complete
    ];

    const timers = stages.map(({ delay, stage }) =>
      setTimeout(() => setVerificationStage(stage), delay)
    );

    return () => timers.forEach(clearTimeout);
  }, []);

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
            stroke="url(#lineGradientPillar1)"
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
          <linearGradient id="lineGradientPillar1" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#F8C537" stopOpacity="0" />
            <stop offset="50%" stopColor="#F8C537" stopOpacity="1" />
            <stop offset="100%" stopColor="#F8C537" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>

      {/* Main Content */}
      <div className="relative z-20 h-screen flex flex-col">
        {/* Pillar 1 Indicator at Top */}
        <motion.div
          className="pt-8 pb-4 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="inline-block px-6 py-2 rounded-full bg-gradient-to-r from-[#3B82F6]/20 to-[#F8C537]/20 border border-[#3B82F6]/30 backdrop-blur-sm">
            <span className="text-sm font-bold tracking-widest uppercase bg-gradient-to-r from-[#3B82F6] to-[#F8C537] bg-clip-text text-transparent">
              Pillar 1 of 3
            </span>
          </div>
        </motion.div>

        {/* Two Column Layout */}
        <div className="flex-1 flex items-center justify-center px-8">
          <div className="w-full max-w-7xl grid grid-cols-2 gap-16 items-center">
            
            {/* LEFT COLUMN - Text Content */}
            <div className="space-y-8">
              {/* Title */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <h2 className="text-5xl font-bold text-white mb-3">
                  Identity Verification
                </h2>
                <p className="text-3xl font-semibold bg-gradient-to-r from-[#3B82F6] to-[#F8C537] bg-clip-text text-transparent">
                  WHO is accessing?
                </p>
              </motion.div>

              {/* Status Items */}
              <div className="space-y-4">
                {statusItems.map((item, index) => {
                  const isActive = verificationStage >= item.delay + 6;
                  const ItemIcon = item.icon;
                  const isMonitoring = index === 3;
                  
                  return (
                    <motion.div
                      key={index}
                      className="flex items-center gap-4"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{
                        opacity: isActive ? 1 : 0.3,
                        x: 0
                      }}
                      transition={{ delay: item.delay }}
                    >
                      <motion.div
                        className="w-8 h-8 rounded-full border-2 flex items-center justify-center"
                        style={{
                          borderColor: isActive ? '#22c55e' : '#3B82F6',
                          backgroundColor: isActive ? 'rgba(34, 197, 94, 0.1)' : 'transparent',
                        }}
                        animate={isActive && isMonitoring ? {
                          rotate: 360,
                        } : isActive ? {
                          scale: [1, 1.2, 1],
                        } : {}}
                        transition={{ 
                          duration: isMonitoring ? 2 : 0.3,
                          repeat: isMonitoring ? Infinity : 0,
                          ease: isMonitoring ? 'linear' : 'easeInOut',
                        }}
                      >
                        <ItemIcon 
                          className="w-5 h-5" 
                          style={{ color: isActive ? '#22c55e' : '#3B82F6' }}
                          strokeWidth={2.5} 
                        />
                      </motion.div>
                      <span 
                        className="text-lg font-medium"
                        style={{ color: isActive ? '#F8C537' : '#60a5fa' }}
                      >
                        {item.text}
                      </span>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* RIGHT COLUMN - Network Animation */}
            <div className="relative h-[500px]">
              <svg className="absolute inset-0 w-full h-full">
                {/* Connection Lines */}
                {connections.map((conn, index) => {
                  const fromNode = networkNodes.find(n => n.id === conn.from);
                  const toNode = networkNodes.find(n => n.id === conn.to);
                  
                  if (!fromNode || !toNode) return null;

                  return (
                    <g key={index}>
                      {/* Line */}
                      <motion.line
                        x1={`${fromNode.x}%`}
                        y1={`${fromNode.y}%`}
                        x2={`${toNode.x}%`}
                        y2={`${toNode.y}%`}
                        stroke={conn.color}
                        strokeWidth="2"
                        opacity="0.4"
                        initial={{ pathLength: 0 }}
                        animate={verificationStage >= 1 ? { pathLength: 1 } : {}}
                        transition={{ duration: 0.8, delay: index * 0.3 }}
                      />

                      {/* Animated Dot */}
                      {verificationStage >= 1 && (
                        <motion.circle
                          r="4"
                          fill={conn.color}
                          initial={{ opacity: 0 }}
                          animate={{
                            cx: [`${fromNode.x}%`, `${toNode.x}%`],
                            cy: [`${fromNode.y}%`, `${toNode.y}%`],
                            opacity: [0, 1, 1, 0],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: index * 0.4,
                            ease: 'linear',
                          }}
                        />
                      )}
                    </g>
                  );
                })}
              </svg>

              {/* Network Nodes */}
              {networkNodes.map((node, index) => {
                const NodeIcon = node.icon;
                const isActive = verificationStage >= index + 2;

                return (
                  <motion.div
                    key={node.id}
                    className="absolute"
                    style={{
                      left: `${node.x}%`,
                      top: `${node.y}%`,
                      transform: 'translate(-50%, -50%)',
                    }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={verificationStage >= 1 ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: index * 0.3, type: 'spring', stiffness: 200 }}
                  >
                    {/* Glow */}
                    {isActive && (
                      <motion.div
                        className="absolute inset-0 rounded-full blur-xl"
                        style={{
                          background: node.color,
                          width: '100px',
                          height: '100px',
                          left: '-25px',
                          top: '-25px',
                          opacity: 0.3,
                        }}
                        animate={{
                          scale: [1, 1.2, 1],
                          opacity: [0.3, 0.5, 0.3],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                        }}
                      />
                    )}

                    {/* Node Circle */}
                    <div
                      className="relative w-16 h-16 rounded-full flex items-center justify-center backdrop-blur-sm border-2"
                      style={{
                        background: isActive
                          ? `linear-gradient(135deg, ${node.color}40 0%, ${node.color}20 100%)`
                          : 'rgba(15, 20, 32, 0.5)',
                        borderColor: isActive ? node.color : 'rgba(59, 130, 246, 0.3)',
                      }}
                    >
                      <NodeIcon
                        className="w-8 h-8"
                        style={{ color: isActive ? node.color : '#60a5fa' }}
                        strokeWidth={2}
                      />
                    </div>

                    {/* Label */}
                    <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap">
                      <span
                        className="text-xs font-medium"
                        style={{ color: isActive ? node.color : '#60a5fa' }}
                      >
                        {node.label}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Subtitle - Centered */}
        <motion.div
          className="pb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
        >
          <p className="text-sm text-gray-400">
            Continuous authentication and user behavior analysis
          </p>
        </motion.div>
      </div>

      {/* Press Enter hint */}
      {verificationStage >= 7 && (
        <motion.div
          className="absolute bottom-8 right-8 z-30"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <p className="text-sm text-gray-400">
            Press Enter to continue →
          </p>
        </motion.div>
      )}
    </div>
  );
};
