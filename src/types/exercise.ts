export type Language = 'en' | 'de';
export type ExerciseMode = 'number-to-words' | 'words-to-number';

export interface Exercise {
  number: number;
  mode: ExerciseMode;
  language: Language;
  expected: string;
}

export interface ValidationResult {
  correct: boolean;
  normalizedInput: string;
  expected: string;
}

export interface SessionScore {
  correct: number;
  total: number;
  gameOver: boolean;
}
