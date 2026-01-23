import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { getInitials } from "@/lib/utils";
import type { BoardMemberFields } from "@/types/contentful";

interface BoardMemberCardProps {
  member: BoardMemberFields;
}

export function BoardMemberCard({ member }: BoardMemberCardProps) {
  const photoUrl = member.photo?.fields?.file?.url ? `https:${member.photo.fields.file.url}` : null;

  return (
    <Card>
      <CardContent className="flex items-center gap-4 p-6">
        {photoUrl ? (
          <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full">
            <Image src={photoUrl} alt={member.name} fill className="object-cover" />
          </div>
        ) : (
          <Avatar className="bg-hoa-navy h-16 w-16 text-white">
            <AvatarFallback className="bg-hoa-navy text-lg font-semibold text-white">
              {getInitials(member.name)}
            </AvatarFallback>
          </Avatar>
        )}
        <div className="flex-1">
          <h3 className="text-hoa-navy font-semibold">{member.name}</h3>
          <p className="text-muted-foreground text-sm">{member.position}</p>
        </div>
      </CardContent>
    </Card>
  );
}
