import { describe, expect, it } from 'vitest';

import {
  generateNumber,
  getDigitCount,
  generateNumberAvoidingDigitCount,
  generateNumberWithDifferentDigitCount,
  generateNumberWithRandomDigitCount,
} from './generator';

describe('generateNumber', () => {
  it('returns a number in range [0, 10]', () => {
    const value = generateNumber(0, 10);

    expect(value).toBeGreaterThanOrEqual(0);
    expect(value).toBeLessThanOrEqual(10);
  });

  it('returns the exact value when min and max are equal', () => {
    expect(generateNumber(5, 5)).toBe(5);
  });

  it('returns a number in range [0, 2000000]', () => {
    const value = generateNumber(0, 2_000_000);

    expect(value).toBeGreaterThanOrEqual(0);
    expect(value).toBeLessThanOrEqual(2_000_000);
  });

  it('stays within bounds across 100 runs', () => {
    for (let i = 0; i < 100; i += 1) {
      const value = generateNumber(37, 82);

      expect(value).toBeGreaterThanOrEqual(37);
      expect(value).toBeLessThanOrEqual(82);
    }
  });
});

describe('getDigitCount', () => {
  it('returns 1 for 0', () => {
    expect(getDigitCount(0)).toBe(1);
  });

  it('returns 1 for single-digit numbers', () => {
    expect(getDigitCount(5)).toBe(1);
    expect(getDigitCount(9)).toBe(1);
  });

  it('returns correct count for multi-digit numbers', () => {
    expect(getDigitCount(10)).toBe(2);
    expect(getDigitCount(99)).toBe(2);
    expect(getDigitCount(100)).toBe(3);
    expect(getDigitCount(999999)).toBe(6);
    expect(getDigitCount(1000000)).toBe(7);
    expect(getDigitCount(2000000)).toBe(7);
  });
});

describe('generateNumberAvoidingDigitCount', () => {
  it('never returns a number with the excluded digit count', () => {
    for (let i = 0; i < 200; i += 1) {
      const excludeCount = 3;
      const value = generateNumberAvoidingDigitCount(excludeCount);

      expect(getDigitCount(value)).not.toBe(excludeCount);
    }
  });

  it('works for every digit count', () => {
    for (let excludeCount = 1; excludeCount <= 7; excludeCount += 1) {
      for (let i = 0; i < 50; i += 1) {
        const value = generateNumberAvoidingDigitCount(excludeCount);
        expect(getDigitCount(value)).not.toBe(excludeCount);
      }
    }
  });

  it('returns numbers within the full 0–2,000,000 range', () => {
    for (let i = 0; i < 100; i += 1) {
      const value = generateNumberAvoidingDigitCount(4);

      expect(value).toBeGreaterThanOrEqual(0);
      expect(value).toBeLessThanOrEqual(2_000_000);
    }
  });
});

describe('generateNumberWithDifferentDigitCount', () => {
  it('never returns a number with the same digit count as the previous number', () => {
    const previousNumbers = [
      0, 9, 10, 99, 100, 999, 1000, 9999, 10000, 99999, 100000, 999999, 1000000, 2000000,
    ];

    for (const previous of previousNumbers) {
      for (let i = 0; i < 50; i += 1) {
        const value = generateNumberWithDifferentDigitCount(previous);

        expect(getDigitCount(value)).not.toBe(getDigitCount(previous));
      }
    }
  });
});

describe('generateNumberWithRandomDigitCount', () => {
  it('returns a number with 1 to 7 digits', () => {
    for (let i = 0; i < 100; i += 1) {
      const value = generateNumberWithRandomDigitCount();
      const digits = getDigitCount(value);

      expect(digits).toBeGreaterThanOrEqual(1);
      expect(digits).toBeLessThanOrEqual(7);
      expect(value).toBeGreaterThanOrEqual(0);
      expect(value).toBeLessThanOrEqual(2_000_000);
    }
  });
});
