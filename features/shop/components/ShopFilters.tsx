"use client";

import { useTranslations } from "next-intl";
import { Chip } from "@/features/design-system";

interface Props {
  scales: ReadonlyArray<string>;
  brands: ReadonlyArray<string>;
  activeScale?: string;
  activeBrand?: string;
  onScale: (s?: string) => void;
  onBrand: (b?: string) => void;
  onClear: () => void;
}

export function ShopFilters({
  scales,
  brands,
  activeScale,
  activeBrand,
  onScale,
  onBrand,
  onClear,
}: Props) {
  const t = useTranslations();
  return (
    <div className="flex flex-col gap-4 rounded-[var(--radius-lg)] border border-[color:var(--color-border)] bg-white p-5">
      <p className="text-sm font-semibold uppercase tracking-wider text-[color:var(--color-muted-foreground)]">
        {t("shop.filters.scale")}
      </p>
      <div className="flex flex-wrap gap-2">
        {scales.map((s) => (
          <Chip key={s} active={activeScale === s} onClick={() => onScale(activeScale === s ? undefined : s)}>
            {s}
          </Chip>
        ))}
      </div>
      <p className="mt-2 text-sm font-semibold uppercase tracking-wider text-[color:var(--color-muted-foreground)]">
        {t("shop.filters.brand")}
      </p>
      <div className="flex flex-wrap gap-2">
        {brands.map((b) => (
          <Chip key={b} active={activeBrand === b} onClick={() => onBrand(activeBrand === b ? undefined : b)}>
            {b}
          </Chip>
        ))}
      </div>
      {(activeBrand || activeScale) && (
        <button
          type="button"
          onClick={onClear}
          className="self-start text-sm text-[color:var(--color-track-orange-600)] underline-offset-4 hover:underline"
        >
          {t("shop.filters.clearAll")}
        </button>
      )}
    </div>
  );
}
