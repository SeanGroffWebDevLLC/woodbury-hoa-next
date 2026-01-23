import { NextResponse } from "next/server";
import { getPaymentConfiguration, getPaymentBreakdown } from "@/app/lib/get-payment-config";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const amountParam = searchParams.get("amount");

    if (!amountParam) {
      return NextResponse.json({ error: "Amount parameter is required" }, { status: 400 });
    }

    const amount = parseInt(amountParam, 10);
    if (isNaN(amount) || amount <= 0) {
      return NextResponse.json({ error: "Invalid amount" }, { status: 400 });
    }

    const config = await getPaymentConfiguration();

    // Calculate breakdowns for both payment methods
    const cardBreakdown = getPaymentBreakdown(amount, "card", config);
    const achBreakdown = getPaymentBreakdown(amount, "us_bank_account", config);

    return NextResponse.json({
      config: {
        cardFeePercentage: config.cardFeePercentage,
        cardFeeFixed: config.cardFeeFixed,
        achFeePercentage: config.achFeePercentage,
        achFeeCap: config.achFeeCap,
      },
      breakdowns: {
        card: cardBreakdown,
        us_bank_account: achBreakdown,
      },
    });
  } catch (error) {
    console.error("Failed to get payment config:", error);
    return NextResponse.json({ error: "Failed to get payment configuration" }, { status: 500 });
  }
}
