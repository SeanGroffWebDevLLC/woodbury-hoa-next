import { unstable_cache } from "next/cache";
import { contentfulClient } from "./contentful";
import type { ExternalLinkSkeleton, ExternalLinkFields } from "@/types/contentful";

async function getExternalLinksUncached(): Promise<ExternalLinkFields[]> {
  try {
    const res = await contentfulClient.getEntries<ExternalLinkSkeleton>({
      content_type: "externalLink",
    });

    if (!res.items.length) {
      return [];
    }

    const links = res.items.map((item) => item.fields as ExternalLinkFields);

    return links.sort((a, b) => a.displayOrder - b.displayOrder);
  } catch (error) {
    console.warn("Failed to fetch external links:", error);
    return [];
  }
}

export const getExternalLinks = unstable_cache(getExternalLinksUncached, ["links-data"], {
  revalidate: 86400,
  tags: ["links"],
});

export async function getExternalLinksByCategory(
  category: "emergency" | "government" | "utilities"
): Promise<ExternalLinkFields[]> {
  const allLinks = await getExternalLinks();

  return allLinks.filter((link) => link.category === category);
}

export async function getExternalLinksGroupedByCategory(): Promise<
  Record<"emergency" | "government" | "utilities", ExternalLinkFields[]>
> {
  const links = await getExternalLinks();

  const grouped: Record<"emergency" | "government" | "utilities", ExternalLinkFields[]> = {
    emergency: [],
    government: [],
    utilities: [],
  };

  for (const link of links) {
    if (grouped[link.category]) {
      grouped[link.category].push(link);
    }
  }

  return grouped;
}
