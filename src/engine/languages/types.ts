import type { Language } from '../../types';

export interface LanguageRules {
  format(n: number): string;
  normalize(input: string): string;
}

export interface LanguageDefinition extends LanguageRules {
  code: Language;
  displayName: string;
  selectorLabel: string;
}
