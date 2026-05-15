import type { ReactNode } from "react";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export function Breadcrumb({ items, className }: { items: BreadcrumbItem[]; className?: string }) {
  return (
    <nav aria-label="Breadcrumb" className={cn("text-sm", className)}>
      <ol className="flex flex-wrap items-center gap-1.5 text-[color:var(--color-muted-foreground)]">
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={`${item.label}-${i}`} className="inline-flex items-center gap-1.5">
              {item.href && !isLast ? (
                <a href={item.href} className="hover:text-[color:var(--color-track-orange-600)]">
                  {item.label}
                </a>
              ) : (
                <span
                  aria-current={isLast ? "page" : undefined}
                  className={isLast ? "text-[color:var(--color-foreground)] font-medium" : ""}
                >
                  {item.label}
                </span>
              )}
              {!isLast ? <ChevronRight size={14} aria-hidden className="rtl:rotate-180" /> : null}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export function bullet(...nodes: ReactNode[]): ReactNode {
  return nodes;
}
