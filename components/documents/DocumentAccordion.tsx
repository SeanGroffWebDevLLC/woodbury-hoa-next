"use client";

import { useState } from "react";
import { Download, FileText } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DocumentSearch } from "./DocumentSearch";
import { formatDateShort, isNewDocument } from "@/lib/utils";
import type { DocumentFields, DocumentCategory } from "@/types/contentful";
import { DOCUMENT_CATEGORIES } from "@/types/contentful";

interface DocumentAccordionProps {
  documents: Record<DocumentCategory, DocumentFields[]>;
}

export function DocumentAccordion({ documents }: DocumentAccordionProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filterDocuments = (docs: DocumentFields[]) => {
    if (!searchQuery) return docs;
    return docs.filter((doc) => doc.title.toLowerCase().includes(searchQuery.toLowerCase()));
  };

  const categories = Object.keys(DOCUMENT_CATEGORIES) as DocumentCategory[];
  const hasDocuments = categories.some((cat) => documents[cat].length > 0);

  if (!hasDocuments && !searchQuery) {
    return (
      <div className="py-12 text-center">
        <FileText className="text-muted-foreground mx-auto mb-4 h-12 w-12" />
        <p className="text-muted-foreground">No documents available at this time.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <DocumentSearch value={searchQuery} onChange={setSearchQuery} />

      <Accordion type="multiple" defaultValue={categories} className="w-full">
        {categories.map((category) => {
          const filteredDocs = filterDocuments(documents[category]);
          const totalDocs = documents[category].length;

          if (totalDocs === 0) return null;

          return (
            <AccordionItem key={category} value={category}>
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center gap-3">
                  <span className="text-hoa-navy font-semibold">
                    {DOCUMENT_CATEGORIES[category]}
                  </span>
                  <Badge variant="secondary" className="text-xs">
                    {filteredDocs.length}
                    {searchQuery && filteredDocs.length !== totalDocs && ` / ${totalDocs}`}
                  </Badge>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                {filteredDocs.length === 0 ? (
                  <p className="text-muted-foreground py-4 text-center text-sm">
                    No documents match your search.
                  </p>
                ) : (
                  <div className="space-y-2">
                    {filteredDocs.map((doc, index) => (
                      <div
                        key={`${doc.title}-${index}`}
                        className="border-border bg-card flex items-center justify-between rounded-lg border p-4"
                      >
                        <div className="flex items-center gap-3">
                          <FileText className="text-hoa-blue h-5 w-5" />
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-medium">{doc.title}</span>
                              {doc.isNew || isNewDocument(doc.uploadDate) ? (
                                <Badge className="bg-hoa-blue text-white">New</Badge>
                              ) : null}
                            </div>
                            <p className="text-muted-foreground text-sm">
                              Uploaded {formatDateShort(doc.uploadDate)}
                            </p>
                          </div>
                        </div>
                        {doc.file?.fields?.file?.url && (
                          <Button variant="outline" size="sm" asChild>
                            <a
                              href={`https:${doc.file.fields.file.url}`}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <Download className="mr-2 h-4 w-4" />
                              Download
                            </a>
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>

      {searchQuery && categories.every((cat) => filterDocuments(documents[cat]).length === 0) && (
        <p className="text-muted-foreground py-8 text-center">
          No documents found matching &quot;{searchQuery}&quot;
        </p>
      )}
    </div>
  );
}
