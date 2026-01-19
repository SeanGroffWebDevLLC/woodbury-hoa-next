import { contentfulClient } from "./contentful";
import type { PageContentSkeleton, PageContentFields } from "@/types/contentful";

export async function getPageContent(slug: string): Promise<PageContentFields | null> {
  const res = await contentfulClient.getEntries<PageContentSkeleton>({
    content_type: "pageContent",
  });

  if (!res.items.length) {
    console.warn(`No pageContent found for slug: ${slug}`);
    return null;
  }

  const entry = res.items.find((item) => item.fields.slug === slug);

  if (!entry) {
    console.warn(`No pageContent found for slug: ${slug}`);
    return null;
  }

  return {
    header: entry.fields.header,
    description: entry.fields.description,
    title: entry.fields.title ?? "",
    slug: entry.fields.slug,
  };
}
