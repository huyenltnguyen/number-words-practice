import type { LanguageDefinition } from './types';

const UMLAUT_REPLACEMENTS: Record<string, string> = {
  Ä: 'Ae',
  Ö: 'Oe',
  Ü: 'Ue',
  ä: 'ae',
  ö: 'oe',
  ü: 'ue',
  ß: 'ss',
};

const GERMAN_ONES = [
  'null',
  'eins',
  'zwei',
  'drei',
  'vier',
  'fünf',
  'sechs',
  'sieben',
  'acht',
  'neun',
  'zehn',
  'elf',
  'zwölf',
] as const;

const GERMAN_TEENS: Record<number, string> = {
  13: 'dreizehn',
  14: 'vierzehn',
  15: 'fünfzehn',
  16: 'sechzehn',
  17: 'siebzehn',
  18: 'achtzehn',
  19: 'neunzehn',
};

const GERMAN_TENS = [
  '',
  '',
  'zwanzig',
  'dreißig',
  'vierzig',
  'fünfzig',
  'sechzig',
  'siebzig',
  'achtzig',
  'neunzig',
] as const;

const GERMAN_SCALE_WORDS = new Set(['million', 'millionen', 'milliarde', 'milliarden']);

function formatGerman(n: number): string {
  if (n === 1_000_000) {
    return 'eine Million';
  }

  if (n === 2_000_000) {
    return 'zwei Millionen';
  }

  if (n < 100) {
    return formatGermanUnder100(n, false);
  }

  if (n < 1_000) {
    const hundreds = Math.floor(n / 100);
    const remainder = n % 100;
    const prefix = `${formatGermanUnit(hundreds, true)}hundert`;
    return remainder === 0 ? prefix : `${prefix}${formatGermanUnder100(remainder, false)}`;
  }

  if (n < 1_000_000) {
    const thousands = Math.floor(n / 1_000);
    const remainder = n % 1_000;
    const prefix = `${formatGermanBelowThousand(thousands, true)}tausend`;
    return remainder === 0 ? prefix : `${prefix}${formatGermanBelowThousand(remainder, false)}`;
  }

  const millions = Math.floor(n / 1_000_000);
  const remainder = n % 1_000_000;
  const prefix = millions === 1 ? 'eine Million' : 'zwei Millionen';
  return remainder === 0 ? prefix : `${prefix} ${formatGermanBelowMillion(remainder, false)}`;
}

function formatGermanBelowMillion(n: number, compoundOne: boolean): string {
  if (n < 1_000) {
    return formatGermanBelowThousand(n, compoundOne);
  }

  const thousands = Math.floor(n / 1_000);
  const remainder = n % 1_000;
  const prefix = `${formatGermanBelowThousand(thousands, true)}tausend`;
  return remainder === 0 ? prefix : `${prefix}${formatGermanBelowThousand(remainder, false)}`;
}

function formatGermanBelowThousand(n: number, compoundOne: boolean): string {
  if (n < 100) {
    return formatGermanUnder100(n, compoundOne);
  }

  const hundreds = Math.floor(n / 100);
  const remainder = n % 100;
  const prefix = `${formatGermanUnit(hundreds, true)}hundert`;
  return remainder === 0 ? prefix : `${prefix}${formatGermanUnder100(remainder, false)}`;
}

function formatGermanUnder100(n: number, compoundOne: boolean): string {
  if (n <= 12) {
    return formatGermanUnit(n, compoundOne);
  }

  if (n < 20) {
    return GERMAN_TEENS[n];
  }

  const tens = Math.floor(n / 10);
  const ones = n % 10;

  if (ones === 0) {
    return GERMAN_TENS[tens];
  }

  return `${formatGermanUnit(ones, true)}und${GERMAN_TENS[tens]}`;
}

function formatGermanUnit(n: number, compoundOne: boolean): string {
  if (n === 1) {
    return compoundOne ? 'ein' : 'eins';
  }

  return GERMAN_ONES[n];
}

function normalizeGerman(input: string): string {
  const normalized = input
    .replace(/[ÄÖÜäöüß]/g, (char) => UMLAUT_REPLACEMENTS[char])
    .toLowerCase()
    .trim()
    .replace(/\s+/g, ' ');

  return normalized
    .split(' ')
    .map((token) => (GERMAN_SCALE_WORDS.has(token) ? ` ${token}` : token))
    .join('')
    .trim();
}

export const germanLanguage: LanguageDefinition = {
  code: 'de',
  displayName: 'German',
  selectorLabel: 'German',
  format: formatGerman,
  normalize: normalizeGerman,
};
