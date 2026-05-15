"use client";

import { Button } from "./Button";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function LoadMoreButton({ onClick, loading, label }: { onClick: () => void; loading?: boolean; label: string }) {
  return (
    <div className="flex justify-center pt-8">
      <Button variant="outline" size="lg" loading={loading} onClick={onClick}>
        {label}
      </Button>
    </div>
  );
}

export function Pagination({
  page,
  totalPages,
  onPageChange,
}: {
  page: number;
  totalPages: number;
  onPageChange: (p: number) => void;
}) {
  if (totalPages <= 1) return null;
  return (
    <nav aria-label="Pagination" className="flex items-center justify-center gap-2 pt-8">
      <Button
        size="sm"
        variant="outline"
        disabled={page <= 1}
        onClick={() => onPageChange(page - 1)}
        aria-label="Previous page"
      >
        <ChevronLeft size={16} aria-hidden className="rtl:rotate-180" />
      </Button>
      <span className="text-sm text-[color:var(--color-muted-foreground)]">
        {page} / {totalPages}
      </span>
      <Button
        size="sm"
        variant="outline"
        disabled={page >= totalPages}
        onClick={() => onPageChange(page + 1)}
        aria-label="Next page"
      >
        <ChevronRight size={16} aria-hidden className="rtl:rotate-180" />
      </Button>
    </nav>
  );
}
