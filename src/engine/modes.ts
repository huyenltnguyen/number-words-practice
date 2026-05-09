import { ExerciseMode } from '../types';

export interface ModeConfig {
  id: ExerciseMode;
  label: string;
  promptFormat: 'number' | 'words';
  answerFormat: 'words' | 'number';
}

const MODES: Record<ExerciseMode, ModeConfig> = {
  'number-to-words': {
    id: 'number-to-words',
    label: 'Number → Words',
    promptFormat: 'number',
    answerFormat: 'words',
  },
  'words-to-number': {
    id: 'words-to-number',
    label: 'Words → Number',
    promptFormat: 'words',
    answerFormat: 'number',
  },
};

export function getModeConfig(mode: ExerciseMode): ModeConfig {
  return MODES[mode];
}

export function getModes(): ModeConfig[] {
  return Object.values(MODES);
}
