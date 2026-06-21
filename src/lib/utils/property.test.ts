import { describe, expect, it } from 'vitest';
import { calculateGrossYield, getEpcColor, scoreToRating } from './property';

describe('calculateGrossYield', () => {
  it('returns correct percentage for valid inputs', () => {
    expect(calculateGrossYield(12000, 200000)).toBe(6);
  });

  it('returns null when rent is 0', () => {
    expect(calculateGrossYield(0, 200000)).toBeNull();
  });

  it('returns null when price is 0', () => {
    expect(calculateGrossYield(12000, 0)).toBeNull();
  });
});

describe('scoreToRating', () => {
  it('maps 92 to A (boundary)', () => {
    expect(scoreToRating(92)).toBe('A');
  });

  it('maps 72 to C (falls in 69-80 band)', () => {
    expect(scoreToRating(72)).toBe('C');
  });

  it('maps 20 to G (below all bands)', () => {
    expect(scoreToRating(20)).toBe('G');
  });

  it('maps 81 to B (boundary)', () => {
    expect(scoreToRating(81)).toBe('B');
  });

  it('maps 55 to D (boundary)', () => {
    expect(scoreToRating(55)).toBe('D');
  });
});

describe('getEpcColor', () => {
  it('returns green for A', () => {
    expect(getEpcColor('A')).toBe('#008054');
  });

  it('accepts lowercase rating', () => {
    expect(getEpcColor('a')).toBe('#008054');
  });

  it('returns fallback grey for unknown rating', () => {
    expect(getEpcColor('X')).toBe('#9ca3af');
  });
});
