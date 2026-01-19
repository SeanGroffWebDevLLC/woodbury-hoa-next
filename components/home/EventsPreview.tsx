import Link from "next/link";
import { ArrowRight, CalendarDays, MapPin, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatDate, formatDateTime } from "@/lib/utils";
import type { EventFields } from "@/types/contentful";
import { EVENT_TYPES } from "@/types/contentful";

interface EventsPreviewProps {
  events: EventFields[];
}

export function EventsPreview({ events }: EventsPreviewProps) {
  if (events.length === 0) {
    return (
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-hoa-navy mb-8 text-center text-2xl font-bold md:text-3xl">
            Upcoming Events
          </h2>
          <p className="text-muted-foreground text-center">
            No upcoming events scheduled. Check the calendar for past events!
          </p>
          <div className="mt-8 text-center">
            <Button asChild variant="outline">
              <Link href="/calendar">
                View Calendar
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-hoa-navy mb-8 text-center text-2xl font-bold md:text-3xl">
          Upcoming Events
        </h2>
        <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
          {events.map((event, index) => (
            <Card key={`${event.title}-${index}`} className="flex flex-col">
              <CardHeader>
                <div className="mb-2">
                  <Badge variant="outline" className="border-hoa-blue text-hoa-blue">
                    {EVENT_TYPES[event.eventType]}
                  </Badge>
                </div>
                <CardTitle className="text-hoa-navy text-lg">{event.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-1 space-y-3">
                <div className="text-muted-foreground flex items-center gap-2 text-sm">
                  <CalendarDays className="text-hoa-blue h-4 w-4" />
                  <span>{formatDate(event.startDate)}</span>
                </div>
                <div className="text-muted-foreground flex items-center gap-2 text-sm">
                  <Clock className="text-hoa-blue h-4 w-4" />
                  <span>{formatDateTime(event.startDate).split(" at ")[1]}</span>
                </div>
                {event.location && (
                  <div className="text-muted-foreground flex items-center gap-2 text-sm">
                    <MapPin className="text-hoa-blue h-4 w-4" />
                    <span>{event.location}</span>
                  </div>
                )}
                {event.description && (
                  <p className="text-muted-foreground pt-2 text-sm">{event.description}</p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Button asChild variant="outline">
            <Link href="/calendar">
              View Full Calendar
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
