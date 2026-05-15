"use client";

import { useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Tooltip({
  children,
  label,
  side = "top",
  className,
}: {
  children: ReactNode;
  label: string;
  side?: "top" | "bottom" | "start" | "end";
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <span className="relative inline-flex">
      <span
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        tabIndex={0}
      >
        {children}
      </span>
      {open ? (
        <span
          role="tooltip"
          className={cn(
            "pointer-events-none absolute z-50 whitespace-nowrap rounded-[var(--radius-md)] bg-[color:var(--color-checkered-black)] px-3 py-1.5 text-xs text-white shadow-[var(--shadow-md)]",
            side === "top" && "bottom-full left-1/2 -translate-x-1/2 mb-2",
            side === "bottom" && "top-full left-1/2 -translate-x-1/2 mt-2",
            side === "start" && "right-full top-1/2 -translate-y-1/2 mr-2",
            side === "end" && "left-full top-1/2 -translate-y-1/2 ml-2",
            className,
          )}
        >
          {label}
        </span>
      ) : null}
    </span>
  );
}
