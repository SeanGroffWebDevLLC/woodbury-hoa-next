import type { Metadata } from "next";

export const revalidate = 86400;

import { NewsList } from "@/components/news/NewsList";
import { getNewsArticles } from "@/app/lib/use-news-articles";

export const metadata: Metadata = {
  title: "News & Announcements",
  description:
    "Stay updated with the latest news and announcements from Woodbury Estates HOA Phase 6",
};

export default async function NewsPage() {
  const articles = await getNewsArticles();

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-hoa-navy mb-2 text-3xl font-bold md:text-4xl">News & Announcements</h1>
        <p className="text-muted-foreground max-w-2xl">
          Stay informed about community updates, events, and important announcements from the HOA.
        </p>
      </div>

      <NewsList articles={articles} />
    </div>
  );
}
