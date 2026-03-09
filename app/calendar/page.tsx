import type { Metadata } from "next";

export const revalidate = 86400;

import { EventCalendar } from "@/components/calendar/EventCalendar";
import { getEvents } from "@/app/lib/get-events";

export const metadata: Metadata = {
  title: "Calendar",
  description: "View upcoming HOA events, meetings, and important dates",
};

export default async function CalendarPage() {
  const events = await getEvents();

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-hoa-navy mb-2 text-3xl font-bold md:text-4xl">Community Calendar</h1>
        <p className="text-muted-foreground max-w-2xl">
          Stay updated with HOA meetings, community events, maintenance schedules, and important
          deadlines.
        </p>
      </div>

      <EventCalendar events={events} />
    </div>
  );
}
