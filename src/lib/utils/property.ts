export const calculateGrossYield = (annualRent: number, askingPrice: number): number | null => {
  if (!annualRent || !askingPrice) return null;
  return (annualRent / askingPrice) * 100;
};

export const EPC_COLORS: Record<string, string> = {
  A: '#008054',
  B: '#19b459',
  C: '#8dce46',
  D: '#ffd500',
  E: '#fcaa65',
  F: '#ef8023',
  G: '#e9153b',
};

export const getEpcColor = (rating: string): string =>
  EPC_COLORS[rating.toUpperCase()] ?? '#9ca3af';

export const scoreToRating = (score: number): string => {
  if (score >= 92) return 'A';
  if (score >= 81) return 'B';
  if (score >= 69) return 'C';
  if (score >= 55) return 'D';
  if (score >= 39) return 'E';
  if (score >= 21) return 'F';
  return 'G';
};
