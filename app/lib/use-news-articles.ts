import { contentfulClient } from "./contentful";
import type { BlogPostSkeleton, BlogPostFields } from "@/types/contentful";

export async function getNewsArticles(limit?: number): Promise<BlogPostFields[]> {
  try {
    const res = await contentfulClient.getEntries<BlogPostSkeleton>({
      content_type: "blogPost",
      include: 10,
    });

    if (!res.items.length) {
      return [];
    }

    let articles = res.items.map((item) => item.fields as BlogPostFields);

    articles = articles.sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    return limit ? articles.slice(0, limit) : articles;
  } catch (error) {
    console.warn("Failed to fetch news articles:", error);
    return [];
  }
}

export async function getNewsArticleBySlug(slug: string): Promise<BlogPostFields | null> {
  const allArticles = await getNewsArticles();

  return allArticles.find((article) => article.slug === slug) ?? null;
}
