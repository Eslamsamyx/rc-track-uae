export type ProductId = string & { readonly __brand: "ProductId" };
export type ShopifyVariantId = string & { readonly __brand: "ShopifyVariantId" };
export type BlogPostSlug = string & { readonly __brand: "BlogPostSlug" };
export type EventSlug = string & { readonly __brand: "EventSlug" };
export type MembershipTierId = "bronze" | "silver" | "gold";

export const productId = (s: string): ProductId => s as ProductId;
export const shopifyVariantId = (s: string): ShopifyVariantId =>
  s as ShopifyVariantId;
export const blogPostSlug = (s: string): BlogPostSlug => s as BlogPostSlug;
export const eventSlug = (s: string): EventSlug => s as EventSlug;

export function isMembershipTier(v: string): v is MembershipTierId {
  return v === "bronze" || v === "silver" || v === "gold";
}
