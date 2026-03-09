import { unstable_cache } from "next/cache";
import { contentfulClient } from "./contentful";
import type { BoardMemberSkeleton, BoardMemberFields } from "@/types/contentful";

async function getBoardMembersUncached(): Promise<BoardMemberFields[]> {
  try {
    const res = await contentfulClient.getEntries<BoardMemberSkeleton>({
      content_type: "boardMember",
      include: 2,
    });

    if (!res.items.length) {
      return [];
    }

    const members = res.items.map((item) => item.fields as BoardMemberFields);

    return members.sort((a, b) => a.displayOrder - b.displayOrder);
  } catch (error) {
    console.warn("Failed to fetch board members:", error);
    return [];
  }
}

export const getBoardMembers = unstable_cache(getBoardMembersUncached, ["board-data"], {
  revalidate: 86400,
  tags: ["board"],
});
