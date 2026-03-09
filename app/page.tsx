export const revalidate = 86400;

import { Hero } from "@/components/home/Hero";
import { QuickActions } from "@/components/home/QuickActions";
import { NewsGrid } from "@/components/home/NewsGrid";
import { EventsPreview } from "@/components/home/EventsPreview";
import { getNewsArticles } from "@/app/lib/use-news-articles";
import { getUpcomingEvents } from "@/app/lib/get-events";
import { getMainLogo } from "@/app/lib/get-logos";

export default async function HomePage() {
  const [articles, events, mainLogo] = await Promise.all([
    getNewsArticles(3),
    getUpcomingEvents(2),
    getMainLogo(),
  ]);

  return (
    <>
      <Hero logo={mainLogo} />
      <QuickActions />
      <NewsGrid articles={articles} />
      <EventsPreview events={events} />
    </>
  );
}
