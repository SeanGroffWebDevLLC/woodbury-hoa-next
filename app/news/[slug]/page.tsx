import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getNewsArticleBySlug, getNewsArticles } from "@/app/lib/use-news-articles";
import { formatDate } from "@/lib/utils";
import { documentToHtmlString } from "@contentful/rich-text-html-renderer";

interface Props {
  params: Promise<{ slug: string }>;
}

function getStringValue(value: unknown): string | null {
  if (typeof value === "string") {
    return value;
  }
  if (value && typeof value === "object" && "fields" in value) {
    const fields = (value as { fields: Record<string, unknown> }).fields;
    if (fields.name && typeof fields.name === "string") return fields.name;
    if (fields.title && typeof fields.title === "string") return fields.title;
  }
  return null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = await getNewsArticleBySlug(slug);

  if (!article) {
    return {
      title: "Article Not Found",
    };
  }

  return {
    title: typeof article.title === "string" ? article.title : "News Article",
    description: typeof article.excerpt === "string" ? article.excerpt : undefined,
  };
}

export async function generateStaticParams() {
  const articles = await getNewsArticles();

  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export default async function NewsArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = await getNewsArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const htmlContent = article.body ? documentToHtmlString(article.body) : "";
  const categoryName = article.categoryTags?.[0] ? getStringValue(article.categoryTags[0]) : null;
  const authorName = getStringValue(article.author);
  const title = typeof article.title === "string" ? article.title : "Untitled";
  const createdAt = typeof article.createdAt === "string" ? article.createdAt : null;

  return (
    <article className="container mx-auto px-4 py-12">
      <div className="mx-auto max-w-3xl">
        <Button variant="ghost" asChild className="mb-6">
          <Link href="/news">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to News
          </Link>
        </Button>

        <header className="mb-8">
          <div className="mb-4 flex items-center gap-3">
            {categoryName && <Badge variant="secondary">{categoryName}</Badge>}
            {createdAt && (
              <span className="text-muted-foreground text-sm">{formatDate(createdAt)}</span>
            )}
          </div>
          <h1 className="text-hoa-navy mb-4 text-3xl font-bold md:text-4xl">{title}</h1>
          {authorName && <p className="text-muted-foreground">By {authorName}</p>}
        </header>

        <div
          className="prose prose-slate prose-headings:text-hoa-navy prose-a:text-hoa-blue prose-a:no-underline hover:prose-a:underline max-w-none"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
      </div>
    </article>
  );
}
