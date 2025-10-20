/**
 * Presentation Mode Type Definitions
 * 
 * Senior Engineer Notes:
 * - Strict typing for state machine steps
 * - Immutable state pattern for predictability
 * - Clear separation between state and actions
 * - Future-proof for additional steps
 */

/**
 * Represents each step in the presentation flow
 * Steps are ordered sequentially for the demo
 */
export type PresentationStep = 
  | 'idle'           // Not in presentation mode (default dashboard)
  | 'landing'        // Landing page: Trust-Lock branding and intro
  | 'problem'        // Problem statement: stolen VPN scenario
  | 'question'       // Big question: work-from-anywhere challenge
  | 'solution'       // Solution introduction: Smart Access Gateway
  | 'pillar-1'       // First pillar: Identity verification
  | 'pillar-2'       // Second pillar: Device posture
  | 'pillar-3'       // Third pillar: Context analysis
  | 'transition'     // Transition: "Let's see it in action"
  | 'demo';          // Live demo: dashboard with scenarios

/**
 * Immutable state for presentation context
 */
export interface PresentationState {
  currentStep: PresentationStep;
  isPresentationMode: boolean;
  history: PresentationStep[];  // Track navigation for back button
  isTransitioning: boolean;     // Prevent rapid key presses
}

/**
 * Actions available in presentation mode
 * Following Redux-style action pattern for clarity
 */
export interface PresentationActions {
  startPresentation: () => void;
  exitPresentation: () => void;
  nextStep: () => void;
  previousStep: () => void;
  goToStep: (step: PresentationStep) => void;
  setTransitioning: (isTransitioning: boolean) => void;
}

/**
 * Combined context type
 */
export type PresentationContextType = PresentationState & PresentationActions;

/**
 * Configuration for presentation animations
 * Centralized for consistency across all views
 */
export interface PresentationAnimationConfig {
  duration: number;
  stiffness: number;
  damping: number;
  delay: number;
}

/**
 * Default animation config (can be overridden per view)
 */
export const DEFAULT_ANIMATION_CONFIG: PresentationAnimationConfig = {
  duration: 0.6,
  stiffness: 100,
  damping: 20,
  delay: 0,
};

/**
 * Step metadata for UI rendering
 */
export interface StepMetadata {
  step: PresentationStep;
  label: string;
  description: string;
  estimatedDuration: number; // seconds
}

/**
 * Ordered step sequence for navigation
 */
export const STEP_ORDER: PresentationStep[] = [
  'landing',
  'problem',
  'question',
  'solution',
  'pillar-1',
  'pillar-2',
  'pillar-3',
  'transition',
  'demo',
];

/**
 * Step metadata map
 */
export const STEP_METADATA: Record<PresentationStep, StepMetadata> = {
  'idle': {
    step: 'idle',
    label: 'Dashboard',
    description: 'Normal dashboard view',
    estimatedDuration: 0,
  },
  'landing': {
    step: 'landing',
    label: 'Trust-Lock',
    description: 'Product branding and introduction',
    estimatedDuration: 20,
  },
  'problem': {
    step: 'problem',
    label: 'Problem',
    description: 'Traditional security vulnerabilities',
    estimatedDuration: 30,
  },
  'question': {
    step: 'question',
    label: 'Challenge',
    description: 'The borderless office challenge',
    estimatedDuration: 30,
  },
  'solution': {
    step: 'solution',
    label: 'Solution',
    description: 'Smart Access Gateway introduction',
    estimatedDuration: 20,
  },
  'pillar-1': {
    step: 'pillar-1',
    label: 'Identity',
    description: 'Identity verification pillar',
    estimatedDuration: 30,
  },
  'pillar-2': {
    step: 'pillar-2',
    label: 'Device',
    description: 'Device posture pillar',
    estimatedDuration: 30,
  },
  'pillar-3': {
    step: 'pillar-3',
    label: 'Context',
    description: 'Context analysis pillar',
    estimatedDuration: 30,
  },
  'transition': {
    step: 'transition',
    label: 'Transition',
    description: 'Transition to live demo',
    estimatedDuration: 10,
  },
  'demo': {
    step: 'demo',
    label: 'Live Demo',
    description: 'Interactive scenario demonstration',
    estimatedDuration: 120,
  },
};

/**
 * Keyboard shortcuts configuration
 */
export interface KeyboardShortcuts {
  next: string[];
  previous: string[];
  exit: string[];
  scenario1: string[];
  scenario2: string[];
  scenario3: string[];
  scenario4: string[];
}

export const KEYBOARD_SHORTCUTS: KeyboardShortcuts = {
  next: ['Enter', 'ArrowRight', ' '], // Space bar also works
  previous: ['Backspace', 'ArrowLeft'],
  exit: ['Escape'],
  scenario1: ['1'],
  scenario2: ['2'],
  scenario3: ['3'],
  scenario4: ['4'],
};
