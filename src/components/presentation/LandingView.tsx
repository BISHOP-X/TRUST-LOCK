import { motion } from 'framer-motion';

export const LandingView = () => {
  // Wave particles for bottom half
  const waveParticles = Array.from({ length: 40 }, (_, i) => ({
    id: i,
    delay: Math.random() * 5,
    duration: 3 + Math.random() * 2,
    offset: Math.random() * 100,
  }));

  return (
    <div className="fixed inset-0 bg-gradient-to-b from-[#050810] to-[#0A0E1A] overflow-hidden z-50">
      {/* Wavy lines animation at bottom half */}
      <div className="absolute bottom-0 left-0 right-0 h-1/2 overflow-hidden">
        {/* Multiple wavy SVG paths */}
        {[0, 1, 2, 3].map((index) => (
          <motion.svg
            key={index}
            className="absolute bottom-0 left-0 w-full"
            style={{ height: '200px' }}
            viewBox="0 0 1200 200"
            preserveAspectRatio="none"
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: [0.15, 0.25, 0.15],
              y: [0, -10, 0]
            }}
            transition={{
              duration: 4 + index,
              repeat: Infinity,
              delay: index * 0.5,
              ease: 'easeInOut'
            }}
          >
            <motion.path
              d={`M0,${100 + index * 20} Q300,${50 + index * 15} 600,${100 + index * 20} T1200,${100 + index * 20} V200 H0 Z`}
              fill={index % 2 === 0 ? 'rgba(29, 78, 216, 0.2)' : 'rgba(30, 64, 175, 0.15)'}
              animate={{
                d: [
                  `M0,${100 + index * 20} Q300,${50 + index * 15} 600,${100 + index * 20} T1200,${100 + index * 20} V200 H0 Z`,
                  `M0,${100 + index * 20} Q300,${130 + index * 15} 600,${100 + index * 20} T1200,${100 + index * 20} V200 H0 Z`,
                  `M0,${100 + index * 20} Q300,${50 + index * 15} 600,${100 + index * 20} T1200,${100 + index * 20} V200 H0 Z`,
                ]
              }}
              transition={{
                duration: 8 + index * 2,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            />
          </motion.svg>
        ))}

        {/* Particles along the waves */}
        {waveParticles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute w-1.5 h-1.5 rounded-full"
            style={{
              left: `${particle.offset}%`,
              bottom: '10%',
              background: 'radial-gradient(circle, rgba(59, 130, 246, 0.8), rgba(29, 78, 216, 0.3))',
              boxShadow: '0 0 10px rgba(59, 130, 246, 0.5)',
            }}
            animate={{
              y: [0, -60, 0],
              x: [0, 30, 0],
              opacity: [0, 0.8, 0],
              scale: [0.5, 1.2, 0.5],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
              ease: 'easeInOut'
            }}
          />
        ))}
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
        <div className="w-full max-w-[900px] mx-auto text-center">
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
            className="mb-4 pt-20 md:pt-0"
          >
            <div className="relative inline-flex items-center gap-4">
              <img 
                src="/logo-no-bg.png" 
                alt="TrustLock Logo" 
                className="w-[230px] h-[150px] drop-shadow-2xl object-contain"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -100, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ 
              duration: 1, 
              delay: 0.5, 
              ease: [0.6, 0.05, 0.01, 0.9]
            }}
          >
            <motion.h1
              className="font-extrabold text-center leading-tight mb-2"
              style={{ 
                fontFamily: 'Inter, sans-serif',
                fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                fontWeight: 800,
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
              Next-Generation
            </motion.h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 100, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ 
              duration: 1, 
              delay: 0.8, 
              ease: [0.6, 0.05, 0.01, 0.9]
            }}
          >
            <motion.h2
              className="font-extrabold text-center leading-tight mb-6"
              style={{ 
                fontFamily: 'Inter, sans-serif',
                fontSize: 'clamp(1.8rem, 4vw, 3rem)',
                fontWeight: 700,
                background: 'linear-gradient(90deg, #FFFFFF 0%, #F5C542 25%, #3B82F6 50%, #FFFFFF 75%, #F5C542 100%)',
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
                  ease: 'linear',
                  delay: 0.5
                }
              }}
            >
              Cybersecurity Access Control
            </motion.h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9, ease: 'easeOut' }}
            className="text-center mb-10"
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '1.2rem',
              fontWeight: 500,
              background: 'linear-gradient(135deg, #1E3A8A 0%, #F5C542 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            <motion.span
              animate={{ 
                opacity: [0.7, 1, 0.7],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            >
              AI-Driven. Zero Trust. Real-Time Defense.
            </motion.span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 1.1, ease: 'easeOut' }}
            className="flex justify-center"
          >
            <motion.button
              whileHover={{ 
                scale: 1.08,
                backgroundColor: '#EAB308',
                boxShadow: '0 0 30px rgba(245, 197, 66, 0.6)'
              }}
              whileTap={{ scale: 0.95 }}
              animate={{
                boxShadow: [
                  '0 4px 20px rgba(245, 197, 66, 0.3)',
                  '0 8px 30px rgba(245, 197, 66, 0.5)',
                  '0 4px 20px rgba(245, 197, 66, 0.3)',
                ]
              }}
              transition={{
                boxShadow: {
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }
              }}
              className="px-10 py-4 bg-[#F5C542] text-black font-semibold rounded-full transition-all duration-300"
              style={{
                fontFamily: 'Inter, sans-serif',
                fontWeight: 600,
                fontSize: '1.1rem'
              }}
            >
              Begin Presentation
            </motion.button>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4 }}
            className="mt-6 text-sm"
            style={{ 
              fontFamily: 'Inter, sans-serif',
              background: 'linear-gradient(90deg, #6B7280 0%, #9CA3AF 100%)', 
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Press Enter or click to continue
          </motion.p>
        </div>
      </div>
    </div>
  );
};
