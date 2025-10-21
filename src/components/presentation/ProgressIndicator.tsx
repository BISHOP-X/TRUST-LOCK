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
      className="fixed top-1/2 -translate-y-1/2 right-6 z-50"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.4 }}
    >
      <div className="bg-background/80 backdrop-blur-md border border-border rounded-full px-4 py-6 shadow-lg">
        <div className="flex flex-col items-center gap-3">
          {/* Step counter */}
          <span className="text-xs text-muted-foreground font-medium rotate-0">
            {currentIndex + 1}/{totalSteps}
          </span>

          {/* Progress dots - vertical */}
          <div className="flex flex-col gap-2">
            {STEP_ORDER.map((step, index) => (
              <div
                key={step}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'bg-primary h-6'
                    : index < currentIndex
                    ? 'bg-primary/40'
                    : 'bg-muted'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
