import { Hero } from "@/components/home/Hero";
import { QuickActions } from "@/components/home/QuickActions";
import { NewsGrid } from "@/components/home/NewsGrid";
import { EventsPreview } from "@/components/home/EventsPreview";
import { getNewsArticles } from "@/app/lib/use-news-articles";
import { getUpcomingEvents } from "@/app/lib/get-events";

export default async function HomePage() {
  const [articles, events] = await Promise.all([getNewsArticles(3), getUpcomingEvents(2)]);

  return (
    <>
      <Hero />
      <QuickActions />
      <NewsGrid articles={articles} />
      <EventsPreview events={events} />
    </>
  );
}
