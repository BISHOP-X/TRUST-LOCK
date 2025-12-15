import { motion } from 'framer-motion';
import { Shield, Lock, CheckCircle, Zap, Network } from 'lucide-react';

export default function ChallengeView() {
  // 5 security features - evenly spaced at 72° intervals
  const securityFeatures = [
    { label: 'Zero-Trust Security', icon: Shield },
    { label: 'Device Compliance', icon: CheckCircle },
    { label: 'Encryption', icon: Lock },
    { label: 'Access Control', icon: Network },
    { label: 'Productivity', icon: Zap },
  ];

  const radius = 180; // Fixed distance from center to icon center

  // Floating particles for background (same as ProblemView)
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
          
          {/* LEFT SIDE - Text Content - Centered */}
          <div className="flex items-center justify-center">
            <div className="text-center space-y-8 max-w-2xl">
              {/* Heading with animated gradient */}
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-5xl md:text-6xl font-bold leading-relaxed pb-2"
              >
                <span className="text-white">The </span>
                <motion.span
                  className="relative inline-block"
                  style={{
                    background: 'linear-gradient(90deg, #3B82F6 0%, #F8C537 50%, #3B82F6 100%)',
                    backgroundSize: '200% auto',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                  animate={{
                    backgroundPosition: ['0% 50%', '200% 50%', '0% 50%'],
                  }}
                  transition={{
                    backgroundPosition: {
                      duration: 5,
                      repeat: Infinity,
                      ease: 'linear'
                    }
                  }}
                >
                  Challenge
                </motion.span>
              </motion.h2>

              {/* Main question */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
              >
                <p className="text-[#E0E0E0] text-2xl leading-relaxed">
                  How do we secure sensitive data in a{' '}
                  <motion.span
                    className="font-semibold inline-block"
                    style={{
                      background: 'linear-gradient(90deg, #3B82F6 0%, #F8C537 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}
                  >
                    'work-from-anywhere'
                  </motion.span>{' '}
                  world{' '}
                  <span className="text-white font-bold">WITHOUT</span> compromising productivity?
                </p>
              </motion.div>
            </div>
          </div>

        {/* RIGHT SIDE - Rotating Orbital Visualization */}
        <div className="relative h-[500px] flex items-center justify-center">
          {/* Central Shield Vault */}
          <div className="absolute z-20">
            <motion.div
              animate={{
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              {/* Outer glow ring */}
              <motion.div
                className="absolute inset-0 rounded-full blur-2xl"
                style={{ 
                  width: '120px', 
                  height: '120px', 
                  left: '-24px', 
                  top: '-24px',
                  background: 'radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, rgba(248, 197, 55, 0.2) 100%)'
                }}
                animate={{
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
              />

              {/* Shield icon container */}
              <div className="relative w-16 h-16 bg-gradient-to-br from-[#3B82F6] to-[#F8C537] rounded-full flex items-center justify-center">
                <Shield className="w-8 h-8 text-white" strokeWidth={1.5} />
              </div>
            </motion.div>
          </div>

          {/* Rotating lines with laptops - Each rotates independently */}
          {securityFeatures.map((feature, index) => {
            const Icon = feature.icon;
            const startAngle = (360 / securityFeatures.length) * index; // Even spacing: 0°, 72°, 144°, 216°, 288°
            
            return (
              <motion.div
                key={feature.label}
                className="absolute inset-0 flex items-center justify-center"
                animate={{
                  rotate: [startAngle, startAngle + 360],
                }}
                transition={{
                  duration: 15, // Same speed for all to maintain even spacing
                  repeat: Infinity,
                  ease: 'linear',
                }}
                style={{
                  transformOrigin: 'center',
                }}
              >
                {/* Line from center to laptop (hits icon center) */}
                <div 
                  className="absolute w-px origin-bottom" 
                  style={{ 
                    bottom: '50%',
                    height: `${radius}px`,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    background: 'linear-gradient(to bottom, rgba(248, 197, 55, 0.6) 0%, rgba(59, 130, 246, 0.3) 100%)',
                  }}
                />

                {/* Circular container at the end of line */}
                <motion.div
                  className="absolute"
                  style={{
                    top: `calc(50% - ${radius}px - 32px)`, // Position at line end (radius + half circle size)
                    left: '50%',
                    transform: 'translateX(-50%)',
                  }}
                  animate={{
                    rotate: [-startAngle, -(startAngle + 360)], // Counter-rotate to keep upright
                  }}
                  transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                >
                  {/* Circular container */}
                  <div className="relative w-16 h-16 bg-gradient-to-br from-[#3B82F6]/20 to-[#F8C537]/20 rounded-full border-2 border-[#F8C537]/50 flex items-center justify-center backdrop-blur-sm">
                    <Icon className="w-7 h-7 text-[#F8C537]" strokeWidth={2} />
                  </div>

                  {/* Label badge */}
                  <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap">
                    <span className="text-[9px] font-medium text-[#F8C537]">
                      {feature.label}
                    </span>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
    </div>
  );
}
