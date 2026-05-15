"use client";

import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import { ProductCard } from "@/features/design-system";
import type { Product } from "../types";
import type { Locale } from "@/features/i18n/config";

const STORAGE_KEY = "rc-wishlist-v1";

export function WishlistList({ catalogue }: { catalogue: ReadonlyArray<Product> }) {
  const t = useTranslations();
  const locale = useLocale() as Locale;
  const [ids, setIds] = useState<string[]>([]);

  useEffect(() => {
    const read = () => {
      try {
        const stored = JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? "[]") as string[];
        setIds(stored);
      } catch {
        setIds([]);
      }
    };
    read();
    window.addEventListener("wishlist-changed", read);
    return () => window.removeEventListener("wishlist-changed", read);
  }, []);

  const items = ids
    .map((id) => catalogue.find((p) => p.id === id))
    .filter((p): p is Product => Boolean(p));

  if (items.length === 0) {
    return (
      <div className="rounded-[var(--radius-lg)] border border-dashed border-[color:var(--color-border)] bg-white p-12 text-center">
        <p className="text-base text-[color:var(--color-muted-foreground)]">{t("wishlist.empty")}</p>
        <Link
          href={`/${locale}/shop`}
          className="mt-4 inline-flex items-center justify-center rounded-[var(--radius-md)] bg-[color:var(--color-track-orange)] px-5 py-3 font-semibold text-white"
        >
          {t("wishlist.emptyCta")}
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
      {items.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}
