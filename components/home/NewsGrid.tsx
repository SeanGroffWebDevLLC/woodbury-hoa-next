import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatDateShort } from "@/lib/utils";
import type { BlogPostFields } from "@/types/contentful";

interface NewsGridProps {
  articles: BlogPostFields[];
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

export function NewsGrid({ articles }: NewsGridProps) {
  if (articles.length === 0) {
    return (
      <section className="bg-muted/50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-hoa-navy mb-8 text-center text-2xl font-bold md:text-3xl">
            Recent News
          </h2>
          <p className="text-muted-foreground text-center">
            No news articles available at this time. Check back soon!
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-muted/50 py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-hoa-navy mb-8 text-center text-2xl font-bold md:text-3xl">
          Recent News
        </h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => {
            const categoryName = getStringValue(article.category);
            const title = typeof article.title === "string" ? article.title : "Untitled";
            const excerpt = typeof article.excerpt === "string" ? article.excerpt : null;
            const createdAt = typeof article.createdAt === "string" ? article.createdAt : null;

            return (
              <Card key={article.slug} className="flex flex-col">
                <CardHeader>
                  <div className="mb-2 flex items-center gap-2">
                    {categoryName && (
                      <Badge variant="secondary" className="text-xs">
                        {categoryName}
                      </Badge>
                    )}
                    {createdAt && (
                      <span className="text-muted-foreground text-xs">
                        {formatDateShort(createdAt)}
                      </span>
                    )}
                  </div>
                  <CardTitle className="text-hoa-navy line-clamp-2 text-lg">{title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-1">
                  {excerpt && (
                    <p className="text-muted-foreground line-clamp-3 text-sm">{excerpt}</p>
                  )}
                </CardContent>
                <CardFooter>
                  <Link
                    href={`/news/${article.slug}`}
                    className="text-hoa-blue hover:text-hoa-blue-dark inline-flex items-center text-sm font-medium"
                  >
                    Read More
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </CardFooter>
              </Card>
            );
          })}
        </div>
        <div className="mt-8 text-center">
          <Button asChild variant="outline">
            <Link href="/news">
              View All News
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
