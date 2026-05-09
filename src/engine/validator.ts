import { ExerciseMode, Language, ValidationResult } from '../types';
import { normalizeInput } from './normalizer';

function normalizeGermanFlexible(value: string): string {
  return value.replace(/ae/g, 'a').replace(/oe/g, 'o').replace(/ue/g, 'u');
}

export function validate(
  input: string,
  expected: string,
  language: Language,
  mode: ExerciseMode = 'number-to-words'
): ValidationResult {
  if (mode === 'words-to-number') {
    const normalizedInput = input.trim();
    const correct =
      /^\d+$/.test(normalizedInput) && parseInt(normalizedInput, 10).toString() === expected;

    return { correct, normalizedInput, expected };
  }

  const normalizedInput = normalizeInput(input, language);
  const normalizedExpected = normalizeInput(expected, language);
  const exactMatch = normalizedInput === normalizedExpected;
  const germanFriendlyMatch =
    language === 'de' &&
    normalizeGermanFlexible(normalizedInput) === normalizeGermanFlexible(normalizedExpected);
  const correct = exactMatch || germanFriendlyMatch;

  return { correct, normalizedInput, expected };
}
