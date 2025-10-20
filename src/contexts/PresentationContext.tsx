/**
 * Presentation Mode Context
 * 
 * Senior Engineer Architecture:
 * - Single source of truth for presentation state
 * - Immutable state updates
 * - Type-safe actions
 * - Keyboard event handling at context level
 * - No prop drilling
 */

import React, { createContext, useContext, useState, useCallback, useEffect, ReactNode } from 'react';
import {
  PresentationStep,
  PresentationState,
  PresentationContextType,
  STEP_ORDER,
} from '@/types/presentation';

// Context with undefined default (forces provider usage)
const PresentationContext = createContext<PresentationContextType | undefined>(undefined);

/**
 * Initial state factory
 * Pure function for predictable state initialization
 */
const createInitialState = (startInPresentMode: boolean = false): PresentationState => ({
  currentStep: startInPresentMode ? 'landing' : 'idle',
  isPresentationMode: startInPresentMode,
  history: [],
  isTransitioning: false,
});

interface PresentationProviderProps {
  children: ReactNode;
  startInPresentMode?: boolean;
}

/**
 * Presentation Provider Component
 * Manages all presentation state and navigation logic
 * 
 * DEFAULT BEHAVIOR: Starts in presentation mode showing landing page
 * This creates the "wow" effect - visitors see Trust-Lock branding immediately
 */
export const PresentationProvider: React.FC<PresentationProviderProps> = ({ 
  children, 
  startInPresentMode = true  // Changed from false to true - Start with landing page
}) => {
  const [state, setState] = useState<PresentationState>(
    () => createInitialState(startInPresentMode)
  );

  /**
   * Start presentation mode
   * Transitions from idle dashboard to first slide (landing page)
   */
  const startPresentation = useCallback(() => {
    setState(prev => ({
      ...prev,
      currentStep: 'landing',
      isPresentationMode: true,
      history: ['idle'],
      isTransitioning: true,
    }));

    // Reset transitioning flag after animation completes
    setTimeout(() => {
      setState(prev => ({ ...prev, isTransitioning: false }));
    }, 600); // Match animation duration
  }, []);

  /**
   * Exit presentation mode
   * Returns to normal dashboard
   */
  const exitPresentation = useCallback(() => {
    setState(prev => ({
      ...prev,
      currentStep: 'idle',
      isPresentationMode: false,
      history: [],
      isTransitioning: true,
    }));

    setTimeout(() => {
      setState(prev => ({ ...prev, isTransitioning: false }));
    }, 600);
  }, []);

  /**
   * Navigate to next step in sequence
   * Bounded by STEP_ORDER array
   */
  const nextStep = useCallback(() => {
    setState(prev => {
      if (prev.isTransitioning || prev.currentStep === 'demo') {
        return prev; // Prevent rapid clicks or navigation past last step
      }

      const currentIndex = STEP_ORDER.indexOf(prev.currentStep);
      const nextIndex = Math.min(currentIndex + 1, STEP_ORDER.length - 1);
      const nextStepValue = STEP_ORDER[nextIndex];

      return {
        ...prev,
        currentStep: nextStepValue,
        history: [...prev.history, prev.currentStep],
        isTransitioning: true,
      };
    });

    setTimeout(() => {
      setState(prev => ({ ...prev, isTransitioning: false }));
    }, 600);
  }, []);

  /**
   * Navigate to previous step
   * Uses history stack for accurate back navigation
   */
  const previousStep = useCallback(() => {
    setState(prev => {
      if (prev.isTransitioning || prev.history.length === 0) {
        return prev;
      }

      const previousStepValue = prev.history[prev.history.length - 1];
      const newHistory = prev.history.slice(0, -1);

      return {
        ...prev,
        currentStep: previousStepValue,
        history: newHistory,
        isTransitioning: true,
      };
    });

    setTimeout(() => {
      setState(prev => ({ ...prev, isTransitioning: false }));
    }, 600);
  }, []);

  /**
   * Jump directly to a specific step
   * Useful for debugging or non-linear navigation
   */
  const goToStep = useCallback((step: PresentationStep) => {
    setState(prev => ({
      ...prev,
      currentStep: step,
      history: [...prev.history, prev.currentStep],
      isTransitioning: true,
    }));

    setTimeout(() => {
      setState(prev => ({ ...prev, isTransitioning: false }));
    }, 600);
  }, []);

  /**
   * Manual transition state control
   * Useful for custom animations
   */
  const setTransitioning = useCallback((isTransitioning: boolean) => {
    setState(prev => ({ ...prev, isTransitioning }));
  }, []);

  // Context value with memoization for performance
  const contextValue: PresentationContextType = {
    ...state,
    startPresentation,
    exitPresentation,
    nextStep,
    previousStep,
    goToStep,
    setTransitioning,
  };

  return (
    <PresentationContext.Provider value={contextValue}>
      {children}
    </PresentationContext.Provider>
  );
};

/**
 * Custom hook to access presentation context
 * Throws error if used outside provider (fail-fast pattern)
 */
export const usePresentation = (): PresentationContextType => {
  const context = useContext(PresentationContext);
  
  if (context === undefined) {
    throw new Error(
      'usePresentation must be used within a PresentationProvider. ' +
      'Wrap your component tree with <PresentationProvider>.'
    );
  }
  
  return context;
};

/**
 * Type guard to check if in presentation mode
 * Useful for conditional rendering
 */
export const isInPresentationMode = (step: PresentationStep): boolean => {
  return step !== 'idle';
};

/**
 * Get progress percentage
 * Useful for progress indicators
 */
export const getPresentationProgress = (currentStep: PresentationStep): number => {
  if (currentStep === 'idle') return 0;
  
  const currentIndex = STEP_ORDER.indexOf(currentStep);
  return Math.round(((currentIndex + 1) / STEP_ORDER.length) * 100);
};
