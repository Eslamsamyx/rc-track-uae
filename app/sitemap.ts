import type { MetadataRoute } from "next";
import { locales } from "@/features/i18n/config";
import { getEvents } from "@/features/content/events-data";
import { getBlogPosts } from "@/features/content/blog-data";
import { SAMPLE_CATALOGUE, SHOP_CATEGORIES } from "@/features/shop/data/catalogue";

export const dynamic = "force-static";

const ROUTES = [
  "",
  "/about",
  "/tracks",
  "/tracks/city",
  "/tracks/village",
  "/experiences",
  "/experiences/trial",
  "/experiences/open-practice",
  "/experiences/birthday-parties",
  "/experiences/corporate-events",
  "/experiences/schools",
  "/memberships",
  "/academy",
  "/tourist",
  "/events",
  "/shop",
  "/wishlist",
  "/orders",
  "/blog",
  "/gallery",
  "/contact",
  "/faq",
  "/press",
  "/careers",
  "/members",
  "/book",
  "/privacy",
  "/terms",
  "/cookies",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://rctrack.ae";
  const now = new Date().toISOString();
  const entries: MetadataRoute.Sitemap = [];
  for (const locale of locales) {
    for (const route of ROUTES) {
      entries.push({
        url: `${base}/${locale}${route}`,
        lastModified: now,
        changeFrequency: route === "" ? "weekly" : "monthly",
        priority: route === "" ? 1 : 0.7,
        alternates: {
          languages: Object.fromEntries(
            locales.map((l) => [l, `${base}/${l}${route}`]),
          ),
        },
      });
    }
    for (const tier of ["bronze", "silver", "gold"] as const) {
      entries.push({
        url: `${base}/${locale}/memberships/join/${tier}`,
        lastModified: now,
        priority: 0.6,
      });
    }
    for (const event of getEvents(locale)) {
      entries.push({
        url: `${base}/${locale}/events/${event.slug}`,
        lastModified: now,
        priority: 0.6,
      });
    }
    for (const post of getBlogPosts(locale)) {
      entries.push({
        url: `${base}/${locale}/blog/${post.slug}`,
        lastModified: post.date,
        priority: 0.6,
      });
    }
    for (const cat of SHOP_CATEGORIES) {
      entries.push({
        url: `${base}/${locale}/shop/category/${cat.id}`,
        lastModified: now,
        priority: 0.5,
      });
    }
    for (const product of SAMPLE_CATALOGUE) {
      entries.push({
        url: `${base}/${locale}/shop/product/${product.slug}`,
        lastModified: now,
        priority: 0.5,
      });
    }
  }
  return entries;
}
