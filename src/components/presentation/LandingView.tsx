import { motion } from 'framer-motion';

export const LandingView = () => {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-background via-background to-primary/5 z-50">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 flex items-center justify-center h-full"
      >
        <div className="text-center space-y-8 px-4">
          {/* Logo */}
          <motion.div
            initial={{ scale: 0, rotateY: -180 }}
            animate={{ scale: 1, rotateY: 0 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 120, damping: 12 }}
            className="flex justify-center mb-4"
          >
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
              {/* Glowing background - Gold */}
              <motion.div
                className="absolute inset-0 blur-3xl rounded-full"
                style={{ background: 'hsl(45 100% 51% / 0.2)' }}
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
              
              {/* Logo Image */}
              <motion.img
                src="/src/Logo/logo-no-bg.png"
                alt="TRUST-LOCK Logo"
                className="relative z-10 w-48 h-48 md:w-64 md:h-64 drop-shadow-2xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 1.5 }}
              />
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
              {'TRUSTLOCK'.split('').map((char, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + i * 0.05 }}
                  className={i === 5 ? 'text-accent' : ''}
                >
                  {char}
                </motion.span>
              ))}
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.3 }}
              className="text-3xl font-semibold mb-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"
            >
              Cybersecurity Solutions
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
              whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(255, 215, 0, 0.5)' }}
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
