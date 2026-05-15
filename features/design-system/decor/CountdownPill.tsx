"use client";

import { useEffect, useState } from "react";
import { Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  /** ISO datetime string of the next race / event */
  target: string;
  label?: string;
  className?: string;
}

function diff(target: string) {
  const t = new Date(target).getTime();
  const now = Date.now();
  const ms = Math.max(0, t - now);
  const days = Math.floor(ms / 86400000);
  const hours = Math.floor((ms / 3600000) % 24);
  const minutes = Math.floor((ms / 60000) % 60);
  const seconds = Math.floor((ms / 1000) % 60);
  return { days, hours, minutes, seconds, done: ms === 0 };
}

export function CountdownPill({ target, label, className }: Props) {
  const [t, setT] = useState(() => diff(target));
  useEffect(() => {
    const id = window.setInterval(() => setT(diff(target)), 1000);
    return () => window.clearInterval(id);
  }, [target]);

  if (t.done) return null;

  return (
    <div
      className={cn(
        "inline-flex items-center gap-3 rounded-[var(--radius-pill)] bg-white/10 px-4 py-2 text-sm font-semibold text-white ring-1 ring-white/20 backdrop-blur",
        className,
      )}
    >
      <Clock size={14} aria-hidden />
      {label ? <span className="opacity-80">{label}</span> : null}
      <span className="font-mono tabular-nums tracking-wider">
        {t.days > 0 ? `${t.days}d ` : ""}
        {String(t.hours).padStart(2, "0")}:{String(t.minutes).padStart(2, "0")}:
        {String(t.seconds).padStart(2, "0")}
      </span>
    </div>
  );
}
