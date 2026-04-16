"use client";

import { useState, useEffect } from "react";
import { CreditCard, Building2, Loader2, CheckCircle2, Home } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { PaymentMethod } from "@/types/contentful";

interface PaymentBreakdown {
  baseAmount: number;
  processingFee: number;
  total: number;
  baseAmountFormatted: string;
  processingFeeFormatted: string;
  totalFormatted: string;
}

interface PaymentConfig {
  config: {
    cardFeePercentage: number;
    cardFeeFixed: number;
    achFeePercentage: number;
    achFeeCap: number;
  };
  breakdowns: {
    card: PaymentBreakdown;
    us_bank_account: PaymentBreakdown;
  };
}

interface PaymentMethodSelectorProps {
  amount: number; // Amount in cents
  feeTitle: string;
  description: string;
  className?: string;
  disabled?: boolean;
}

export function PaymentMethodSelector({
  amount,
  feeTitle,
  description,
  className,
  disabled = false,
}: PaymentMethodSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentConfig, setPaymentConfig] = useState<PaymentConfig | null>(null);
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod | null>(null);
  const [propertyAddress, setPropertyAddress] = useState("");
  const [addressError, setAddressError] = useState("");

  // Fetch payment config when dialog opens
  useEffect(() => {
    if (isOpen && !paymentConfig) {
      setIsLoading(true);
      fetch(`/api/payment-config?amount=${amount}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            throw new Error(data.error);
          }
          setPaymentConfig(data);
        })
        .catch((err) => {
          toast.error("Failed to load payment options", {
            description: err.message,
          });
        })
        .finally(() => setIsLoading(false));
    }
  }, [isOpen, amount, paymentConfig]);

  const handlePayment = async () => {
    if (!selectedMethod || !paymentConfig) return;

    if (!propertyAddress.trim()) {
      setAddressError("Please enter your property address");
      return;
    }

    setIsProcessing(true);

    try {
      const breakdown = paymentConfig.breakdowns[selectedMethod];

      const response = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount,
          feeTitle,
          description,
          paymentMethod: selectedMethod,
          processingFee: breakdown.processingFee,
          totalAmount: breakdown.total,
          propertyAddress: propertyAddress.trim(),
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
      setIsProcessing(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button disabled={disabled} className={className}>
          <CreditCard className="mr-2 h-4 w-4" />
          Pay Online
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-hoa-navy">Choose Payment Method</DialogTitle>
          <DialogDescription>
            Select how you&apos;d like to pay. Processing fees vary by payment method.
          </DialogDescription>
        </DialogHeader>

        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="text-hoa-blue h-8 w-8 animate-spin" />
          </div>
        ) : paymentConfig ? (
          <div className="space-y-4">
            {/* Card Option */}
            <button
              onClick={() => setSelectedMethod("card")}
              className={`w-full rounded-lg border-2 p-4 text-left transition-all ${
                selectedMethod === "card"
                  ? "border-hoa-blue bg-hoa-blue/5"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={`rounded-full p-2 ${
                      selectedMethod === "card" ? "bg-hoa-blue/10" : "bg-gray-100"
                    }`}
                  >
                    <CreditCard
                      className={`h-5 w-5 ${
                        selectedMethod === "card" ? "text-hoa-blue" : "text-gray-600"
                      }`}
                    />
                  </div>
                  <div>
                    <p className="font-semibold">Credit/Debit Card</p>
                    <p className="text-muted-foreground text-sm">
                      Visa, Mastercard, Amex, Discover
                    </p>
                  </div>
                </div>
                {selectedMethod === "card" && <CheckCircle2 className="text-hoa-blue h-5 w-5" />}
              </div>
              <div className="mt-3 rounded bg-gray-50 p-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Base amount:</span>
                  <span>{paymentConfig.breakdowns.card.baseAmountFormatted}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Processing fee:</span>
                  <span>{paymentConfig.breakdowns.card.processingFeeFormatted}</span>
                </div>
                <div className="mt-1 flex justify-between border-t pt-1 font-semibold">
                  <span>Total:</span>
                  <span className="text-hoa-blue">
                    {paymentConfig.breakdowns.card.totalFormatted}
                  </span>
                </div>
              </div>
            </button>

            {/* Bank Account Option */}
            <button
              onClick={() => setSelectedMethod("us_bank_account")}
              className={`w-full rounded-lg border-2 p-4 text-left transition-all ${
                selectedMethod === "us_bank_account"
                  ? "border-hoa-blue bg-hoa-blue/5"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={`rounded-full p-2 ${
                      selectedMethod === "us_bank_account" ? "bg-hoa-blue/10" : "bg-gray-100"
                    }`}
                  >
                    <Building2
                      className={`h-5 w-5 ${
                        selectedMethod === "us_bank_account" ? "text-hoa-blue" : "text-gray-600"
                      }`}
                    />
                  </div>
                  <div>
                    <p className="font-semibold">Bank Account (ACH)</p>
                    <p className="text-muted-foreground text-sm">
                      Lower fees, takes 3-5 business days
                    </p>
                  </div>
                </div>
                {selectedMethod === "us_bank_account" && (
                  <CheckCircle2 className="text-hoa-blue h-5 w-5" />
                )}
              </div>
              <div className="mt-3 rounded bg-gray-50 p-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Base amount:</span>
                  <span>{paymentConfig.breakdowns.us_bank_account.baseAmountFormatted}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Processing fee:</span>
                  <span>{paymentConfig.breakdowns.us_bank_account.processingFeeFormatted}</span>
                </div>
                <div className="mt-1 flex justify-between border-t pt-1 font-semibold">
                  <span>Total:</span>
                  <span className="text-hoa-blue">
                    {paymentConfig.breakdowns.us_bank_account.totalFormatted}
                  </span>
                </div>
              </div>
              {/* Savings badge */}
              {paymentConfig.breakdowns.us_bank_account.processingFee <
                paymentConfig.breakdowns.card.processingFee && (
                <div className="mt-2 inline-block rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700">
                  Save{" "}
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                  }).format(
                    (paymentConfig.breakdowns.card.processingFee -
                      paymentConfig.breakdowns.us_bank_account.processingFee) /
                      100
                  )}{" "}
                  in fees
                </div>
              )}
            </button>

            {/* Property Address */}
            <div className="space-y-1.5">
              <Label
                htmlFor="property-address"
                className="flex items-center gap-1.5 text-sm font-medium"
              >
                <Home className="h-4 w-4" />
                Property Address <span className="text-destructive">*</span>
              </Label>
              <Input
                id="property-address"
                placeholder="e.g., 123 Oak Lane"
                value={propertyAddress}
                onChange={(e) => {
                  setPropertyAddress(e.target.value);
                  if (addressError) setAddressError("");
                }}
                className={addressError ? "border-destructive" : ""}
              />
              {addressError && <p className="text-destructive text-xs">{addressError}</p>}
              <p className="text-muted-foreground text-xs">
                Enter your Woodbury Estates home address to record your payment.
              </p>
            </div>

            {/* Continue Button */}
            <Button
              onClick={handlePayment}
              disabled={!selectedMethod || isProcessing}
              className="bg-hoa-blue hover:bg-hoa-blue/90 w-full"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                <>Continue to Payment</>
              )}
            </Button>

            <p className="text-muted-foreground text-center text-xs">
              You&apos;ll be redirected to Stripe to complete your payment securely.
            </p>
          </div>
        ) : (
          <div className="text-muted-foreground py-8 text-center">
            Failed to load payment options. Please try again.
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
