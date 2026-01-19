import { CreditCard, CheckCircle, AlertTriangle, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export function PaymentInfo() {
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
                  Pay securely online using credit card or bank transfer (coming soon)
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

            <div className="flex items-start gap-3">
              <CheckCircle className="text-hoa-blue mt-0.5 h-5 w-5" />
              <div>
                <p className="font-medium">Auto-Pay</p>
                <p className="text-muted-foreground text-sm">
                  Set up automatic payments to never miss a due date
                </p>
              </div>
            </div>
          </div>

          <Button className="mt-4" disabled>
            <CreditCard className="mr-2 h-4 w-4" />
            Online Payment (Coming Soon)
          </Button>
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
            <span className="text-muted-foreground">Quarterly Dues Due</span>
            <span className="font-medium">1st of Jan, Apr, Jul, Oct</span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span className="text-muted-foreground">Grace Period</span>
            <span className="font-medium">15 days</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Late Fee Applied After</span>
            <span className="font-medium">16th of the month</span>
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
