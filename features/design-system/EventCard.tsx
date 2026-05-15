import Link from "next/link";
import { Calendar, MapPin } from "lucide-react";
import { Badge } from "./Badge";
import type { Locale } from "@/features/i18n/config";
import { formatDate } from "@/lib/utils";
import { asset } from "@/lib/asset";

export interface EventEntry {
  slug: string;
  title: string;
  description: string;
  date: string;
  location: string;
  category: "race-night" | "championship" | "demo" | "festival";
  imageUrl?: string;
}

const categoryColors: Record<EventEntry["category"], "primary" | "secondary" | "success" | "warning"> = {
  "race-night": "primary",
  championship: "secondary",
  demo: "success",
  festival: "warning",
};

export function EventCard({ event, locale }: { event: EventEntry; locale: Locale }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[var(--radius-lg)] bg-white ring-1 ring-[color:var(--color-border)] shadow-[var(--shadow-sm)] transition-shadow hover:shadow-[var(--shadow-md)]">
      <div className="relative aspect-[16/9] overflow-hidden bg-[color:var(--color-mist)]">
        {event.imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={asset(event.imageUrl)}
            alt=""
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-[color:var(--color-racing-blue)] to-[color:var(--color-track-orange)]" />
        )}
        <Badge variant={categoryColors[event.category]} className="absolute end-3 top-3" shape="pill">
          {event.category.replace("-", " ")}
        </Badge>
      </div>
      <div className="flex flex-1 flex-col gap-3 p-6">
        <h3 className="font-[family-name:var(--font-display)] text-xl font-bold text-[color:var(--color-racing-blue)]">
          <Link href={`/${locale}/events/${event.slug}`} className="hover:text-[color:var(--color-track-orange-600)]">
            {event.title}
          </Link>
        </h3>
        <p className="text-sm text-[color:var(--color-muted-foreground)] line-clamp-3">{event.description}</p>
        <dl className="mt-auto grid grid-cols-1 gap-2 text-sm text-[color:var(--color-muted-foreground)]">
          <div className="flex items-center gap-2">
            <Calendar size={14} aria-hidden />
            <span>{formatDate(event.date, locale)}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin size={14} aria-hidden />
            <span>{event.location}</span>
          </div>
        </dl>
      </div>
    </article>
  );
}
