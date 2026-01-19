import { DollarSign } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatCurrency, formatFrequency } from "@/app/lib/get-fee-schedule";
import type { FeeScheduleFields } from "@/types/contentful";

interface FeeScheduleProps {
  fees: FeeScheduleFields[];
}

export function FeeSchedule({ fees }: FeeScheduleProps) {
  if (fees.length === 0) {
    return (
      <div className="py-12 text-center">
        <DollarSign className="text-muted-foreground mx-auto mb-4 h-12 w-12" />
        <p className="text-muted-foreground">Fee schedule information coming soon.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {fees.map((fee, index) => (
        <Card key={`${fee.title}-${index}`}>
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <CardTitle className="text-hoa-navy text-lg">{fee.title}</CardTitle>
              <Badge variant="secondary">{formatFrequency(fee.frequency)}</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-hoa-blue mb-3 text-3xl font-bold">{formatCurrency(fee.amount)}</p>
            <p className="text-muted-foreground text-sm">{fee.description}</p>
            {fee.dueDate && (
              <p className="mt-3 text-sm">
                <span className="font-medium">Due: </span>
                {fee.dueDate}
              </p>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
