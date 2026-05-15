"use client";

import { useEffect } from "react";
import { useLocale, useTranslations } from "next-intl";
import { ShopifyBuyButton } from "@/features/shop/components/ShopifyBuyButton";
import { WishlistHeart } from "@/features/shop/components/WishlistHeart";
import { trackRecentView, RecentlyViewed } from "@/features/shop/components/RecentlyViewed";
import { Badge } from "@/features/design-system";
import { cloudinaryUrl } from "@/lib/cloudinary";
import { formatPrice } from "@/lib/utils";
import type { Product } from "@/features/shop/types";
import type { Locale } from "@/features/i18n/config";

export function ProductClient({
  product,
  catalogue,
}: {
  product: Product;
  catalogue: ReadonlyArray<Product>;
}) {
  const locale = useLocale() as Locale;
  const t = useTranslations();
  const title = locale === "ar" ? product.titleAr : product.titleEn;
  const description = locale === "ar" ? product.descriptionAr : product.descriptionEn;

  useEffect(() => {
    trackRecentView(product.id);
  }, [product.id]);

  return (
    <>
      <div className="grid gap-10 lg:grid-cols-2">
        <div className="relative aspect-square overflow-hidden rounded-[var(--radius-lg)] bg-[color:var(--color-mist)]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={cloudinaryUrl(product.imageUrl, "f_auto,q_85,w_1000")}
            alt={title}
            className="h-full w-full object-cover"
          />
          <div className="absolute end-4 top-4">
            <WishlistHeart productId={product.id} />
          </div>
          <div className="absolute start-4 top-4 flex flex-col gap-2">
            {product.isNew ? <Badge variant="primary" shape="pill">New</Badge> : null}
            {!product.inStock ? <Badge variant="danger" shape="pill">{t("shop.outOfStock")}</Badge> : null}
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-[color:var(--color-muted-foreground)]">
            {product.brand} {product.scale !== "n/a" ? `: ${product.scale}` : ""}
          </p>
          <h1 className="font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight text-[color:var(--color-racing-blue)] sm:text-4xl">
            {title}
          </h1>
          <p className="font-[family-name:var(--font-display)] text-3xl font-extrabold">
            {formatPrice(product.priceAed, locale)}
          </p>
          <p className="text-base text-[color:var(--color-muted-foreground)] leading-relaxed">{description}</p>
          <div className="mt-4">
            <ShopifyBuyButton productId={product.shopifyProductId} />
          </div>
          <ul className="mt-6 grid grid-cols-2 gap-3 rounded-[var(--radius-md)] bg-[color:var(--color-mist)] p-4 text-sm">
            <li className="text-[color:var(--color-muted-foreground)]">{t("shop.tabbyNote")}</li>
            <li className="text-[color:var(--color-muted-foreground)]">{t("shop.tamaraNote")}</li>
          </ul>
        </div>
      </div>
      <RecentlyViewed catalogue={catalogue.filter((p) => p.id !== product.id)} />
    </>
  );
}
