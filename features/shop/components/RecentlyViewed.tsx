"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { ProductCard } from "@/features/design-system";
import type { Product } from "../types";

const STORAGE_KEY = "rc-recent-views-v1";
const MAX = 8;

export function trackRecentView(productId: string): void {
  if (typeof window === "undefined") return;
  let list: string[] = [];
  try {
    list = JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? "[]") as string[];
  } catch {
    list = [];
  }
  list = [productId, ...list.filter((id) => id !== productId)].slice(0, MAX);
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}

export function RecentlyViewed({ catalogue }: { catalogue: ReadonlyArray<Product> }) {
  const t = useTranslations();
  const [ids, setIds] = useState<string[]>([]);

  useEffect(() => {
    try {
      const stored = JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? "[]") as string[];
      setIds(stored);
    } catch {
      setIds([]);
    }
  }, []);

  const items = ids
    .map((id) => catalogue.find((p) => p.id === id))
    .filter((p): p is Product => Boolean(p))
    .slice(0, 4);

  if (items.length === 0) return null;

  return (
    <section className="section-y">
      <div className="mx-auto max-w-7xl container-px">
        <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold text-[color:var(--color-racing-blue)]">
          {t("shop.recentlyViewedHeading")}
        </h2>
        <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
          {items.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
