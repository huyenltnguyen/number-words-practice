import { getLanguageRules } from './languages';
import { Language } from '../types';

export function formatNumber(n: number, language: Language): string {
  validateInput(n);

  return getLanguageRules(language).format(n);
}

function validateInput(n: number): void {
  if (!Number.isInteger(n)) {
    throw new TypeError('Number must be an integer');
  }

  if (n < 0 || n > 2_000_000) {
    throw new RangeError('Number must be between 0 and 2,000,000');
  }
}
