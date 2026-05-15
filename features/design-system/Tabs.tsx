"use client";

import { useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface TabItem {
  id: string;
  label: ReactNode;
  content: ReactNode;
}

export function Tabs({ items, defaultId, className }: { items: TabItem[]; defaultId?: string; className?: string }) {
  const [active, setActive] = useState(defaultId ?? items[0]?.id ?? "");
  return (
    <div className={className}>
      <div role="tablist" className="flex flex-wrap gap-2 border-b border-[color:var(--color-border)]">
        {items.map((item) => (
          <button
            key={item.id}
            role="tab"
            type="button"
            id={`tab-${item.id}`}
            aria-controls={`panel-${item.id}`}
            aria-selected={active === item.id}
            onClick={() => setActive(item.id)}
            className={cn(
              "px-4 py-3 text-sm font-medium border-b-2 -mb-px transition-colors",
              active === item.id
                ? "border-[color:var(--color-track-orange)] text-[color:var(--color-track-orange-600)]"
                : "border-transparent text-[color:var(--color-muted-foreground)] hover:text-[color:var(--color-foreground)]",
            )}
          >
            {item.label}
          </button>
        ))}
      </div>
      {items.map((item) => (
        <div
          key={item.id}
          role="tabpanel"
          id={`panel-${item.id}`}
          aria-labelledby={`tab-${item.id}`}
          hidden={active !== item.id}
          className="pt-6"
        >
          {item.content}
        </div>
      ))}
    </div>
  );
}
