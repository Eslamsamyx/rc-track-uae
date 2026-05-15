"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import type { Locale } from "@/features/i18n/config";
import type { Product } from "@/features/shop/types";
import { formatPrice } from "@/lib/utils";
import { WishlistHeart } from "@/features/shop/components/WishlistHeart";
import { cloudinaryUrl } from "@/lib/cloudinary";
import { Badge } from "./Badge";
import { track } from "@/features/analytics/track";

export function ProductCard({ product, locale }: { product: Product; locale?: Locale }) {
  const localeNow = (useLocale() as Locale) ?? locale ?? "en";
  const t = useTranslations();
  const title = localeNow === "ar" ? product.titleAr : product.titleEn;
  const href = `/${localeNow}/shop/product/${product.slug}`;

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-[var(--radius-lg)] bg-white ring-1 ring-[color:var(--color-border)] shadow-[var(--shadow-sm)] transition-shadow hover:shadow-[var(--shadow-md)]">
      <div className="relative aspect-square overflow-hidden bg-[color:var(--color-mist)]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={cloudinaryUrl(product.imageUrl, "f_auto,q_80,w_600")}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute end-3 top-3">
          <WishlistHeart productId={product.id} />
        </div>
        <div className="absolute start-3 top-3 flex flex-col gap-1">
          {product.isNew ? <Badge variant="primary" shape="pill" size="sm">New</Badge> : null}
          {!product.inStock ? (
            <Badge variant="danger" shape="pill" size="sm">{t("shop.outOfStock")}</Badge>
          ) : null}
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-2 p-5">
        <p className="text-xs font-medium uppercase tracking-wider text-[color:var(--color-muted-foreground)]">
          {product.brand} {product.scale !== "n/a" ? `: ${product.scale}` : null}
        </p>
        <h3 className="font-[family-name:var(--font-display)] text-base font-semibold text-[color:var(--color-racing-blue)]">
          <Link
            href={href}
            onClick={() => track("shop_view_product", { productId: product.id })}
            className="hover:text-[color:var(--color-track-orange-600)] line-clamp-2"
          >
            {title}
          </Link>
        </h3>
        <p className="mt-auto font-[family-name:var(--font-display)] text-xl font-bold text-[color:var(--color-foreground)]">
          {formatPrice(product.priceAed, localeNow)}
        </p>
      </div>
    </article>
  );
}
