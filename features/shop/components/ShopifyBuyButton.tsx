"use client";

import Script from "next/script";
import { useEffect, useId, useRef } from "react";
import { useTranslations } from "next-intl";
import { track } from "@/features/analytics/track";

declare global {
  interface Window {
    ShopifyBuy?: {
      buildClient: (cfg: { domain: string; storefrontAccessToken: string }) => unknown;
      UI?: {
        onReady: (client: unknown) => Promise<{
          createComponent: (
            name: string,
            cfg: {
              id: string;
              node: HTMLElement | null;
              options: Record<string, unknown>;
            },
          ) => void;
        }>;
      };
    };
  }
}

export function ShopifyBuyButton({
  productId,
}: {
  productId: string;
  variantId?: string;
}) {
  const containerId = `shopify-buy-${useId().replace(/[:]/g, "-")}`;
  const initialized = useRef(false);
  const t = useTranslations();
  const domain = process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN;
  const token = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN;

  useEffect(() => {
    if (initialized.current) return;
    if (!domain || !token) return;
    const init = () => {
      const ShopifyBuy = window.ShopifyBuy;
      if (!ShopifyBuy?.UI) return;
      const client = ShopifyBuy.buildClient({ domain, storefrontAccessToken: token });
      ShopifyBuy.UI.onReady(client).then((ui) => {
        ui.createComponent("product", {
          id: productId,
          node: document.getElementById(containerId),
          options: {
            product: {
              styles: {
                button: {
                  "background-color": "#F26B1F",
                  "border-radius": "10px",
                  "font-size": "16px",
                  "padding-top": "14px",
                  "padding-bottom": "14px",
                  ":hover": { "background-color": "#D9531A" },
                },
              },
              buttonDestination: "modal",
              text: { button: t("shop.buyNow") },
            },
            cart: { popup: false },
          },
        });
      });
      initialized.current = true;
    };
    if (window.ShopifyBuy) init();
    else window.addEventListener("shopify-buy-loaded", init);
  }, [productId, containerId, domain, token, t]);

  if (!domain || !token) {
    return (
      <button
        type="button"
        onClick={() => track("shop_buy_click", { productId, simulated: true })}
        className="inline-flex h-12 items-center justify-center rounded-[var(--radius-md)] bg-[color:var(--color-track-orange)] px-5 font-semibold text-white"
      >
        {t("shop.buyNow")}
      </button>
    );
  }

  return (
    <>
      <Script
        src="https://sdks.shopifycdn.com/buy-button/latest/buy-button-storefront.min.js"
        onLoad={() => window.dispatchEvent(new Event("shopify-buy-loaded"))}
        strategy="lazyOnload"
      />
      <div id={containerId} onClick={() => track("shop_buy_click", { productId })} />
    </>
  );
}
