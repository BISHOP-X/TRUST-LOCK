/**
 * Progress Indicator Component
 * 
 * Shows current position in presentation flow
 * Displays step count and optional keyboard hints
 * 
 * Phase 4 Task: This is a placeholder for Phase 4 implementation
 */

import { usePresentation } from '@/contexts/PresentationContext';
import { STEP_ORDER } from '@/types/presentation';
import { motion } from 'framer-motion';

/**
 * Simple Progress Indicator
 * Shows current step number and total steps
 */
export const ProgressIndicator = () => {
  const { currentStep } = usePresentation();

  // Get current position in presentation
  const currentIndex = STEP_ORDER.indexOf(currentStep);
  const totalSteps = STEP_ORDER.length;

  // Don't show on landing or idle
  if (currentStep === 'landing' || currentStep === 'idle') {
    return null;
  }

  return (
    <motion.div
      className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.4 }}
    >
      <div className="bg-background/80 backdrop-blur-md border border-border rounded-full px-6 py-3 shadow-lg">
        <div className="flex items-center gap-4">
          {/* Step counter */}
          <span className="text-sm text-muted-foreground font-medium">
            {currentIndex + 1} / {totalSteps}
          </span>

          {/* Progress dots */}
          <div className="flex gap-2">
            {STEP_ORDER.map((step, index) => (
              <div
                key={step}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'bg-primary w-6'
                    : index < currentIndex
                    ? 'bg-primary/40'
                    : 'bg-muted'
                }`}
              />
            ))}
          </div>

          {/* Keyboard hint */}
          <span className="text-xs text-muted-foreground/60">
            Press <kbd className="px-2 py-1 bg-muted rounded text-muted-foreground font-mono">→</kbd> to continue
          </span>
        </div>
      </div>
    </motion.div>
  );
};
