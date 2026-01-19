import type { Metadata } from "next";
import { FeeSchedule } from "@/components/dues/FeeSchedule";
import { PaymentInfo } from "@/components/dues/PaymentInfo";
import { getFeeSchedule } from "@/app/lib/get-fee-schedule";

export const metadata: Metadata = {
  title: "Dues & Fees",
  description: "HOA fee schedule and payment information for Woodbury Estates Phase 6",
};

export default async function DuesPage() {
  const fees = await getFeeSchedule();

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-hoa-navy mb-2 text-3xl font-bold md:text-4xl">Dues & Fees</h1>
        <p className="text-muted-foreground max-w-2xl">
          View the current fee schedule and learn about payment options for your HOA dues.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_400px]">
        <div>
          <h2 className="text-hoa-navy mb-4 text-xl font-semibold">Fee Schedule</h2>
          <FeeSchedule fees={fees} />
        </div>

        <div>
          <h2 className="text-hoa-navy mb-4 text-xl font-semibold">Payment Information</h2>
          <PaymentInfo />
        </div>
      </div>
    </div>
  );
}
