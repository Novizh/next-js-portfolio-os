export function calculateFee(
  amount: number,
  baseInterest: number,
  maximumInterest: number,
  minimumFee: number,
): number {
  if (!Number.isFinite(amount) || amount <= 0) return 0;

  const baseInterestFee = amount * (baseInterest / 100);

  if (baseInterestFee >= minimumFee) {
    return baseInterestFee;
  }

  const maxInterestFee = amount * (maximumInterest / 100);

  return maxInterestFee > minimumFee ? minimumFee : maxInterestFee;
}
