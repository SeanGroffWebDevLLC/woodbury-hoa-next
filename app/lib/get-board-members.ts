import { contentfulClient } from "./contentful";
import type { BoardMemberSkeleton, BoardMemberFields } from "@/types/contentful";

export async function getBoardMembers(): Promise<BoardMemberFields[]> {
  try {
    const res = await contentfulClient.getEntries<BoardMemberSkeleton>({
      content_type: "boardMember",
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
