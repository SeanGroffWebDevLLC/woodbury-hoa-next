import type { Metadata } from "next";
import Link from "next/link";
import { XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Payment Cancelled",
  description: "Your HOA payment was cancelled",
};

export default function PaymentCancelPage() {
  return (
    <div className="container mx-auto flex min-h-[60vh] items-center justify-center px-4 py-12">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mb-4 flex justify-center">
            <div className="rounded-full bg-amber-100 p-3">
              <XCircle className="h-12 w-12 text-amber-600" />
            </div>
          </div>
          <CardTitle className="text-hoa-navy text-2xl">
            Payment Cancelled
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-muted-foreground text-center">
            Your payment was cancelled and you have not been charged. If you
            encountered any issues or have questions, please contact the HOA
            office.
          </p>

          <div className="flex flex-col gap-3">
            <Button asChild className="bg-hoa-blue hover:bg-hoa-blue/90">
              <Link href="/dues">Try Again</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/contact">Contact Us</Link>
            </Button>
            <Button asChild variant="ghost">
              <Link href="/">Return to Home</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
