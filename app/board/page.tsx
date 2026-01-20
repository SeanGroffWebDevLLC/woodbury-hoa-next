import type { Metadata } from "next";
import Link from "next/link";
import { Mail, Users } from "lucide-react";
import { BoardMemberCard } from "@/components/board/BoardMemberCard";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getBoardMembers } from "@/app/lib/get-board-members";

export const metadata: Metadata = {
  title: "Meet the Board",
  description: "Meet the board members of Woodbury Estates HOA Phase 6",
};

export default async function BoardPage() {
  const boardMembers = await getBoardMembers();

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <div className="mb-2 flex items-center gap-2">
          <Users className="text-hoa-blue h-8 w-8" />
          <h1 className="text-hoa-navy text-3xl font-bold md:text-4xl">Meet the Board</h1>
        </div>
        <p className="text-muted-foreground max-w-2xl">
          Our dedicated board members volunteer their time to help maintain and improve our
          community. Get to know the people working to make Woodbury Estates a great place to live.
        </p>
      </div>

      {boardMembers.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {boardMembers.map((member, index) => (
            <BoardMemberCard key={`${member.name}-${index}`} member={member} />
          ))}
        </div>
      ) : (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-12 text-center">
            <Users className="text-muted-foreground mb-4 h-12 w-12" />
            <h3 className="text-lg font-semibold">Board Members Coming Soon</h3>
            <p className="text-muted-foreground mb-4 max-w-md">
              Information about our board members will be available shortly.
            </p>
          </CardContent>
        </Card>
      )}

      <Card className="border-hoa-blue bg-hoa-blue/5 mt-8">
        <CardContent className="flex flex-col items-center gap-4 p-6 text-center sm:flex-row sm:text-left">
          <div className="flex-1">
            <h3 className="text-hoa-navy mb-1 font-semibold">Have Questions for the Board?</h3>
            <p className="text-muted-foreground text-sm">
              Contact us through our contact form or email us directly at{" "}
              <a
                href="mailto:woodburyestateshoa.phase6@gmail.com"
                className="text-hoa-blue hover:underline"
              >
                woodburyestateshoa.phase6@gmail.com
              </a>
            </p>
          </div>
          <Button asChild>
            <Link href="/contact">
              <Mail className="mr-2 h-4 w-4" />
              Contact Us
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
