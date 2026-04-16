import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { stripe } from "@/app/lib/stripe";
import { formatCents } from "@/app/lib/calculate-fees";

export const metadata: Metadata = {
  title: "Payment Successful",
  description: "Your HOA payment has been processed successfully",
};

interface PaymentSuccessPageProps {
  searchParams: Promise<{ session_id?: string }>;
}

export default async function PaymentSuccessPage({ searchParams }: PaymentSuccessPageProps) {
  const { session_id } = await searchParams;
  let paymentDetails = null;

  if (session_id) {
    try {
      const session = await stripe.checkout.sessions.retrieve(session_id);
      paymentDetails = {
        amount: session.amount_total,
        email: session.customer_details?.email,
        feeTitle: session.metadata?.feeTitle || "HOA Dues",
        baseAmount: session.metadata?.baseAmount ? parseInt(session.metadata.baseAmount) : null,
        processingFee: session.metadata?.processingFee
          ? parseInt(session.metadata.processingFee)
          : null,
        propertyAddress: session.metadata?.propertyAddress || null,
      };
    } catch {
      console.error("Failed to retrieve session details");
    }
  }

  return (
    <div className="container mx-auto flex min-h-[60vh] items-center justify-center px-4 py-12">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mb-4 flex justify-center">
            <div className="rounded-full bg-green-100 p-3">
              <CheckCircle className="h-12 w-12 text-green-600" />
            </div>
          </div>
          <CardTitle className="text-hoa-navy text-2xl">Payment Successful!</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-muted-foreground text-center">
            Thank you for your payment. Your HOA dues have been processed successfully.
          </p>

          {paymentDetails && (
            <div className="bg-muted space-y-2 rounded-lg p-4">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Payment Type</span>
                <span className="font-medium">{paymentDetails.feeTitle}</span>
              </div>
              {paymentDetails.baseAmount && (
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Base Amount</span>
                  <span className="font-medium">{formatCents(paymentDetails.baseAmount)}</span>
                </div>
              )}
              {paymentDetails.processingFee && (
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Processing Fee</span>
                  <span className="font-medium">{formatCents(paymentDetails.processingFee)}</span>
                </div>
              )}
              {paymentDetails.amount && (
                <div className="flex justify-between border-t pt-2 text-sm">
                  <span className="font-medium">Total Paid</span>
                  <span className="text-hoa-blue font-bold">
                    {formatCents(paymentDetails.amount)}
                  </span>
                </div>
              )}
              {paymentDetails.propertyAddress && (
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Property Address</span>
                  <span className="font-medium">{paymentDetails.propertyAddress}</span>
                </div>
              )}
              {paymentDetails.email && (
                <p className="text-muted-foreground mt-3 text-center text-xs">
                  A confirmation email has been sent to {paymentDetails.email}
                </p>
              )}
            </div>
          )}

          <div className="flex flex-col gap-3">
            <Button asChild className="bg-hoa-blue hover:bg-hoa-blue/90">
              <Link href="/dues">View Fee Schedule</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/">Return to Home</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
