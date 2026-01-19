"use client";

import { useState } from "react";
import { AlertCircle, CheckCircle, Lightbulb, Mail, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

type InquiryType = "complaint" | "suggestion" | "general";

interface FormData {
  inquiryType: InquiryType;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

const inquiryTypes = [
  { value: "general" as InquiryType, label: "General Inquiry", icon: Mail },
  { value: "complaint" as InquiryType, label: "Submit a Complaint", icon: AlertCircle },
  { value: "suggestion" as InquiryType, label: "Submit a Suggestion", icon: Lightbulb },
];

export function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    inquiryType: "general",
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  if (isSubmitted) {
    return (
      <Alert className="border-hoa-blue bg-hoa-blue/10">
        <CheckCircle className="text-hoa-blue h-4 w-4" />
        <AlertTitle>Thank you for your submission!</AlertTitle>
        <AlertDescription>
          We have received your{" "}
          {formData.inquiryType === "complaint"
            ? "complaint"
            : formData.inquiryType === "suggestion"
              ? "suggestion"
              : "inquiry"}{" "}
          and will respond within 1-3 business days.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-hoa-navy">Send us a Message</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-3">
            <Label>What type of inquiry is this?</Label>
            <RadioGroup
              value={formData.inquiryType}
              onValueChange={(value) => handleChange("inquiryType", value)}
              className="grid gap-3 sm:grid-cols-3"
            >
              {inquiryTypes.map((type) => {
                const Icon = type.icon;
                return (
                  <Label
                    key={type.value}
                    htmlFor={type.value}
                    className={`hover:bg-accent flex cursor-pointer items-center gap-3 rounded-lg border p-4 transition-colors ${
                      formData.inquiryType === type.value
                        ? "border-hoa-blue bg-hoa-blue/5"
                        : "border-border"
                    }`}
                  >
                    <RadioGroupItem value={type.value} id={type.value} />
                    <Icon className="text-hoa-blue h-4 w-4" />
                    <span className="text-sm font-medium">{type.label}</span>
                  </Label>
                );
              })}
            </RadioGroup>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">
                Name <span className="text-destructive">*</span>
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                className={errors.name ? "border-destructive" : ""}
              />
              {errors.name && <p className="text-destructive text-sm">{errors.name}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">
                Email <span className="text-destructive">*</span>
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                className={errors.email ? "border-destructive" : ""}
              />
              {errors.email && <p className="text-destructive text-sm">{errors.email}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone (optional)</Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="subject">
              Subject <span className="text-destructive">*</span>
            </Label>
            <Input
              id="subject"
              value={formData.subject}
              onChange={(e) => handleChange("subject", e.target.value)}
              className={errors.subject ? "border-destructive" : ""}
            />
            {errors.subject && <p className="text-destructive text-sm">{errors.subject}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">
              Message <span className="text-destructive">*</span>
            </Label>
            <Textarea
              id="message"
              rows={5}
              value={formData.message}
              onChange={(e) => handleChange("message", e.target.value)}
              className={errors.message ? "border-destructive" : ""}
            />
            {errors.message && <p className="text-destructive text-sm">{errors.message}</p>}
          </div>

          <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto">
            {isSubmitting ? (
              "Submitting..."
            ) : (
              <>
                <Send className="mr-2 h-4 w-4" />
                Submit
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
