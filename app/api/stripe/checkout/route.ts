import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/app/lib/stripe";
import {
  calculateTotalWithFees,
  getPaymentBreakdown,
} from "@/app/lib/calculate-fees";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { amount, description, feeTitle, propertyAddress, residentName } =
      body;

    if (!amount || typeof amount !== "number" || amount <= 0) {
      return NextResponse.json(
        { error: "Invalid amount provided" },
        { status: 400 }
      );
    }

    if (!description || typeof description !== "string") {
      return NextResponse.json(
        { error: "Description is required" },
        { status: 400 }
      );
    }

    const breakdown = getPaymentBreakdown(amount);
    const totalAmountInCents = calculateTotalWithFees(amount);

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: feeTitle || "HOA Dues Payment",
              description: `${description}\n\nBase Amount: ${breakdown.baseAmountFormatted}\nProcessing Fee: ${breakdown.processingFeeFormatted}`,
            },
            unit_amount: totalAmountInCents,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${appUrl}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${appUrl}/payment/cancel`,
      metadata: {
        baseAmount: amount.toString(),
        processingFee: breakdown.processingFee.toString(),
        totalAmount: totalAmountInCents.toString(),
        feeTitle: feeTitle || "HOA Dues",
        description,
        propertyAddress: propertyAddress || "",
        residentName: residentName || "",
      },
      payment_intent_data: {
        metadata: {
          baseAmount: amount.toString(),
          processingFee: breakdown.processingFee.toString(),
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
        baseAmount: breakdown.baseAmountFormatted,
        processingFee: breakdown.processingFeeFormatted,
        total: breakdown.totalFormatted,
      },
    });
  } catch (error) {
    console.error("Stripe checkout error:", error);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
