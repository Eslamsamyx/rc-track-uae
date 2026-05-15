"use client";

import { Heart } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { track } from "@/features/analytics/track";
import { cn } from "@/lib/utils";
import type { ProductId } from "@/features/_shared/branded";

const STORAGE_KEY = "rc-wishlist-v1";

function readWishlist(): string[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? "[]") as string[];
  } catch {
    return [];
  }
}

function writeWishlist(items: string[]): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  window.dispatchEvent(new Event("wishlist-changed"));
}

export function useWishlist(): {
  items: string[];
  has: (id: ProductId) => boolean;
  toggle: (id: ProductId) => void;
} {
  const [items, setItems] = useState<string[]>([]);
  useEffect(() => {
    setItems(readWishlist());
    const onChange = () => setItems(readWishlist());
    window.addEventListener("wishlist-changed", onChange);
    return () => window.removeEventListener("wishlist-changed", onChange);
  }, []);
  return {
    items,
    has: (id) => items.includes(id),
    toggle: (id) => {
      const next = items.includes(id)
        ? items.filter((x) => x !== id)
        : [...items, id];
      writeWishlist(next);
    },
  };
}

export function WishlistHeart({ productId, className }: { productId: ProductId; className?: string }) {
  const { has, toggle } = useWishlist();
  const t = useTranslations();
  const active = has(productId);
  const label = active ? t("shop.removeFromWishlist") : t("shop.addToWishlist");
  return (
    <button
      type="button"
      aria-label={label}
      aria-pressed={active}
      onClick={() => {
        toggle(productId);
        track(active ? "shop_remove_from_wishlist" : "shop_add_to_wishlist", { productId });
      }}
      className={cn(
        "inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/90 backdrop-blur transition-colors",
        active ? "text-[color:var(--color-stop-red)]" : "text-[color:var(--color-foreground)]",
        className,
      )}
    >
      <Heart size={18} fill={active ? "currentColor" : "none"} aria-hidden />
    </button>
  );
}
