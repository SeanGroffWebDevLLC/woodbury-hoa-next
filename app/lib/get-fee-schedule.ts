import { unstable_cache } from "next/cache";
import { contentfulClient } from "./contentful";
import type { FeeScheduleSkeleton, FeeScheduleFields } from "@/types/contentful";

async function getFeeScheduleUncached(): Promise<FeeScheduleFields[]> {
  try {
    const res = await contentfulClient.getEntries<FeeScheduleSkeleton>({
      content_type: "feeSchedule",
    });

    if (!res.items.length) {
      return [];
    }

    const fees = res.items.map((item) => item.fields as FeeScheduleFields);

    return fees.sort((a, b) => a.title.localeCompare(b.title));
  } catch (error) {
    console.warn("Failed to fetch fee schedule:", error);
    return [];
  }
}

export const getFeeSchedule = unstable_cache(getFeeScheduleUncached, ["fees-data"], {
  revalidate: 86400,
  tags: ["fees"],
});

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}

export function formatFrequency(frequency: FeeScheduleFields["frequency"]): string {
  const labels: Record<FeeScheduleFields["frequency"], string> = {
    monthly: "per month",
    quarterly: "per quarter",
    annually: "per year",
    "one-time": "one-time",
  };
  return labels[frequency];
}
