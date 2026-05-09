import { getLanguageRules } from './languages';
import { Language } from '../types';

export function normalizeInput(input: string, language: Language): string {
  return getLanguageRules(language).normalize(input);
}
