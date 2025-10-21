import { motion } from 'framer-motion';
import { ParticleBackground } from './ParticleBackground';

export const LandingView = () => {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-background via-background to-primary/5 z-50">
      <ParticleBackground 
        particleCount={150} 
        particleOpacity={0.5} 
        connectionOpacity={0.1}
        particleSpeed={0.5}
      />
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 flex items-center justify-center h-full"
      >
        <div className="text-center space-y-8 px-4">
          {/* Logo - Custom Animated Shield */}
          <motion.div
            initial={{ scale: 0, rotateY: -180 }}
            animate={{ scale: 1, rotateY: 0 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 120, damping: 12 }}
            className="flex justify-center mb-4"
          >
            <motion.div
              className="relative"
              animate={{ 
                rotateY: [0, 10, -10, 0],
                scale: [1, 1.05, 1]
              }}
              transition={{ 
                duration: 4, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              {/* Glowing background */}
              <motion.div
                className="absolute inset-0 bg-primary/20 blur-3xl rounded-full"
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0.8, 0.5]
                }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              
              {/* Shield SVG */}
              <svg
                width="200"
                height="200"
                viewBox="0 0 200 200"
                className="relative z-10 drop-shadow-2xl"
              >
                {/* Outer shield glow */}
                <motion.path
                  d="M100 20 L160 50 L160 110 Q160 160 100 180 Q40 160 40 110 L40 50 Z"
                  fill="url(#shieldGradient)"
                  stroke="url(#strokeGradient)"
                  strokeWidth="3"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ delay: 0.5, duration: 1.5, ease: "easeOut" }}
                />
                
                {/* Inner circuit pattern */}
                <motion.g
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.2, duration: 0.8 }}
                >
                  {/* Vertical lines */}
                  <line x1="100" y1="60" x2="100" y2="140" stroke="rgba(59, 130, 246, 0.4)" strokeWidth="2" />
                  <line x1="80" y1="70" x2="80" y2="130" stroke="rgba(59, 130, 246, 0.3)" strokeWidth="1.5" />
                  <line x1="120" y1="70" x2="120" y2="130" stroke="rgba(59, 130, 246, 0.3)" strokeWidth="1.5" />
                  
                  {/* Horizontal lines */}
                  <line x1="70" y1="90" x2="130" y2="90" stroke="rgba(59, 130, 246, 0.3)" strokeWidth="1.5" />
                  <line x1="70" y1="110" x2="130" y2="110" stroke="rgba(59, 130, 246, 0.3)" strokeWidth="1.5" />
                  
                  {/* Circuit nodes */}
                  <circle cx="100" cy="90" r="4" fill="#3b82f6" />
                  <circle cx="100" cy="110" r="4" fill="#3b82f6" />
                  <circle cx="80" cy="90" r="3" fill="#3b82f6" opacity="0.7" />
                  <circle cx="120" cy="90" r="3" fill="#3b82f6" opacity="0.7" />
                  <circle cx="80" cy="110" r="3" fill="#3b82f6" opacity="0.7" />
                  <circle cx="120" cy="110" r="3" fill="#3b82f6" opacity="0.7" />
                </motion.g>
                
                {/* Lock icon in center */}
                <motion.g
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1.5, type: "spring", stiffness: 200 }}
                >
                  <rect x="85" y="95" width="30" height="25" rx="3" fill="#3b82f6" />
                  <path
                    d="M90 95 L90 85 Q90 75 100 75 Q110 75 110 85 L110 95"
                    fill="none"
                    stroke="#3b82f6"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                  <circle cx="100" cy="107" r="3" fill="white" />
                </motion.g>

                {/* Gradient definitions */}
                <defs>
                  <linearGradient id="shieldGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#1e40af" stopOpacity="0.5" />
                  </linearGradient>
                  <linearGradient id="strokeGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#60a5fa" />
                    <stop offset="100%" stopColor="#3b82f6" />
                  </linearGradient>
                </defs>
              </svg>
            </motion.div>
          </motion.div>

          {/* Product Name */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <motion.h1 
              className="text-8xl font-black text-foreground mb-4 tracking-tight"
              style={{ textShadow: '0 0 40px rgba(59, 130, 246, 0.3)' }}
            >
              {'TRUST-LOCK'.split('').map((char, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + i * 0.05 }}
                  className={char === '-' ? 'text-primary' : ''}
                >
                  {char}
                </motion.span>
              ))}
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.3 }}
              className="text-3xl text-primary font-semibold mb-2"
            >
              Smart Access Gateway
            </motion.p>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
              className="text-xl text-muted-foreground"
            >
              Zero Trust Security for Modern Banking
            </motion.p>
          </motion.div>

          {/* Branding */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.7 }}
            className="text-sm text-muted-foreground font-medium"
          >
            Wema Bank Hackathon 2025
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.9, type: "spring", stiffness: 200 }}
            className="space-y-4"
          >
            <motion.div 
              className="inline-block px-10 py-5 bg-gradient-primary rounded-xl shadow-glow cursor-pointer"
              whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(59, 130, 246, 0.5)' }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-2xl font-bold text-primary-foreground">Explore →</span>
            </motion.div>
            
            <motion.p 
              className="text-sm text-muted-foreground"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Press Enter to begin
            </motion.p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};
