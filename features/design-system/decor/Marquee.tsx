"use client";

import { useEffect, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface Props {
  items: ReactNode[];
  speed?: number;
  className?: string;
  itemClassName?: string;
  pauseOnHover?: boolean;
}

export function Marquee({
  items,
  speed = 35,
  className,
  itemClassName,
  pauseOnHover = true,
}: Props) {
  const repeated = [...items, ...items];
  const [isRtl, setIsRtl] = useState(false);

  useEffect(() => {
    setIsRtl(document.documentElement.dir === "rtl");
  }, []);

  return (
    <div
      className={cn("group relative overflow-hidden", className)}
      style={{
        maskImage: "linear-gradient(90deg, transparent, black 8%, black 92%, transparent)",
        WebkitMaskImage:
          "linear-gradient(90deg, transparent, black 8%, black 92%, transparent)",
      }}
    >
      <div
        className={cn(
          "flex w-max gap-10 will-change-transform",
          pauseOnHover && "group-hover:[animation-play-state:paused]",
        )}
        style={{
          animation: `${isRtl ? "marqueeScrollRtl" : "marqueeScroll"} ${speed}s linear infinite`,
        }}
      >
        {repeated.map((item, i) => (
          <div key={i} className={cn("shrink-0", itemClassName)} aria-hidden={i >= items.length}>
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}
