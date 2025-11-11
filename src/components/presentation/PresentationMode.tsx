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
import { ProblemView } from './ProblemView';
import { Pillar1View } from './Pillar1View';
import { 
  QuestionView, 
  SolutionIntro, 
  PillarsView, 
  TransitionView,
  Pillar2View,
  Pillar3View
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
          <Pillar1View key="pillar-1" />
        )}
        
        {currentStep === 'pillar-2' && (
          <Pillar2View key="pillar-2" />
        )}
        
        {currentStep === 'pillar-3' && (
          <Pillar3View key="pillar-3" />
        )}
        
        {currentStep === 'transition' && (
          <TransitionView key="transition" />
        )}
        
        {/* Demo step renders nothing - returns to dashboard */}
        {currentStep === 'demo' && null}
      </AnimatePresence>

      {/* Progress indicator (hidden on demo and pillar views) */}
      {currentStep !== 'demo' && currentStep !== 'pillar-1' && currentStep !== 'pillar-2' && currentStep !== 'pillar-3' && <ProgressIndicator />}

      {/* Keyboard hints overlay (optional) */}
      {/* <KeyboardHints /> */}
    </>
  );
};
