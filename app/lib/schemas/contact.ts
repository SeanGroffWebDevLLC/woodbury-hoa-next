import { z } from "zod";

export const inquiryTypes = ["general", "complaint", "suggestion"] as const;
export type InquiryType = (typeof inquiryTypes)[number];

export const contactFormSchema = z.object({
  inquiryType: z.enum(inquiryTypes),
  name: z.string().min(1, "Name is required").max(100, "Name is too long"),
  email: z.email({ message: "Please enter a valid email address" }).max(255, "Email is too long"),
  subject: z.string().min(1, "Subject is required").max(200, "Subject is too long"),
  message: z.string().min(1, "Message is required").max(5000, "Message is too long"),
  honeypot: z.string().max(0, "Bot detected").optional().default(""),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
