import type { LanguageDefinition } from './types';

const ENGLISH_ONES = [
  'zero',
  'one',
  'two',
  'three',
  'four',
  'five',
  'six',
  'seven',
  'eight',
  'nine',
  'ten',
  'eleven',
  'twelve',
  'thirteen',
  'fourteen',
  'fifteen',
  'sixteen',
  'seventeen',
  'eighteen',
  'nineteen',
] as const;

const ENGLISH_TENS = [
  '',
  '',
  'twenty',
  'thirty',
  'forty',
  'fifty',
  'sixty',
  'seventy',
  'eighty',
  'ninety',
] as const;

function formatEnglish(n: number): string {
  if (n < 20) {
    return ENGLISH_ONES[n];
  }

  if (n < 100) {
    const tens = Math.floor(n / 10);
    const ones = n % 10;
    return ones === 0 ? ENGLISH_TENS[tens] : `${ENGLISH_TENS[tens]}-${ENGLISH_ONES[ones]}`;
  }

  if (n < 1_000) {
    const hundreds = Math.floor(n / 100);
    const remainder = n % 100;
    const prefix = `${ENGLISH_ONES[hundreds]} hundred`;
    return remainder === 0 ? prefix : `${prefix} and ${formatEnglish(remainder)}`;
  }

  if (n < 1_000_000) {
    const thousands = Math.floor(n / 1_000);
    const remainder = n % 1_000;
    const prefix = `${formatEnglish(thousands)} thousand`;

    if (remainder === 0) {
      return prefix;
    }

    if (remainder < 100) {
      return `${prefix} and ${formatEnglish(remainder)}`;
    }

    return `${prefix} ${formatEnglish(remainder)}`;
  }

  const millions = Math.floor(n / 1_000_000);
  const remainder = n % 1_000_000;
  const prefix = millions === 1 ? 'one million' : 'two million';

  if (remainder === 0) {
    return prefix;
  }

  if (remainder < 100) {
    return `${prefix} and ${formatEnglish(remainder)}`;
  }

  return `${prefix} ${formatEnglish(remainder)}`;
}

function normalizeEnglish(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/-/g, ' ')
    .replace(/\s+/g, ' ')
    .replace(/\s+\band\b\s+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export const englishLanguage: LanguageDefinition = {
  code: 'en',
  displayName: 'English',
  selectorLabel: 'English',
  format: formatEnglish,
  normalize: normalizeEnglish,
};
