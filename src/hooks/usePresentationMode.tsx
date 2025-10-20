/**
 * Presentation Mode Keyboard Controls Hook
 * 
 * Senior Engineer Principles:
 * - Separation of concerns: keyboard logic isolated
 * - Event cleanup to prevent memory leaks
 * - Ignore key presses in input fields (UX consideration)
 * - Debouncing to prevent accidental double-presses
 * - Extensible for future shortcuts
 */

import { useEffect, useCallback, useRef } from 'react';
import { usePresentation } from '@/contexts/PresentationContext';
import { KEYBOARD_SHORTCUTS } from '@/types/presentation';

interface UsePresentationKeyboardOptions {
  enabled?: boolean;
  ignoreInputs?: boolean;
  debounceMs?: number;
}

/**
 * Custom hook for handling keyboard shortcuts in presentation mode
 * 
 * @param options Configuration options
 * @returns void
 * 
 * Usage:
 * ```tsx
 * usePresentationKeyboard({ enabled: isPresentationMode });
 * ```
 */
export const usePresentationKeyboard = (
  options: UsePresentationKeyboardOptions = {}
) => {
  const {
    enabled = true,
    ignoreInputs = true,
    debounceMs = 300,
  } = options;

  const { 
    isPresentationMode, 
    nextStep, 
    previousStep, 
    exitPresentation,
    isTransitioning,
  } = usePresentation();

  // Debounce ref to prevent rapid key presses
  const lastKeyPressRef = useRef<number>(0);

  /**
   * Check if current element is an input/textarea/contenteditable
   * Prevents keyboard shortcuts from firing while typing
   */
  const isInputElement = useCallback((element: EventTarget | null): boolean => {
    if (!element || !(element instanceof HTMLElement)) return false;

    const tagName = element.tagName.toLowerCase();
    const isInput = ['input', 'textarea', 'select'].includes(tagName);
    const isContentEditable = element.isContentEditable;

    return isInput || isContentEditable;
  }, []);

  /**
   * Check if enough time has passed since last key press
   * Debouncing prevents accidental double-navigation
   */
  const canProcessKeyPress = useCallback((): boolean => {
    const now = Date.now();
    const timeSinceLastPress = now - lastKeyPressRef.current;
    
    if (timeSinceLastPress < debounceMs) {
      return false;
    }

    lastKeyPressRef.current = now;
    return true;
  }, [debounceMs]);

  /**
   * Main keyboard event handler
   */
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    // Skip if hook is disabled or not in presentation mode
    if (!enabled || !isPresentationMode) return;

    // Skip if currently transitioning (animation in progress)
    if (isTransitioning) return;

    // Skip if user is typing in an input field
    if (ignoreInputs && isInputElement(event.target)) return;

    // Check debounce
    if (!canProcessKeyPress()) return;

    const key = event.key;

    // Navigation: Next step
    if (KEYBOARD_SHORTCUTS.next.includes(key)) {
      event.preventDefault();
      nextStep();
      return;
    }

    // Navigation: Previous step
    if (KEYBOARD_SHORTCUTS.previous.includes(key)) {
      event.preventDefault();
      previousStep();
      return;
    }

    // Exit presentation
    if (KEYBOARD_SHORTCUTS.exit.includes(key)) {
      event.preventDefault();
      exitPresentation();
      return;
    }

    // Scenario shortcuts (only work in 'demo' step)
    // These will be handled by dashboard when in demo mode
    // Included here for reference and future extension
  }, [
    enabled,
    isPresentationMode,
    isTransitioning,
    ignoreInputs,
    isInputElement,
    canProcessKeyPress,
    nextStep,
    previousStep,
    exitPresentation,
  ]);

  /**
   * Set up event listener
   * Cleanup on unmount to prevent memory leaks
   */
  useEffect(() => {
    if (!enabled) return;

    window.addEventListener('keydown', handleKeyDown);

    // Cleanup function
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [enabled, handleKeyDown]);
};

/**
 * Helper hook for scenario keyboard shortcuts
 * Used in dashboard demo mode
 */
export const useScenarioKeyboard = (
  onScenario: (scenarioIndex: number) => void,
  enabled: boolean = true
) => {
  useEffect(() => {
    if (!enabled) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      // Only work on number keys 1-4
      const key = event.key;
      
      if (KEYBOARD_SHORTCUTS.scenario1.includes(key)) {
        event.preventDefault();
        onScenario(0);
      } else if (KEYBOARD_SHORTCUTS.scenario2.includes(key)) {
        event.preventDefault();
        onScenario(1);
      } else if (KEYBOARD_SHORTCUTS.scenario3.includes(key)) {
        event.preventDefault();
        onScenario(2);
      } else if (KEYBOARD_SHORTCUTS.scenario4.includes(key)) {
        event.preventDefault();
        onScenario(3);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onScenario, enabled]);
};

/**
 * Hook to display keyboard hints
 * Returns current available shortcuts based on state
 */
export const useKeyboardHints = () => {
  const { currentStep, isPresentationMode } = usePresentation();

  if (!isPresentationMode) {
    return {
      primary: 'Press P to start presentation',
      secondary: null,
    };
  }

  if (currentStep === 'demo') {
    return {
      primary: 'Press 1-4 for scenarios',
      secondary: 'ESC to exit',
    };
  }

  return {
    primary: 'Press ENTER to continue',
    secondary: 'BACKSPACE to go back | ESC to exit',
  };
};
