import { NextRequest, NextResponse } from "next/server";
import { resend } from "@/app/lib/resend";
import { contactFormSchema } from "@/app/lib/schemas/contact";
import { ContactFormEmail } from "@/components/emails/ContactFormEmail";

// Simple in-memory rate limiting (resets on server restart)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_MAX = 3;
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const rateData = rateLimitMap.get(ip);

  if (!rateData || now > rateData.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  if (rateData.count >= RATE_LIMIT_MAX) {
    return true;
  }

  rateData.count++;
  return false;
}

const inquiryLabels = {
  general: "General Inquiry",
  complaint: "Complaint",
  suggestion: "Suggestion",
} as const;

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0] ||
      request.headers.get("x-real-ip") ||
      "unknown";

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    const body = await request.json();

    // Validate input
    const result = contactFormSchema.safeParse(body);
    if (!result.success) {
      const errors = result.error.flatten().fieldErrors;
      return NextResponse.json({ error: "Validation failed", errors }, { status: 400 });
    }

    const { inquiryType, name, email, subject, message, honeypot } = result.data;

    // Honeypot check - if filled, silently succeed (don't alert bots)
    if (honeypot) {
      return NextResponse.json({ success: true });
    }

    // Get recipient email from environment
    const toEmail = process.env.CONTACT_FORM_EMAIL;
    if (!toEmail) {
      console.error("CONTACT_FORM_EMAIL is not set");
      return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
    }

    // Get from email (defaults to Resend's onboarding address)
    const fromEmail = process.env.RESEND_FROM_EMAIL || "HOA Contact <onboarding@resend.dev>";

    // Send email
    const { error } = await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      replyTo: email,
      subject: `[${inquiryLabels[inquiryType]}] ${subject}`,
      react: ContactFormEmail({
        inquiryType,
        name,
        email,
        subject,
        message,
      }),
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
  }
}
