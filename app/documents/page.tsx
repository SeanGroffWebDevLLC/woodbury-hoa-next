import type { Metadata } from "next";
import { DocumentAccordion } from "@/components/documents/DocumentAccordion";
import { getDocumentsGroupedByCategory } from "@/app/lib/get-documents";

export const metadata: Metadata = {
  title: "Documents",
  description: "Access official HOA documents, bylaws, and forms",
};

export default async function DocumentsPage() {
  const documents = await getDocumentsGroupedByCategory();

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-hoa-navy mb-2 text-3xl font-bold md:text-4xl">HOA Documents</h1>
        <p className="text-muted-foreground max-w-2xl">
          Access official HOA documents, bylaws, meeting minutes, and forms. Documents are organized
          by category for easy navigation.
        </p>
      </div>

      <DocumentAccordion documents={documents} />
    </div>
  );
}
