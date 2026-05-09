const DIGIT_RANGES: [number, number][] = [
  [0, 9],
  [10, 99],
  [100, 999],
  [1000, 9999],
  [10000, 99999],
  [100000, 999999],
  [1000000, 2000000],
];

export function generateNumber(min: number, max: number): number {
  if (!Number.isInteger(min) || !Number.isInteger(max)) {
    throw new TypeError('min and max must be integers');
  }

  if (min > max) {
    throw new RangeError('min must be less than or equal to max');
  }

  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getDigitCount(n: number): number {
  if (n === 0) return 1;
  return Math.floor(Math.log10(Math.abs(n))) + 1;
}

export function generateNumberWithRandomDigitCount(): number {
  const digitCount = Math.floor(Math.random() * DIGIT_RANGES.length) + 1;
  const [min, max] = DIGIT_RANGES[digitCount - 1];
  return generateNumber(min, max);
}

export function generateNumberAvoidingDigitCount(excludeCount: number): number {
  const available = DIGIT_RANGES.filter((_, i) => i + 1 !== excludeCount);
  const [min, max] = available[Math.floor(Math.random() * available.length)];
  return generateNumber(min, max);
}

export function generateNumberWithDifferentDigitCount(previousNumber: number): number {
  const excludeCount = getDigitCount(previousNumber);
  return generateNumberAvoidingDigitCount(excludeCount);
}
