/**
 * Presentation Components Index
 * 
 * Centralized exports for all presentation-related components
 * Makes imports cleaner throughout the app
 */

// Main orchestration components
export { PresentationMode } from './PresentationMode';
export { PresentationWrapper } from './PresentationWrapper';

// UI Components
export { ProgressIndicator } from './ProgressIndicator';

// View Components
export { LandingView } from './LandingView';
export { ProblemView } from './ProblemView';
export { 
  QuestionView, 
  SolutionIntro, 
  PillarsView, 
  TransitionView 
} from './PlaceholderViews';
