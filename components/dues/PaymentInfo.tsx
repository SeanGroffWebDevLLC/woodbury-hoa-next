import { CreditCard, CheckCircle, AlertTriangle, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { PaymentMethodSelector } from "./PaymentMethodSelector";
import type { FeeScheduleFields } from "@/types/contentful";

interface PaymentInfoProps {
  annualDues: FeeScheduleFields | null;
}

/**
 * Calculates the late fee date by adding 30 days (grace period) to the due date
 * Parses dates like "May 1st" and returns "May 31st"
 */
function getLateFeeDate(dueDate: string): string {
  // Parse month from dueDate string (e.g., "May 1st" -> "May")
  const monthMatch = dueDate.match(/^(\w+)/);
  if (!monthMatch) return dueDate;

  const month = monthMatch[1];
  const monthDays: Record<string, number> = {
    January: 31,
    February: 28,
    March: 31,
    April: 30,
    May: 31,
    June: 30,
    July: 31,
    August: 31,
    September: 30,
    October: 31,
    November: 30,
    December: 31,
  };

  const lastDay = monthDays[month] || 31;
  return `${month} ${lastDay}st`;
}

export function PaymentInfo({ annualDues }: PaymentInfoProps) {
  const dueDate = annualDues?.dueDate || "May 1st";
  const lateFeeDate = getLateFeeDate(dueDate);
  const amountInCents = annualDues ? annualDues.amount * 100 : 40000;
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-hoa-navy flex items-center gap-2">
            <CreditCard className="text-hoa-blue h-5 w-5" />
            How to Pay
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            HOA dues can be paid through the following methods:
          </p>

          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <CheckCircle className="text-hoa-blue mt-0.5 h-5 w-5" />
              <div>
                <p className="font-medium">Online Payment Portal</p>
                <p className="text-muted-foreground text-sm">
                  Pay securely via Stripe using credit/debit card or bank account (ACH). Processing
                  fees are added at checkout. Bank transfers have lower fees.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle className="text-hoa-blue mt-0.5 h-5 w-5" />
              <div>
                <p className="font-medium">Check by Mail</p>
                <p className="text-muted-foreground text-sm">
                  Make checks payable to &quot;Woodbury Estates HOA Phase 6&quot; and mail to the
                  address provided in your statement
                </p>
              </div>
            </div>
          </div>

          <PaymentMethodSelector
            amount={amountInCents}
            feeTitle={annualDues?.title || "Annual HOA Dues"}
            description="Woodbury Estates HOA Phase 6 - Annual Dues Payment"
            className="bg-hoa-blue hover:bg-hoa-blue/90 mt-4 w-full"
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-hoa-navy flex items-center gap-2">
            <Calendar className="text-hoa-blue h-5 w-5" />
            Important Dates
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between border-b pb-2">
            <span className="text-muted-foreground">Annual Dues Due</span>
            <span className="font-medium">{dueDate}</span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span className="text-muted-foreground">Grace Period</span>
            <span className="font-medium">30 days</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Late Fee Applied After</span>
            <span className="font-medium">{lateFeeDate}</span>
          </div>
        </CardContent>
      </Card>

      <Alert>
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Late Payment Policy</AlertTitle>
        <AlertDescription>
          Payments received after the grace period will incur a late fee. Please ensure your
          payments are submitted on time to avoid additional charges. Contact the HOA office if you
          have questions about your account.
        </AlertDescription>
      </Alert>
    </div>
  );
}
