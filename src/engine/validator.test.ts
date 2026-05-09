import { describe, expect, it } from 'vitest';

import { formatNumber } from './formatter';
import { validate } from './validator';

describe('validate', () => {
  it('returns correct for matching input', () => {
    expect(validate('one', 'one', 'en')).toEqual({
      correct: true,
      normalizedInput: 'one',
      expected: 'one',
    });
  });

  it('returns false for incorrect input', () => {
    expect(validate('two', 'one', 'en')).toEqual({
      correct: false,
      normalizedInput: 'two',
      expected: 'one',
    });
  });

  it('validates normalized English input', () => {
    expect(validate('One Hundred And Twenty-Three', formatNumber(123, 'en'), 'en').correct).toBe(
      true
    );
  });

  it('validates normalized German input', () => {
    expect(validate('Ein Hundert', formatNumber(100, 'de'), 'de').correct).toBe(true);
  });

  it('allows plain letters for German umlaut substitutions', () => {
    expect(validate('funf', formatNumber(5, 'de'), 'de').correct).toBe(true);
  });

  it('does not accept German million without a space', () => {
    expect(validate('einemillion', formatNumber(1_000_000, 'de'), 'de').correct).toBe(false);
    expect(validate('eine million', formatNumber(1_000_000, 'de'), 'de').correct).toBe(true);
  });

  it('returns the raw expected string for display', () => {
    const result = validate('einundzwanzig', formatNumber(21, 'de'), 'de');

    expect(result.correct).toBe(true);
    expect(result.expected).toBe('einundzwanzig');
  });

  it('accepts correct numeric input in words-to-number mode', () => {
    expect(validate('42', '42', 'en', 'words-to-number')).toEqual({
      correct: true,
      normalizedInput: '42',
      expected: '42',
    });
  });

  it('accepts numeric input with surrounding spaces in words-to-number mode', () => {
    expect(validate('  42  ', '42', 'en', 'words-to-number')).toEqual({
      correct: true,
      normalizedInput: '42',
      expected: '42',
    });
  });

  it('rejects the wrong number in words-to-number mode', () => {
    expect(validate('41', '42', 'en', 'words-to-number')).toEqual({
      correct: false,
      normalizedInput: '41',
      expected: '42',
    });
  });

  it('rejects non-numeric input in words-to-number mode', () => {
    expect(validate('forty-two', '42', 'en', 'words-to-number')).toEqual({
      correct: false,
      normalizedInput: 'forty-two',
      expected: '42',
    });
  });

  it('rejects decimal input in words-to-number mode', () => {
    expect(validate('42.5', '42', 'en', 'words-to-number')).toEqual({
      correct: false,
      normalizedInput: '42.5',
      expected: '42',
    });
  });
});
