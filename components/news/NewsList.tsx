"use client";

import { useState, useMemo } from "react";
import { Search, Newspaper } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { NewsCard } from "./NewsCard";
import type { BlogPostFields } from "@/types/contentful";

interface NewsListProps {
  articles: BlogPostFields[];
}

export function NewsList({ articles }: NewsListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);

  const categories = useMemo(() => {
    const cats = new Set<string>();
    articles.forEach((article) => {
      if (article.category) {
        cats.add(article.category);
      }
    });
    return Array.from(cats);
  }, [articles]);

  const filteredArticles = useMemo(() => {
    let filtered = articles;

    if (categoryFilter) {
      filtered = filtered.filter((article) => article.category === categoryFilter);
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (article) =>
          article.title.toLowerCase().includes(query) ||
          article.excerpt?.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [articles, searchQuery, categoryFilter]);

  if (articles.length === 0) {
    return (
      <div className="py-12 text-center">
        <Newspaper className="text-muted-foreground mx-auto mb-4 h-12 w-12" />
        <p className="text-muted-foreground">No news articles available at this time.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative max-w-sm flex-1">
          <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
          <Input
            type="search"
            placeholder="Search news..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {categories.length > 0 && (
          <div className="flex flex-wrap gap-2">
            <Badge
              variant={categoryFilter === null ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => setCategoryFilter(null)}
            >
              All
            </Badge>
            {categories.map((category) => (
              <Badge
                key={category}
                variant={categoryFilter === category ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => setCategoryFilter(category)}
              >
                {category}
              </Badge>
            ))}
          </div>
        )}
      </div>

      {filteredArticles.length === 0 ? (
        <p className="text-muted-foreground py-8 text-center">
          No articles found matching your criteria.
        </p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredArticles.map((article) => (
            <NewsCard key={article.slug} article={article} />
          ))}
        </div>
      )}
    </div>
  );
}
