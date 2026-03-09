import { unstable_cache } from "next/cache";
import { contentfulClient } from "./contentful";
import type {
  DocumentSkeleton,
  DocumentFields,
  DocumentCategory,
  DOCUMENT_CATEGORIES,
} from "@/types/contentful";

async function getDocumentsUncached(): Promise<DocumentFields[]> {
  try {
    const res = await contentfulClient.getEntries<DocumentSkeleton>({
      content_type: "document",
      include: 10,
    });

    if (!res.items.length) {
      return [];
    }

    const docs = res.items.map((item) => item.fields as DocumentFields);

    return docs.sort((a, b) => new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime());
  } catch (error) {
    console.warn("Failed to fetch documents:", error);
    return [];
  }
}

export const getDocuments = unstable_cache(getDocumentsUncached, ["documents-data"], {
  revalidate: 86400,
  tags: ["documents"],
});

export async function getDocumentsByCategory(
  category: DocumentCategory
): Promise<DocumentFields[]> {
  const allDocs = await getDocuments();

  return allDocs.filter((doc) => doc.category === category);
}

export async function getDocumentsGroupedByCategory(): Promise<
  Record<DocumentCategory, DocumentFields[]>
> {
  const documents = await getDocuments();

  const grouped: Record<DocumentCategory, DocumentFields[]> = {
    bylaws: [],
    financials: [],
    "meeting-minutes": [],
    forms: [],
  };

  for (const doc of documents) {
    if (grouped[doc.category]) {
      grouped[doc.category].push(doc);
    }
  }

  return grouped;
}

export { DOCUMENT_CATEGORIES };
