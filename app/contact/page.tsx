import type { Metadata } from "next";
import { Mail, MapPin, Users } from "lucide-react";
import { ContactForm } from "@/components/contact/ContactForm";
import { BoardMemberCard } from "@/components/contact/BoardMemberCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getBoardMembers } from "@/app/lib/get-board-members";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with the Woodbury Estates HOA Phase 6 board",
};

export default async function ContactPage() {
  const boardMembers = await getBoardMembers();

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-hoa-navy mb-2 text-3xl font-bold md:text-4xl">Contact Us</h1>
        <p className="text-muted-foreground max-w-2xl">
          Have a question, suggestion, or concern? We&apos;re here to help. Reach out to the HOA
          board through the form below or contact us directly.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_400px]">
        <div className="space-y-8">
          <ContactForm />

          {boardMembers.length > 0 && (
            <div>
              <div className="mb-4 flex items-center gap-2">
                <Users className="text-hoa-blue h-5 w-5" />
                <h2 className="text-hoa-navy text-xl font-semibold">Board Members</h2>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {boardMembers.map((member, index) => (
                  <BoardMemberCard key={`${member.name}-${index}`} member={member} />
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-hoa-navy flex items-center gap-2">
                <Mail className="text-hoa-blue h-5 w-5" />
                General Contact
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-muted-foreground text-sm font-medium">Email</p>
                <a href="mailto:woodburyestateshoa.phase6@gmail.com" className="text-hoa-blue hover:underline">
                  woodburyestateshoa.phase6@gmail.com
                </a>
              </div>
              <div>
                <p className="text-muted-foreground text-sm font-medium">Response Time</p>
                <p>We typically respond within 2-3 business days</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-hoa-navy flex items-center gap-2">
                <MapPin className="text-hoa-blue h-5 w-5" />
                Location
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Woodbury Estates HOA Phase 6
                <br />
                Grain Valley, MO
              </p>
            </CardContent>
          </Card>

          <Card className="border-hoa-blue bg-hoa-blue/5">
            <CardContent className="p-6">
              <h3 className="text-hoa-navy mb-2 font-semibold">Office Hours</h3>
              <p className="text-muted-foreground text-sm">
                Board meetings are held monthly. Check the calendar for upcoming meeting dates and
                times.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
