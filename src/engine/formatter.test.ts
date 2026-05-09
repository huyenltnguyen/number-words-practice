import { describe, expect, it } from 'vitest';

import { formatNumber } from './formatter';

describe('formatNumber', () => {
  describe('English', () => {
    const cases: Array<[number, string]> = [
      [0, 'zero'],
      [1, 'one'],
      [11, 'eleven'],
      [13, 'thirteen'],
      [20, 'twenty'],
      [21, 'twenty-one'],
      [99, 'ninety-nine'],
      [100, 'one hundred'],
      [101, 'one hundred and one'],
      [115, 'one hundred and fifteen'],
      [123, 'one hundred and twenty-three'],
      [1000, 'one thousand'],
      [1001, 'one thousand and one'],
      [10000, 'ten thousand'],
      [100000, 'one hundred thousand'],
      [999999, 'nine hundred and ninety-nine thousand nine hundred and ninety-nine'],
      [1000000, 'one million'],
      [1000001, 'one million and one'],
      [2000000, 'two million'],
    ];

    it.each(cases)('formats %i as %s', (input, expected) => {
      expect(formatNumber(input, 'en')).toBe(expected);
    });
  });

  describe('German', () => {
    const cases: Array<[number, string]> = [
      [0, 'null'],
      [1, 'eins'],
      [11, 'elf'],
      [21, 'einundzwanzig'],
      [42, 'zweiundvierzig'],
      [100, 'einhundert'],
      [101, 'einhunderteins'],
      [1000, 'eintausend'],
      [1000001, 'eine Million eins'],
      [1000000, 'eine Million'],
      [2000000, 'zwei Millionen'],
    ];

    it.each(cases)('formats %i as %s', (input, expected) => {
      expect(formatNumber(input, 'de')).toBe(expected);
    });
  });
});
