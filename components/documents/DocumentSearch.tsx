"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface DocumentSearchProps {
  value: string;
  onChange: (value: string) => void;
}

export function DocumentSearch({ value, onChange }: DocumentSearchProps) {
  return (
    <div className="relative">
      <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
      <Input
        type="search"
        placeholder="Search documents..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-10"
      />
    </div>
  );
}
