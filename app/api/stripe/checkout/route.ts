import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/app/lib/stripe";
import { formatCents } from "@/app/lib/get-payment-config";
import type { PaymentMethod } from "@/types/contentful";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      amount,
      description,
      feeTitle,
      propertyAddress,
      residentName,
      paymentMethod,
      processingFee,
      totalAmount,
    } = body;

    if (!amount || typeof amount !== "number" || amount <= 0) {
      return NextResponse.json({ error: "Invalid amount provided" }, { status: 400 });
    }

    if (!description || typeof description !== "string") {
      return NextResponse.json({ error: "Description is required" }, { status: 400 });
    }

    if (!paymentMethod || !["card", "us_bank_account"].includes(paymentMethod)) {
      return NextResponse.json({ error: "Valid payment method is required" }, { status: 400 });
    }

    if (!totalAmount || typeof totalAmount !== "number" || totalAmount <= 0) {
      return NextResponse.json({ error: "Total amount is required" }, { status: 400 });
    }

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:4600";
    const formattedBase = formatCents(amount);
    const formattedFee = formatCents(processingFee || 0);
    const formattedTotal = formatCents(totalAmount);
    const paymentMethodLabel = paymentMethod === "card" ? "Card" : "Bank Account (ACH)";

    const session = await stripe.checkout.sessions.create({
      payment_method_types: [paymentMethod as PaymentMethod],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: feeTitle || "HOA Dues Payment",
              description: `${description}\n\nBase Amount: ${formattedBase}\nProcessing Fee (${paymentMethodLabel}): ${formattedFee}\nTotal: ${formattedTotal}`,
            },
            unit_amount: totalAmount,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      invoice_creation: {
        enabled: true,
      },
      success_url: `${appUrl}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${appUrl}/payment/cancel`,
      metadata: {
        baseAmount: amount.toString(),
        processingFee: (processingFee || 0).toString(),
        totalAmount: totalAmount.toString(),
        paymentMethod,
        feeTitle: feeTitle || "HOA Dues",
        description,
        propertyAddress: propertyAddress || "",
        residentName: residentName || "",
      },
      payment_intent_data: {
        metadata: {
          baseAmount: amount.toString(),
          processingFee: (processingFee || 0).toString(),
          totalAmount: totalAmount.toString(),
          paymentMethod,
          feeTitle: feeTitle || "HOA Dues",
          propertyAddress: propertyAddress || "",
          residentName: residentName || "",
        },
      },
    });

    return NextResponse.json({
      url: session.url,
      sessionId: session.id,
      breakdown: {
        baseAmount: formattedBase,
        processingFee: formattedFee,
        total: formattedTotal,
      },
    });
  } catch (error) {
    console.error("Stripe checkout error:", error);
    return NextResponse.json({ error: "Failed to create checkout session" }, { status: 500 });
  }
}
