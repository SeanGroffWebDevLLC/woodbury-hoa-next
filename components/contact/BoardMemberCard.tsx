import { Mail, Phone } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { getInitials } from "@/lib/utils";
import type { BoardMemberFields } from "@/types/contentful";

interface BoardMemberCardProps {
  member: BoardMemberFields;
}

export function BoardMemberCard({ member }: BoardMemberCardProps) {
  return (
    <Card>
      <CardContent className="flex items-center gap-4 p-6">
        <Avatar className="bg-hoa-navy h-16 w-16 text-white">
          <AvatarFallback className="bg-hoa-navy text-lg font-semibold text-white">
            {getInitials(member.name)}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <h3 className="text-hoa-navy font-semibold">{member.name}</h3>
          <p className="text-muted-foreground mb-2 text-sm">{member.position}</p>
          <div className="space-y-1">
            <a
              href={`mailto:${member.email}`}
              className="text-hoa-blue flex items-center gap-2 text-sm hover:underline"
            >
              <Mail className="h-4 w-4" />
              {member.email}
            </a>
            {member.phone && (
              <a
                href={`tel:${member.phone}`}
                className="text-hoa-blue flex items-center gap-2 text-sm hover:underline"
              >
                <Phone className="h-4 w-4" />
                {member.phone}
              </a>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
