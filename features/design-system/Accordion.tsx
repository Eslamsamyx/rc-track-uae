"use client";

import { useState, type ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface AccordionItem {
  id: string;
  question: string;
  answer: ReactNode;
}

export function Accordion({
  items,
  allowMultiple = false,
  className,
}: {
  items: AccordionItem[];
  allowMultiple?: boolean;
  className?: string;
}) {
  const [openIds, setOpenIds] = useState<Set<string>>(new Set());

  function toggle(id: string) {
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        if (!allowMultiple) next.clear();
        next.add(id);
      }
      return next;
    });
  }

  return (
    <div className={cn("divide-y divide-[color:var(--color-border)] border-y border-[color:var(--color-border)]", className)}>
      {items.map((item) => {
        const isOpen = openIds.has(item.id);
        return (
          <div key={item.id}>
            <button
              type="button"
              aria-expanded={isOpen}
              aria-controls={`acc-${item.id}`}
              onClick={() => toggle(item.id)}
              className="flex w-full items-center justify-between gap-4 py-5 text-start text-base font-medium text-[color:var(--color-foreground)] hover:text-[color:var(--color-track-orange-600)]"
            >
              <span>{item.question}</span>
              <ChevronDown
                size={20}
                className={cn(
                  "shrink-0 transition-transform duration-200 text-[color:var(--color-smoke)]",
                  isOpen && "rotate-180 text-[color:var(--color-track-orange)]",
                )}
                aria-hidden
              />
            </button>
            <div
              id={`acc-${item.id}`}
              role="region"
              hidden={!isOpen}
              className="pb-5 text-[color:var(--color-muted-foreground)] leading-relaxed"
            >
              {item.answer}
            </div>
          </div>
        );
      })}
    </div>
  );
}
