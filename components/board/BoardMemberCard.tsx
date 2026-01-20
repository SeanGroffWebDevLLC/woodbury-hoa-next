import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import type { BoardMemberFields } from "@/types/contentful";

interface BoardMemberCardProps {
  member: BoardMemberFields;
}

export function BoardMemberCard({ member }: BoardMemberCardProps) {
  const photoUrl = member.photo?.fields?.file?.url
    ? `https:${member.photo.fields.file.url}`
    : null;
  const photoDetails = member.photo?.fields?.file?.details as
    | { image?: { width: number; height: number } }
    | undefined;

  return (
    <Card className="overflow-hidden">
      <div className="bg-muted aspect-square relative">
        {photoUrl ? (
          <Image
            src={photoUrl}
            alt={member.name}
            width={photoDetails?.image?.width ?? 400}
            height={photoDetails?.image?.height ?? 400}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-slate-200 to-slate-300">
            <span className="text-6xl font-bold text-slate-400">
              {member.name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase()}
            </span>
          </div>
        )}
      </div>
      <CardContent className="p-6">
        <h3 className="text-xl font-semibold">{member.name}</h3>
        <p className="text-primary mb-3 font-medium">{member.position}</p>
        {member.bio && (
          <p className="text-muted-foreground text-sm">{member.bio}</p>
        )}
      </CardContent>
    </Card>
  );
}
