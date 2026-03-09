import { unstable_cache } from "next/cache";
import { contentfulClient } from "./contentful";
import type { PageContentSkeleton, PageContentFields } from "@/types/contentful";

async function getPageContentUncached(slug: string): Promise<PageContentFields | null> {
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

const getPageContentCached = unstable_cache(getPageContentUncached, ["page-content"], {
  revalidate: 86400,
  tags: ["pages"],
});

export async function getPageContent(slug: string): Promise<PageContentFields | null> {
  return getPageContentCached(slug);
}
