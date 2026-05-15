"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { ProductCard, SectionHeader } from "@/features/design-system";
import { ShopFilters } from "@/features/shop/components/ShopFilters";
import type { Product } from "@/features/shop/types";

export function CategoryClient({ catalogue }: { catalogue: ReadonlyArray<Product> }) {
  const t = useTranslations();
  const [scale, setScale] = useState<string | undefined>();
  const [brand, setBrand] = useState<string | undefined>();

  const allScales = useMemo(
    () => Array.from(new Set(catalogue.map((p) => p.scale))).filter((s) => s !== "n/a"),
    [catalogue],
  );
  const allBrands = useMemo(
    () => Array.from(new Set(catalogue.map((p) => p.brand))),
    [catalogue],
  );

  const filtered = useMemo(
    () =>
      catalogue.filter((p) => {
        if (scale && p.scale !== scale) return false;
        if (brand && p.brand !== brand) return false;
        return true;
      }),
    [catalogue, scale, brand],
  );

  return (
    <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
      <aside>
        <ShopFilters
          scales={allScales}
          brands={allBrands}
          activeScale={scale}
          activeBrand={brand}
          onScale={setScale}
          onBrand={setBrand}
          onClear={() => {
            setScale(undefined);
            setBrand(undefined);
          }}
        />
      </aside>
      <div>
        <p className="text-sm text-[color:var(--color-muted-foreground)]">
          {filtered.length} {t("common.viewAll")}
        </p>
        {filtered.length === 0 ? (
          <p className="mt-6 rounded-[var(--radius-lg)] border border-dashed border-[color:var(--color-border)] bg-white p-10 text-center text-[color:var(--color-muted-foreground)]">
            {t("wishlist.empty")}
          </p>
        ) : (
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export function ShopHeading({ slug }: { slug: string }) {
  const t = useTranslations();
  const key = `shop.categories.${slug}` as Parameters<typeof t>[0];
  return (
    <SectionHeader heading={t(key)} subhead={t("shop.intro")} />
  );
}
