/**
 * Stripe fee calculation utilities
 *
 * Stripe charges 2.9% + $0.30 per transaction.
 * These functions calculate the total amount to charge the customer
 * so the HOA receives the full base amount after Stripe fees.
 */

const STRIPE_PERCENTAGE_FEE = 0.029; // 2.9%
const STRIPE_FIXED_FEE = 0.3; // $0.30

/**
 * Calculates the processing fee to pass to the customer
 * Formula: (baseAmount + $0.30) / (1 - 0.029) - baseAmount
 * This ensures the HOA receives exactly the base amount after Stripe takes its cut
 */
export function calculateProcessingFee(baseAmountInCents: number): number {
  const baseAmountDollars = baseAmountInCents / 100;
  const totalToCharge = (baseAmountDollars + STRIPE_FIXED_FEE) / (1 - STRIPE_PERCENTAGE_FEE);
  const processingFee = totalToCharge - baseAmountDollars;
  // Round to nearest cent
  return Math.round(processingFee * 100);
}

/**
 * Calculates the total amount to charge including processing fees
 */
export function calculateTotalWithFees(baseAmountInCents: number): number {
  return baseAmountInCents + calculateProcessingFee(baseAmountInCents);
}

/**
 * Returns a breakdown of the payment amounts
 */
export function getPaymentBreakdown(baseAmountInCents: number): {
  baseAmount: number;
  processingFee: number;
  total: number;
  baseAmountFormatted: string;
  processingFeeFormatted: string;
  totalFormatted: string;
} {
  const processingFee = calculateProcessingFee(baseAmountInCents);
  const total = baseAmountInCents + processingFee;

  return {
    baseAmount: baseAmountInCents,
    processingFee,
    total,
    baseAmountFormatted: formatCents(baseAmountInCents),
    processingFeeFormatted: formatCents(processingFee),
    totalFormatted: formatCents(total),
  };
}

/**
 * Formats cents to a dollar string (e.g., 15000 -> "$150.00")
 */
export function formatCents(cents: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(cents / 100);
}
