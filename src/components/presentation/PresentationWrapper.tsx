/**
 * Presentation Wrapper Component
 * 
 * Conditional renderer that switches between:
 * - Presentation Mode (full-screen slides)
 * - Dashboard Mode (normal app UI)
 * 
 * Senior Engineer Notes:
 * - Single responsibility: route rendering logic
 * - No complex state - just checks isPresentationMode
 * - Children pattern for dashboard content
 */

import { usePresentation } from '@/contexts/PresentationContext';
import { PresentationMode } from './PresentationMode';
import type { ReactNode } from 'react';

interface PresentationWrapperProps {
  children: ReactNode;
}

/**
 * Wrapper that conditionally renders presentation or dashboard
 */
export const PresentationWrapper = ({ children }: PresentationWrapperProps) => {
  const { isPresentationMode, currentStep } = usePresentation();

  // If in presentation mode AND not on demo step, show presentation
  if (isPresentationMode && currentStep !== 'demo') {
    return <PresentationMode />;
  }

  // Otherwise show normal dashboard
  return <>{children}</>;
};
