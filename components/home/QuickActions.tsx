import Link from "next/link";
import { FileText, CalendarDays, DollarSign, Mail } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const actions = [
  {
    href: "/documents",
    icon: FileText,
    label: "Documents",
    description: "Access bylaws, forms, and official documents",
  },
  {
    href: "/calendar",
    icon: CalendarDays,
    label: "Calendar",
    description: "View upcoming events and meetings",
  },
  {
    href: "/dues",
    icon: DollarSign,
    label: "Pay Dues",
    description: "View fees and payment information",
  },
  {
    href: "/contact",
    icon: Mail,
    label: "Contact Us",
    description: "Submit inquiries or suggestions",
  },
];

export function QuickActions() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-hoa-navy mb-8 text-center text-2xl font-bold md:text-3xl">
          Quick Actions
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {actions.map((action) => {
            const Icon = action.icon;
            return (
              <Link key={action.href} href={action.href} className="group">
                <Card className="hover:border-hoa-blue h-full transition-all duration-200 hover:shadow-lg">
                  <CardContent className="flex flex-col items-center p-6 text-center">
                    <div className="bg-hoa-blue/10 group-hover:bg-hoa-blue/20 mb-4 rounded-full p-4 transition-colors">
                      <Icon className="text-hoa-blue h-8 w-8" />
                    </div>
                    <h3 className="text-hoa-navy mb-2 text-lg font-semibold">{action.label}</h3>
                    <p className="text-muted-foreground text-sm">{action.description}</p>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
