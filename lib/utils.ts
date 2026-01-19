import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { format, formatDistanceToNow, isAfter, isBefore, parseISO } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateString: string): string {
  return format(parseISO(dateString), "MMMM d, yyyy");
}

export function formatDateShort(dateString: string): string {
  return format(parseISO(dateString), "MMM d, yyyy");
}

export function formatDateTime(dateString: string): string {
  return format(parseISO(dateString), "MMMM d, yyyy 'at' h:mm a");
}

export function formatRelativeDate(dateString: string): string {
  return formatDistanceToNow(parseISO(dateString), { addSuffix: true });
}

export function isNewDocument(uploadDateString: string, daysThreshold = 30): boolean {
  const uploadDate = parseISO(uploadDateString);
  const thresholdDate = new Date();
  thresholdDate.setDate(thresholdDate.getDate() - daysThreshold);
  return isAfter(uploadDate, thresholdDate);
}

export function isUpcoming(dateString: string): boolean {
  return isAfter(parseISO(dateString), new Date());
}

export function isPast(dateString: string): boolean {
  return isBefore(parseISO(dateString), new Date());
}

export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}
