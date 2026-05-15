import type { ProductId, ShopifyVariantId } from "@/features/_shared/branded";

export interface ProductCategory {
  id: "cars" | "electronics" | "tyres" | "tools" | "apparel";
  labelKey: string;
}

export interface Product {
  id: ProductId;
  shopifyProductId: string;
  variantId?: ShopifyVariantId;
  slug: string;
  titleEn: string;
  titleAr: string;
  brand: string;
  scale: "1:8" | "1:10" | "1:12" | "1:18" | "n/a";
  category: ProductCategory["id"];
  priceAed: number;
  imageUrl: string;
  descriptionEn: string;
  descriptionAr: string;
  inStock: boolean;
  isNew?: boolean;
  isFeatured?: boolean;
}
