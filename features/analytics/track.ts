export interface DataLayerEvent {
  event: string;
  [key: string]: unknown;
}

type Window = typeof globalThis & {
  dataLayer?: DataLayerEvent[];
};

export function track(event: string, props: Record<string, unknown> = {}): void {
  if (typeof window === "undefined") return;
  const w = window as unknown as Window;
  w.dataLayer = w.dataLayer ?? [];
  w.dataLayer.push({ event, ...props });
}

export type ConversionEvent =
  | "page_view"
  | "cta_click"
  | "video_play"
  | "video_complete"
  | "whatsapp_click"
  | "newsletter_signup"
  | "booking_start"
  | "booking_complete"
  | "membership_join_start"
  | "membership_join_complete"
  | "shop_view_product"
  | "shop_add_to_wishlist"
  | "shop_remove_from_wishlist"
  | "shop_buy_click"
  | "contact_submit"
  | "tally_submit"
  | "language_switch"
  | "phone_click"
  | "email_click"
  | "404_view";
