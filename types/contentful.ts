import type { Document } from "@contentful/rich-text-types";
import type { Asset, Entry, EntrySkeletonType } from "contentful";

// Blog Post / News Article
export interface BlogPostFields {
  title: string;
  slug: string;
  body: Document;
  author?: Entry<EntrySkeletonType>;
  createdAt: string;
  categoryTags?: Entry<EntrySkeletonType>[];
  excerpt?: string;
  featuredImage?: Asset;
}

export interface BlogPostSkeleton extends EntrySkeletonType {
  contentTypeId: "blogPost";
  fields: BlogPostFields;
}

export type BlogPostEntry = Entry<BlogPostSkeleton>;

// Page Content
export interface PageContentFields {
  title?: string;
  slug: string;
  header: string;
  description: string;
}

export interface PageContentSkeleton extends EntrySkeletonType {
  contentTypeId: "pageContent";
  fields: PageContentFields;
}

export type PageContentEntry = Entry<PageContentSkeleton>;

// Document (HOA Documents like Bylaws, CCRs, etc.)
export interface DocumentFields {
  title: string;
  category: "bylaws" | "financials" | "meeting-minutes" | "forms";
  file: Asset;
  uploadDate: string;
  description?: string;
  isNew?: boolean;
}

export interface DocumentSkeleton extends EntrySkeletonType {
  contentTypeId: "document";
  fields: DocumentFields;
}

export type DocumentEntry = Entry<DocumentSkeleton>;

// External Link (for footer links like Fire Dept, Police, etc.)
export interface ExternalLinkFields {
  title: string;
  url: string;
  category: "emergency" | "government" | "utilities";
  icon?: string;
  displayOrder: number;
}

export interface ExternalLinkSkeleton extends EntrySkeletonType {
  contentTypeId: "externalLink";
  fields: ExternalLinkFields;
}

export type ExternalLinkEntry = Entry<ExternalLinkSkeleton>;

// Board Member
export interface BoardMemberFields {
  photo: Asset;
  name: string;
  position: string;
  bio?: string;
  displayOrder: number;
}

export interface BoardMemberSkeleton extends EntrySkeletonType {
  contentTypeId: "boardMember";
  fields: BoardMemberFields;
}

export type BoardMemberEntry = Entry<BoardMemberSkeleton>;

// Fee Schedule
export interface FeeScheduleFields {
  title: string;
  amount: number;
  frequency: "monthly" | "quarterly" | "annually" | "one-time";
  description: string;
  dueDate?: string;
}

export interface FeeScheduleSkeleton extends EntrySkeletonType {
  contentTypeId: "feeSchedule";
  fields: FeeScheduleFields;
}

export type FeeScheduleEntry = Entry<FeeScheduleSkeleton>;

// Event (for Calendar)
export interface EventFields {
  title: string;
  description?: string;
  startDate: string;
  endDate?: string;
  location?: string;
  eventType: "meeting" | "social" | "maintenance" | "deadline";
}

export interface EventSkeleton extends EntrySkeletonType {
  contentTypeId: "event";
  fields: EventFields;
}

export type EventEntry = Entry<EventSkeleton>;

// Main Logo (logo with or without text)
export interface MainLogoFields {
  logo: Asset;
}

export interface MainLogoSkeleton extends EntrySkeletonType {
  contentTypeId: "mainLogo";
  fields: MainLogoFields;
}

export type MainLogoEntry = Entry<MainLogoSkeleton>;

// Helper type for document categories
export const DOCUMENT_CATEGORIES = {
  bylaws: "Bylaws & CCRs",
  financials: "Financials",
  "meeting-minutes": "Meeting Minutes",
  forms: "Forms",
} as const;

export type DocumentCategory = keyof typeof DOCUMENT_CATEGORIES;

// Helper type for event types
export const EVENT_TYPES = {
  meeting: "Meeting",
  social: "Social Event",
  maintenance: "Maintenance",
  deadline: "Deadline",
} as const;

export type EventType = keyof typeof EVENT_TYPES;
