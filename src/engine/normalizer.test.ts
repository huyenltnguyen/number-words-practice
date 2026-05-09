import { describe, expect, it } from 'vitest';

import { normalizeInput } from './normalizer';

describe('normalizeInput', () => {
  describe('English', () => {
    it('lowercases and removes "and"', () => {
      expect(normalizeInput('One Hundred And Twenty', 'en')).toBe('one hundred twenty');
    });

    it('replaces hyphens with spaces', () => {
      expect(normalizeInput('twenty-one', 'en')).toBe('twenty one');
    });

    it('collapses extra spaces', () => {
      expect(normalizeInput('  extra   spaces  ', 'en')).toBe('extra spaces');
    });
  });

  describe('German', () => {
    it('lowercases input', () => {
      expect(normalizeInput('Einhundert', 'de')).toBe('einhundert');
    });

    it('normalizes umlauts', () => {
      expect(normalizeInput('einhundertähnlich', 'de')).toBe('einhundertaehnlich');
    });

    it('removes spaces', () => {
      expect(normalizeInput('ein hundert', 'de')).toBe('einhundert');
    });

    it('normalizes ß to ss', () => {
      expect(normalizeInput('ß', 'de')).toBe('ss');
    });
  });
});
