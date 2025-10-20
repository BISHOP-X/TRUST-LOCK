/**
 * Presentation Mode Orchestrator
 * 
 * Main component that orchestrates the entire presentation flow
 * Handles slide transitions, keyboard controls, and progress tracking
 * 
 * Senior Engineer Notes:
 * - AnimatePresence for smooth transitions
 * - Conditional rendering based on currentStep
 * - Keyboard hook activation
 * - Progress indicator integration
 */

import { AnimatePresence } from 'framer-motion';
import { usePresentation } from '@/contexts/PresentationContext';
import { usePresentationKeyboard } from '@/hooks/usePresentationMode';

// Import presentation views
import { LandingView } from './LandingView';
import { 
  ProblemView, 
  QuestionView, 
  SolutionIntro, 
  PillarsView, 
  TransitionView 
} from './PlaceholderViews';

// Import progress indicator
import { ProgressIndicator } from './ProgressIndicator';

/**
 * Main Presentation Mode Component
 * Orchestrates all presentation slides
 */
export const PresentationMode = () => {
  const { currentStep, isPresentationMode } = usePresentation();

  // Activate keyboard controls when in presentation mode
  usePresentationKeyboard({ 
    enabled: isPresentationMode,
    ignoreInputs: true,
    debounceMs: 300,
  });

  // Don't render anything if not in presentation mode
  if (!isPresentationMode) {
    return null;
  }

  return (
    <>
      {/* Main presentation content with animated transitions */}
      <AnimatePresence mode="wait">
        {currentStep === 'landing' && (
          <LandingView key="landing" />
        )}
        
        {currentStep === 'problem' && (
          <ProblemView key="problem" />
        )}
        
        {currentStep === 'question' && (
          <QuestionView key="question" />
        )}
        
        {currentStep === 'solution' && (
          <SolutionIntro key="solution" />
        )}
        
        {currentStep === 'pillar-1' && (
          <PillarsView key="pillar-1" pillarIndex={1} />
        )}
        
        {currentStep === 'pillar-2' && (
          <PillarsView key="pillar-2" pillarIndex={2} />
        )}
        
        {currentStep === 'pillar-3' && (
          <PillarsView key="pillar-3" pillarIndex={3} />
        )}
        
        {currentStep === 'transition' && (
          <TransitionView key="transition" />
        )}
        
        {/* Demo step renders nothing - returns to dashboard */}
        {currentStep === 'demo' && null}
      </AnimatePresence>

      {/* Progress indicator (always visible during presentation) */}
      {currentStep !== 'demo' && <ProgressIndicator />}

      {/* Keyboard hints overlay (optional) */}
      {/* <KeyboardHints /> */}
    </>
  );
};
