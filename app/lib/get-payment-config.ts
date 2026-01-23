import { contentfulClient } from "./contentful";
import type {
  PaymentConfigurationSkeleton,
  PaymentConfigurationFields,
  PaymentMethod,
} from "@/types/contentful";

// Default fee configuration (fallback if Contentful fails)
const DEFAULT_CONFIG: PaymentConfigurationFields = {
  title: "Default Configuration",
  cardFeePercentage: 2.9,
  cardFeeFixed: 30, // cents
  achFeePercentage: 0.8,
  achFeeCap: 500, // cents ($5.00)
};

export async function getPaymentConfiguration(): Promise<PaymentConfigurationFields> {
  try {
    const res = await contentfulClient.getEntries<PaymentConfigurationSkeleton>({
      content_type: "paymentConfiguration",
      limit: 1,
    });

    if (!res.items.length) {
      console.warn("No payment configuration found, using defaults");
      return DEFAULT_CONFIG;
    }

    return res.items[0].fields as PaymentConfigurationFields;
  } catch (error) {
    console.warn("Failed to fetch payment configuration:", error);
    return DEFAULT_CONFIG;
  }
}

/**
 * Calculate the processing fee for a given amount and payment method
 * Returns the fee in cents
 */
export function calculateProcessingFee(
  baseAmountCents: number,
  paymentMethod: PaymentMethod,
  config: PaymentConfigurationFields
): number {
  if (paymentMethod === "card") {
    // Card fee: percentage + fixed fee
    // Formula to ensure HOA receives exact base amount:
    // total = (base + fixed) / (1 - percentage/100)
    // fee = total - base
    const percentage = config.cardFeePercentage / 100;
    const fixed = config.cardFeeFixed;
    const total = (baseAmountCents + fixed) / (1 - percentage);
    return Math.round(total - baseAmountCents);
  } else {
    // ACH fee: percentage only, capped
    const percentage = config.achFeePercentage / 100;
    const calculatedFee = Math.round((baseAmountCents * percentage) / (1 - percentage));
    return Math.min(calculatedFee, config.achFeeCap);
  }
}

/**
 * Calculate the total amount to charge (base + fee)
 */
export function calculateTotalAmount(
  baseAmountCents: number,
  paymentMethod: PaymentMethod,
  config: PaymentConfigurationFields
): number {
  const fee = calculateProcessingFee(baseAmountCents, paymentMethod, config);
  return baseAmountCents + fee;
}

/**
 * Get a breakdown of the payment amounts
 */
export function getPaymentBreakdown(
  baseAmountCents: number,
  paymentMethod: PaymentMethod,
  config: PaymentConfigurationFields
): {
  baseAmount: number;
  processingFee: number;
  total: number;
  baseAmountFormatted: string;
  processingFeeFormatted: string;
  totalFormatted: string;
} {
  const processingFee = calculateProcessingFee(baseAmountCents, paymentMethod, config);
  const total = baseAmountCents + processingFee;

  return {
    baseAmount: baseAmountCents,
    processingFee,
    total,
    baseAmountFormatted: formatCents(baseAmountCents),
    processingFeeFormatted: formatCents(processingFee),
    totalFormatted: formatCents(total),
  };
}

/**
 * Format cents to a dollar string (e.g., 15000 -> "$150.00")
 */
export function formatCents(cents: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(cents / 100);
}
