"use client";

import { useState } from "react";
import { CreditCard, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

interface PaymentButtonProps {
  amount: number; // Amount in cents
  feeTitle: string;
  description: string;
  className?: string;
  disabled?: boolean;
}

export function PaymentButton({
  amount,
  feeTitle,
  description,
  className,
  disabled = false,
}: PaymentButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handlePayment = async () => {
    setIsLoading(true);

    try {
      const response = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount,
          feeTitle,
          description,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to create checkout session");
      }

      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error("No checkout URL received");
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An unexpected error occurred";
      toast.error("Payment Error", {
        description: errorMessage,
      });
      setIsLoading(false);
    }
  };

  return (
    <Button onClick={handlePayment} disabled={isLoading || disabled} className={className}>
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Processing...
        </>
      ) : (
        <>
          <CreditCard className="mr-2 h-4 w-4" />
          Pay Online
        </>
      )}
    </Button>
  );
}
