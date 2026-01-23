import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import type { InquiryType } from "@/app/lib/schemas/contact";

interface ContactFormEmailProps {
  inquiryType: InquiryType;
  name: string;
  email: string;
  subject: string;
  message: string;
}

const inquiryLabels: Record<InquiryType, string> = {
  general: "General Inquiry",
  complaint: "Complaint",
  suggestion: "Suggestion",
};

export function ContactFormEmail({
  inquiryType,
  name,
  email,
  subject,
  message,
}: ContactFormEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>
        {inquiryLabels[inquiryType]}: {subject}
      </Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={heading}>New Contact Form Submission</Heading>

          <Section style={infoSection}>
            <Text style={label}>Inquiry Type</Text>
            <Text style={value}>{inquiryLabels[inquiryType]}</Text>
          </Section>

          <Hr style={hr} />

          <Section style={infoSection}>
            <Text style={label}>From</Text>
            <Text style={value}>{name}</Text>
          </Section>

          <Section style={infoSection}>
            <Text style={label}>Email</Text>
            <Text style={value}>{email}</Text>
          </Section>

          <Hr style={hr} />

          <Section style={infoSection}>
            <Text style={label}>Subject</Text>
            <Text style={value}>{subject}</Text>
          </Section>

          <Section style={infoSection}>
            <Text style={label}>Message</Text>
            <Text style={messageValue}>{message}</Text>
          </Section>

          <Hr style={hr} />

          <Text style={footer}>
            This message was sent from the Woodbury Estates HOA Phase 6 website contact form.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

const main = {
  backgroundColor: "#f6f9fc",
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Ubuntu, sans-serif',
};

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "20px 0 48px",
  marginBottom: "64px",
  borderRadius: "5px",
  maxWidth: "600px",
};

const heading = {
  fontSize: "24px",
  letterSpacing: "-0.5px",
  lineHeight: "1.3",
  fontWeight: "400",
  color: "#1a365d",
  padding: "17px 20px 0",
};

const infoSection = {
  padding: "0 20px",
};

const label = {
  fontSize: "12px",
  color: "#666666",
  textTransform: "uppercase" as const,
  letterSpacing: "0.5px",
  margin: "16px 0 4px",
};

const value = {
  fontSize: "16px",
  color: "#333333",
  margin: "0",
};

const messageValue = {
  fontSize: "16px",
  color: "#333333",
  margin: "0",
  whiteSpace: "pre-wrap" as const,
  lineHeight: "1.5",
};

const hr = {
  borderColor: "#e6ebf1",
  margin: "20px 0",
};

const footer = {
  fontSize: "12px",
  color: "#8898aa",
  padding: "0 20px",
  marginTop: "20px",
};
