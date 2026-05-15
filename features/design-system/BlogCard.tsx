import Link from "next/link";
import { Clock } from "lucide-react";
import type { Locale } from "@/features/i18n/config";
import { formatDate } from "@/lib/utils";

export interface BlogPostSummary {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readingMinutes: number;
  author: string;
  imageUrl?: string;
  category: string;
}

export function BlogCard({ post, locale }: { post: BlogPostSummary; locale: Locale }) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-[var(--radius-lg)] bg-white ring-1 ring-[color:var(--color-border)] shadow-[var(--shadow-sm)] transition-shadow hover:shadow-[var(--shadow-md)]">
      <div className="relative aspect-[16/10] overflow-hidden bg-[color:var(--color-mist)]">
        {post.imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={post.imageUrl} alt="" className="h-full w-full object-cover" />
        ) : (
          <div className="h-full w-full checkered-bg opacity-40" />
        )}
      </div>
      <div className="flex flex-1 flex-col gap-3 p-6">
        <span className="text-xs font-semibold uppercase tracking-wider text-[color:var(--color-track-orange-600)]">
          {post.category}
        </span>
        <h3 className="font-[family-name:var(--font-display)] text-lg font-bold leading-tight text-[color:var(--color-racing-blue)]">
          <Link
            href={`/${locale}/blog/${post.slug}`}
            className="hover:text-[color:var(--color-track-orange-600)]"
          >
            {post.title}
          </Link>
        </h3>
        <p className="text-sm text-[color:var(--color-muted-foreground)] line-clamp-3">{post.excerpt}</p>
        <div className="mt-auto flex items-center gap-3 text-xs text-[color:var(--color-muted-foreground)]">
          <span>{formatDate(post.date, locale)}</span>
          <span className="inline-flex items-center gap-1">
            <Clock size={12} aria-hidden />
            {post.readingMinutes} min
          </span>
        </div>
      </div>
    </article>
  );
}
