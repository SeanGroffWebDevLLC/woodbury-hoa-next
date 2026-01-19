import { CalendarDays, Clock, MapPin } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDate, formatDateTime } from "@/lib/utils";
import type { EventFields } from "@/types/contentful";
import { EVENT_TYPES } from "@/types/contentful";

interface EventCardProps {
  event: EventFields;
}

export function EventCard({ event }: EventCardProps) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="mb-2">
          <Badge variant="outline" className="border-hoa-blue text-hoa-blue">
            {EVENT_TYPES[event.eventType]}
          </Badge>
        </div>
        <CardTitle className="text-hoa-navy text-lg">{event.title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="text-muted-foreground flex items-center gap-2 text-sm">
          <CalendarDays className="text-hoa-blue h-4 w-4" />
          <span>{formatDate(event.startDate)}</span>
        </div>
        <div className="text-muted-foreground flex items-center gap-2 text-sm">
          <Clock className="text-hoa-blue h-4 w-4" />
          <span>{formatDateTime(event.startDate).split(" at ")[1]}</span>
          {event.endDate && <span> - {formatDateTime(event.endDate).split(" at ")[1]}</span>}
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
  );
}
