import { contentfulClient } from "./contentful";
import type { EventSkeleton, EventFields, EventType, EVENT_TYPES } from "@/types/contentful";

export async function getEvents(): Promise<EventFields[]> {
  try {
    const res = await contentfulClient.getEntries<EventSkeleton>({
      content_type: "event",
    });

    if (!res.items.length) {
      return [];
    }

    const events = res.items.map((item) => item.fields as EventFields);

    return events.sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());
  } catch (error) {
    console.warn("Failed to fetch events:", error);
    return [];
  }
}

export async function getUpcomingEvents(limit?: number): Promise<EventFields[]> {
  const allEvents = await getEvents();
  const now = new Date();

  const upcomingEvents = allEvents.filter(
    (event) => new Date(event.startDate).getTime() >= now.getTime()
  );

  return limit ? upcomingEvents.slice(0, limit) : upcomingEvents;
}

export async function getEventsByType(type: EventType): Promise<EventFields[]> {
  const allEvents = await getEvents();

  return allEvents.filter((event) => event.eventType === type);
}

export { EVENT_TYPES };
