"use client";

import { useState, useMemo } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { EventCard } from "./EventCard";
import { CalendarDays } from "lucide-react";
import type { EventFields, EventType } from "@/types/contentful";
import { EVENT_TYPES } from "@/types/contentful";
import { parseISO, isSameDay, isSameMonth } from "date-fns";

interface EventCalendarProps {
  events: EventFields[];
}

export function EventCalendar({ events }: EventCalendarProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [typeFilter, setTypeFilter] = useState<EventType | "all">("all");

  const eventDates = useMemo(() => {
    return events.map((event) => parseISO(event.startDate));
  }, [events]);

  const filteredEvents = useMemo(() => {
    let filtered = events;

    if (typeFilter !== "all") {
      filtered = filtered.filter((event) => event.eventType === typeFilter);
    }

    if (selectedDate) {
      filtered = filtered.filter((event) => isSameDay(parseISO(event.startDate), selectedDate));
    } else {
      filtered = filtered.filter((event) => isSameMonth(parseISO(event.startDate), currentMonth));
    }

    return filtered;
  }, [events, selectedDate, currentMonth, typeFilter]);

  const eventTypes = Object.keys(EVENT_TYPES) as EventType[];

  if (events.length === 0) {
    return (
      <div className="py-12 text-center">
        <CalendarDays className="text-muted-foreground mx-auto mb-4 h-12 w-12" />
        <p className="text-muted-foreground">No events scheduled at this time.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[350px_1fr]">
      <div className="space-y-4">
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={setSelectedDate}
          month={currentMonth}
          onMonthChange={setCurrentMonth}
          modifiers={{
            hasEvent: eventDates,
          }}
          modifiersStyles={{
            hasEvent: {
              fontWeight: "bold",
              backgroundColor: "hsl(var(--hoa-blue) / 0.2)",
              borderRadius: "100%",
            },
          }}
          className="rounded-md border"
        />

        {selectedDate && (
          <button
            onClick={() => setSelectedDate(undefined)}
            className="text-hoa-blue w-full text-sm hover:underline"
          >
            Clear date filter
          </button>
        )}

        <div className="space-y-2">
          <p className="text-muted-foreground text-sm font-medium">Filter by type:</p>
          <div className="flex flex-wrap gap-2">
            <Badge
              variant={typeFilter === "all" ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => setTypeFilter("all")}
            >
              All
            </Badge>
            {eventTypes.map((type) => (
              <Badge
                key={type}
                variant={typeFilter === type ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => setTypeFilter(type)}
              >
                {EVENT_TYPES[type]}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-hoa-navy text-lg font-semibold">
          {selectedDate
            ? `Events on ${selectedDate.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}`
            : `Events in ${currentMonth.toLocaleDateString("en-US", { month: "long", year: "numeric" })}`}
        </h2>

        {filteredEvents.length === 0 ? (
          <p className="text-muted-foreground py-8 text-center">
            No events found for the selected criteria.
          </p>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {filteredEvents.map((event, index) => (
              <EventCard key={`${event.title}-${index}`} event={event} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
