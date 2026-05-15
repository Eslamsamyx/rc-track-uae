"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Search } from "lucide-react";
import { Modal } from "@/features/design-system";

declare global {
  interface Window {
    pagefind?: {
      search: (q: string) => Promise<{
        results: Array<{
          data: () => Promise<{ url: string; meta: { title: string }; excerpt: string }>;
        }>;
      }>;
    };
  }
}

interface Result {
  url: string;
  title: string;
  excerpt: string;
}

function stripHtml(input: string): string {
  return input.replace(/<[^>]+>/g, "");
}

export function PagefindSearchModal() {
  const t = useTranslations();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Result[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen(true);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (open && inputRef.current) inputRef.current.focus();
  }, [open]);

  useEffect(() => {
    if (!open) return;
    let cancelled = false;
    async function run() {
      if (!query) {
        setResults([]);
        return;
      }
      try {
        if (!window.pagefind) {
          const mod = (await import(
            /* webpackIgnore: true */ "/pagefind/pagefind.js" as string
          )) as unknown as Window["pagefind"];
          if (mod) window.pagefind = mod;
        }
        const search = await window.pagefind?.search(query);
        if (!search || cancelled) return;
        const items = await Promise.all(
          search.results.slice(0, 8).map(async (r) => {
            const d = await r.data();
            return { url: d.url, title: d.meta.title, excerpt: stripHtml(d.excerpt) };
          }),
        );
        if (!cancelled) setResults(items);
      } catch {
        setResults([]);
      }
    }
    const handle = setTimeout(run, 150);
    return () => {
      cancelled = true;
      clearTimeout(handle);
    };
  }, [query, open]);

  return (
    <>
      <button
        type="button"
        aria-label={t("common.search")}
        onClick={() => setOpen(true)}
        className="inline-flex h-10 w-10 items-center justify-center rounded-full hover:bg-[color:var(--color-mist)]"
      >
        <Search size={18} aria-hidden />
      </button>
      <Modal open={open} onClose={() => setOpen(false)} title={t("common.search")}>
        <input
          ref={inputRef}
          type="search"
          placeholder={t("common.search")}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="block w-full rounded-[var(--radius-md)] border border-[color:var(--color-border)] bg-white px-4 py-3 text-base focus:border-[color:var(--color-track-orange)] focus:outline-none"
        />
        <ul className="mt-4 divide-y divide-[color:var(--color-border)]">
          {results.map((r) => (
            <li key={r.url}>
              <a
                href={r.url}
                className="block py-3 hover:bg-[color:var(--color-mist)]"
                onClick={() => setOpen(false)}
              >
                <p className="font-semibold text-[color:var(--color-foreground)]">{r.title}</p>
                <p className="mt-1 text-sm text-[color:var(--color-muted-foreground)]">{r.excerpt}</p>
              </a>
            </li>
          ))}
        </ul>
      </Modal>
    </>
  );
}
