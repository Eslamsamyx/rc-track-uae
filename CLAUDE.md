# CLAUDE.md - RC Track UAE Website Build Brief

> This file is the system brief for an AI coding agent (Claude Code, Cursor, Windsurf, Aider, or any other) tasked with building the RC Track UAE marketing website MVP. Read this end-to-end before touching any file. For deep page-by-page detail, copy, and AI image prompts, see the companion document `RC_Track_UAE_Website_MVP_Specification.pdf` referenced from this file. This brief is the contract; the PDF is the reference.

---

## 1. Mission

Build a production-ready, frontend-only bilingual marketing website for the RC Track UAE venture (RC car racing venue, City Anchor first, GCC expansion to follow). The site is the primary acquisition channel for trial bookings, memberships, birthday parties, corporate events, academy enrolments, and hobby shop orders.

**Frontend only. Zero backend code. Every dynamic feature is a SaaS embed or hosted redirect.** Build the shell; SaaS owns the dynamics.

## 2. Hard rules

1. **No backend.** No Node server, no database, no API routes, no custom auth, no webhooks handler. Next.js runs in static export mode (`output: 'export'`). If a feature needs a server, route it to a SaaS.
2. **No em dashes anywhere.** In code comments, in user-facing copy, in commit messages. Use colons, hyphens, or "and." This is a non-negotiable house style.
3. **Bilingual EN + AR from day one.** Every page exists at both `/en/...` and `/ar/...`. Arabic is RTL. Layouts mirror via CSS logical properties; do not hardcode `margin-left`.
4. **Mobile-first.** The majority of traffic is UAE mobile (Samsung Internet, iOS Safari, Android Chrome). Design every component for 375px width first, scale up.
5. **Lighthouse 90+ across the board** (Performance, Accessibility, Best Practices, SEO) before merging to `main`. CI enforces this.
6. **WCAG 2.1 AA accessibility.** Keyboard nav, screen reader semantics, focus states, `prefers-reduced-motion` respected on every animation.
7. **PDPL-compliant.** Cookie consent gates all non-essential pixels. No analytics until consent is given for that category.
8. **Type-safe end to end.** TypeScript strict. No `any`. Zod schemas for every form. Branded types for ID-like primitives.

## 3. Stack (locked)

| Layer | Choice | Version | Why |
|---|---|---|---|
| Framework | Next.js | 15.x | App Router, static export |
| Language | TypeScript | 5.x | strict mode |
| Styling | Tailwind CSS | 4.x | Atomic, logical properties for RTL |
| Components | shadcn/ui | latest | Copy-paste, no runtime dep |
| Primitives | Radix UI | latest | Underlying shadcn primitives |
| Forms | React Hook Form + Zod + @hookform/resolvers | latest | Schema-first validation |
| Animation | Framer Motion | latest | Respects prefers-reduced-motion |
| i18n | next-intl | latest | EN/AR routing and strings |
| CMS | Sanity | latest | Headless, fetched at build time |
| Images | Cloudinary | n/a (CDN) | Auto-format, auto-quality |
| Video | Vimeo | Plus plan | Hero video hosting |
| Search | Pagefind | latest | Static search index, no backend |
| Carousel | Embla | latest | Lightweight, accessible |
| Lightbox | PhotoSwipe | latest | Touch-friendly, accessible |
| Booking | SimplyBook.me | Standard plan | Embed widget |
| Shop | Shopify Buy Button | Shopify Lite | Embed buttons |
| Newsletter | Mailchimp | Standard | Embed form |
| Forms | Tally | Pro | Embed |
| Payments | Stripe Payment Links | n/a | Hosted checkout |
| Chat | wa.me deep links | n/a | No widget needed |
| Maps | Google Maps iframe | n/a | Free static embed |
| Analytics | GTM + GA4 + Meta + TikTok + LinkedIn + Clarity | n/a | All loaded via GTM |
| Error monitoring | Sentry | Team plan or free | Frontend errors |
| Hosting | Cloudflare Pages | Free or Pro | Static |
| CI/CD | GitHub Actions | n/a | Lint, type-check, test, build, Lighthouse |

**No exceptions.** If a need surfaces that this stack does not cover, raise it for human decision; do not silently swap.

## 4. Setup commands

```bash
# Scaffold
npx create-next-app@latest rc-track-uae --typescript --tailwind --app --no-src-dir --import-alias "@/*"
cd rc-track-uae

# Static export mode
# In next.config.ts add:  output: 'export', images: { unoptimized: true } (since we use Cloudinary loader)

# Add core deps
pnpm add next-intl react-hook-form zod @hookform/resolvers framer-motion
pnpm add @sanity/client next-sanity
pnpm add embla-carousel-react photoswipe
pnpm add class-variance-authority clsx tailwind-merge
pnpm add lucide-react

# shadcn/ui
pnpm dlx shadcn@latest init
pnpm dlx shadcn@latest add button card dialog drawer form input label select sheet skeleton tabs toast

# Dev deps
pnpm add -D @types/node prettier prettier-plugin-tailwindcss eslint-config-prettier
pnpm add -D vitest @vitest/ui @testing-library/react @testing-library/jest-dom
pnpm add -D @playwright/test
pnpm add -D @axe-core/playwright
pnpm add -D pagefind
pnpm add -D husky lint-staged

# Init husky
pnpm husky init
echo "pnpm lint-staged" > .husky/pre-commit

# package.json scripts (verify these exist)
# "dev": "next dev",
# "build": "next build && pagefind --site out",
# "start": "next start",
# "lint": "next lint",
# "type-check": "tsc --noEmit",
# "test": "vitest run",
# "test:e2e": "playwright test",
# "format": "prettier --write ."
```

## 5. Architecture conventions

### 5.1 Vertical slice structure

Group code by **feature**, not by **type**. A feature owns its components, hooks, schemas, types, and tests in one folder.

```
features/
  booking/
    components/
      BookingCTA.tsx
      BookingModal.tsx
      BookingWidgetEmbed.tsx
    hooks/
      useBookingWidget.ts
    schemas/
      bookingRequest.schema.ts
    types.ts
    index.ts             # public exports for the slice
  shop/
  newsletter/
  membership/
  contact/
  i18n/
  analytics/
  layout/
  design-system/         # tokens, primitives that don't belong to a feature
```

### 5.2 Functional core, imperative shell

- **Functional core**: pure functions for validation, transformation, formatting, business logic. No React, no DOM, no SaaS calls. Easy to unit-test.
- **Imperative shell**: React components and SaaS-talking hooks. Thin. They call into the functional core.

Example: a Zod schema (`bookingRequest.schema.ts`) and its `parseBookingRequest()` pure function are core. The component `BookingModal.tsx` is shell; it calls `parseBookingRequest`, displays errors, then forwards to the SimplyBook.me embed.

### 5.3 Branded types

Use branded primitives for any ID-like value so the compiler stops them being mixed up.

```ts
// features/shop/types.ts
export type ProductId = string & { readonly __brand: "ProductId" };
export type ShopifyVariantId = string & { readonly __brand: "ShopifyVariantId" };

export const productId = (s: string): ProductId => s as ProductId;
```

Apply to: `ProductId`, `BlogPostSlug`, `EventSlug`, `MembershipTierId`, `LanguageCode` ("en" | "ar").

### 5.4 Result discriminated unions

For any operation that can fail in a domain-relevant way (form submission, embed loading, payment link resolution), return a Result type, not throw.

```ts
// features/_shared/result.ts
export type Result<T, E = string> =
  | { ok: true; value: T }
  | { ok: false; error: E };

export const ok = <T>(value: T): Result<T> => ({ ok: true, value });
export const err = <E>(error: E): Result<never, E> => ({ ok: false, error });
```

UI components destructure the result and branch. No try/catch in components.

### 5.5 Server boundary is the SaaS edge

There is no "our server." The boundary is the SaaS HTTP edge (Sanity API, Shopify Storefront API, Mailchimp form action, Formspree endpoint, SimplyBook.me embed). Treat each as a remote system:

- Fetch happens at build time wherever possible (Sanity content, Shopify product catalogue).
- Runtime fetches go through a typed client per SaaS (`features/newsletter/mailchimp-client.ts`, `features/shop/shopify-client.ts`).
- Every client returns `Result<T, E>`.

### 5.6 Naming

- Components: `PascalCase.tsx`.
- Hooks: `useCamelCase.ts`.
- Schemas: `entityName.schema.ts`.
- Types: `types.ts` per feature.
- Tests: colocated `*.test.ts(x)` next to the source.
- E2E specs: `e2e/[feature].spec.ts`.

### 5.7 No abstraction frameworks

Skip Redux, Zustand, MobX, TanStack Query, LangChain-style wrappers. Use:

- React state for ephemeral UI state.
- URL state (searchParams) for shareable filter state.
- `localStorage` for cart-adjacent persistence.
- React Context only when two distant components must share state (cart count badge, language, cookie consent).

If complexity demands more, raise it; do not silently introduce a library.

## 6. File structure

```
rc-track-uae/
  app/
    [locale]/
      (marketing)/
        page.tsx                       # /en, /ar (homepage)
        about/page.tsx
        tracks/page.tsx
        tracks/city/page.tsx
        tracks/village/page.tsx
        experiences/page.tsx
        experiences/trial/page.tsx
        experiences/open-practice/page.tsx
        experiences/birthday-parties/page.tsx
        experiences/corporate-events/page.tsx
        experiences/schools/page.tsx
        memberships/page.tsx
        memberships/join/[tier]/page.tsx
        academy/page.tsx
        events/page.tsx
        events/[slug]/page.tsx
        shop/page.tsx
        shop/category/[slug]/page.tsx
        shop/product/[slug]/page.tsx
        wishlist/page.tsx
        blog/page.tsx
        blog/[slug]/page.tsx
        gallery/page.tsx
        contact/page.tsx
        faq/page.tsx
        press/page.tsx
        careers/page.tsx
        tourist/page.tsx
        members/page.tsx                # placeholder for deferred portal
        book/page.tsx                   # SimplyBook.me embed host
        booking/confirmed/page.tsx
        orders/page.tsx                 # Shopify order lookup redirect
        privacy/page.tsx
        terms/page.tsx
        cookies/page.tsx
      layout.tsx
      not-found.tsx
    api/                                # EMPTY. No backend.
    sitemap.ts
    robots.ts
    manifest.ts
    global-error.tsx
  features/
    booking/
    shop/
    newsletter/
    forms/
    membership/
    analytics/
    cookie-consent/
    i18n/
    layout/
    design-system/
    _shared/
  components/                           # truly cross-cutting primitives
    ui/                                 # shadcn/ui copies live here
  lib/
    sanity.ts                           # client init
    cloudinary.ts                       # loader for next/image
    utils.ts
  messages/
    en.json
    ar.json
  content/                              # locally authored MDX (alt to Sanity)
  public/
    icons/
    fonts/
  tests/
    e2e/
  next.config.ts
  tailwind.config.ts
  tsconfig.json
  middleware.ts                         # locale detection only
  CLAUDE.md                             # this file
```

## 7. Design tokens

Implement as CSS variables in `app/globals.css`, mirrored in `tailwind.config.ts` so utility classes use them.

```css
:root {
  /* Brand palette - Racing Blue / Track Orange */
  --color-racing-blue: #0B2447;
  --color-racing-blue-700: #19376D;
  --color-track-orange: #F26B1F;
  --color-track-orange-600: #D9531A;
  --color-track-orange-50: #FEF1E8;
  --color-checkered-black: #0B0F19;
  --color-pit-white: #FFFFFF;
  --color-smoke: #6B7280;
  --color-mist: #F3F4F6;
  --color-go-green: #16A34A;
  --color-caution-amber: #F59E0B;
  --color-stop-red: #EF4444;

  /* Typography */
  --font-display: "Inter Display", system-ui, sans-serif;
  --font-body: "Inter", system-ui, sans-serif;
  --font-arabic: "IBM Plex Sans Arabic", system-ui, sans-serif;
  --font-mono: "JetBrains Mono", ui-monospace, monospace;

  /* Spacing scale (Tailwind defaults plus extensions) */
  /* Radii */
  --radius-sm: 6px;
  --radius-md: 10px;
  --radius-lg: 16px;
  --radius-pill: 999px;

  /* Shadows */
  --shadow-sm: 0 1px 2px rgba(11, 36, 71, 0.05);
  --shadow-md: 0 4px 12px rgba(11, 36, 71, 0.08);
  --shadow-lg: 0 16px 32px rgba(11, 36, 71, 0.12);

  /* Motion */
  --ease-standard: cubic-bezier(0.2, 0.0, 0.0, 1.0);
  --duration-fast: 150ms;
  --duration-base: 250ms;
  --duration-slow: 400ms;
}

[dir="rtl"] {
  --font-display: "IBM Plex Sans Arabic", system-ui, sans-serif;
  --font-body: "IBM Plex Sans Arabic", system-ui, sans-serif;
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

## 8. SaaS account setup checklist

Before any code that touches SaaS, the venue ops team (or Eslam) must create these accounts and hand back IDs/tokens. Each goes into env vars.

- [ ] **Sanity** project created. Note `projectId`, `dataset` (use `production`).
- [ ] **Cloudinary** account. Note `cloud_name`.
- [ ] **Shopify Lite** store. Add Tabby and Tamara apps. Note storefront access token.
- [ ] **SimplyBook.me** Standard plan. Configure service catalogue (see Section 12.2). Note company login slug.
- [ ] **Mailchimp** Standard plan. Audience list created. Note form action URL, user ID, list ID.
- [ ] **Tally** Pro plan. Create 7 forms (Contact, Corporate Quote, School Quote, Press, Career, Waitlist, Press Pack). Note each form ID.
- [ ] **Stripe** account (Standard onboarding). Create Payment Links for: Membership Bronze (AED 850/yr subscription), Silver (AED 1,800/yr), Gold (AED 3,500/yr), and any other fixed-price products. Note each Payment Link URL.
- [ ] **Vimeo** Plus plan. Upload hero video. Note video ID.
- [ ] **Google Tag Manager** container created. Note container ID.
- [ ] **GA4** property created and linked to GTM.
- [ ] **Meta Pixel**, **TikTok Pixel**, **LinkedIn Insight Tag** created and linked to GTM.
- [ ] **Microsoft Clarity** project created. Note Clarity ID.
- [ ] **Sentry** project created. Note DSN.
- [ ] **Cloudflare Pages** site connected to GitHub repo.
- [ ] **Cloudflare Registrar** or another registrar holds `[brand].ae` and `[brand].com`. DNS pointed to Cloudflare Pages.
- [ ] **WhatsApp Business** phone number active. Note number in E.164 format.

## 9. Environment variables

Create `.env.local` for dev and Cloudflare Pages env for production.

```bash
NEXT_PUBLIC_SITE_URL=https://[brand].ae

# Sanity
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_READ_TOKEN=                            # build-time only

# Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=

# Shopify
NEXT_PUBLIC_SHOPIFY_DOMAIN=[store].myshopify.com
NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN=

# SimplyBook.me
NEXT_PUBLIC_SIMPLYBOOK_COMPANY_LOGIN=

# Mailchimp
NEXT_PUBLIC_MAILCHIMP_FORM_ACTION_URL=
NEXT_PUBLIC_MAILCHIMP_USER_ID=
NEXT_PUBLIC_MAILCHIMP_LIST_ID=

# Tally form IDs
NEXT_PUBLIC_TALLY_FORM_CONTACT=
NEXT_PUBLIC_TALLY_FORM_CORPORATE_QUOTE=
NEXT_PUBLIC_TALLY_FORM_SCHOOL_QUOTE=
NEXT_PUBLIC_TALLY_FORM_PRESS=
NEXT_PUBLIC_TALLY_FORM_CAREER=
NEXT_PUBLIC_TALLY_FORM_WAITLIST=
NEXT_PUBLIC_TALLY_FORM_PRESS_PACK=

# Stripe Payment Links
NEXT_PUBLIC_STRIPE_LINK_MEMBERSHIP_BRONZE=
NEXT_PUBLIC_STRIPE_LINK_MEMBERSHIP_SILVER=
NEXT_PUBLIC_STRIPE_LINK_MEMBERSHIP_GOLD=

# Vimeo
NEXT_PUBLIC_VIMEO_HERO_VIDEO_ID=

# WhatsApp
NEXT_PUBLIC_WHATSAPP_NUMBER=971501234567

# Analytics
NEXT_PUBLIC_GTM_ID=
NEXT_PUBLIC_GA4_ID=
NEXT_PUBLIC_META_PIXEL_ID=
NEXT_PUBLIC_TIKTOK_PIXEL_ID=
NEXT_PUBLIC_LINKEDIN_TAG=
NEXT_PUBLIC_CLARITY_ID=

# Monitoring
NEXT_PUBLIC_SENTRY_DSN=
```

**Observe**: no `DATABASE_URL`, no `JWT_SECRET`, no server-only API keys. The zero-backend stack means zero server-side secrets.

## 10. Component inventory

Build in this order. Each component lives in its feature folder (or `features/design-system/` if cross-cutting). Definition-of-done: TypeScript types complete, Storybook story (if Storybook is used), accessibility verified (axe-core), responsive at 375px / 768px / 1280px, RTL verified.

### 10.1 Design system primitives (build first)
1. `Button` (variants: primary, secondary, ghost, link; sizes: sm, md, lg; loading state)
2. `Input`, `Textarea`, `Select`, `Checkbox`, `RadioGroup`, `Switch`
3. `FieldError`, `FieldLabel`, `FormHelper`
4. `Card`, `CardHeader`, `CardBody`, `CardFooter`
5. `Badge`, `Pill`, `Chip`
6. `Modal`, `Drawer`, `BottomSheet`
7. `Tabs`
8. `Accordion`
9. `Tooltip`
10. `Skeleton`
11. `Toast` (via shadcn toast)
12. `Breadcrumb`
13. `Pagination` / `LoadMoreButton`

### 10.2 Layout components
14. `Header` (transparent overlay + scroll-aware)
15. `MobileNavDrawer`
16. `Footer`
17. `LanguageToggle`
18. `StickyMobileCta`
19. `WhatsAppFloatingButton`
20. `CookieConsentBanner` + `CookieConsentModal`

### 10.3 Marketing components
21. `Hero` (variants: video, image, split)
22. `SectionHeader` (eyebrow + heading + subhead)
23. `StatCard` (with count-up)
24. `FeatureRow` (icon + heading + body, 3-col responsive)
25. `TestimonialCarousel` (Embla, autoplay with pause-on-hover)
26. `TrustBar` (logo strip with scroll-fade)
27. `CtaBanner`
28. `FaqAccordion` (with schema.org/FAQPage JSON-LD)
29. `PriceCard` (membership tier card)
30. `ComparisonTable` (membership tier comparison)
31. `PackageCard` (birthday or corporate tier card)
32. `EventCard`
33. `BlogCard`
34. `ProductCard` (Shopify Buy Button host)
35. `GalleryGrid` (masonry) + `LightboxProvider` (PhotoSwipe)
36. `MapEmbed` (Google Maps iframe)

### 10.4 Feature components
37. `NewsletterEmbed` (Mailchimp form, AJAX submit)
38. `TallyFormEmbed`
39. `BookingTrigger` (button that opens modal with SimplyBook.me iframe)
40. `BookingWidgetEmbed` (the iframe host)
41. `BookingConfirmedCard` (post-redirect)
42. `ShopifyBuyButton` (per-product widget wrapper)
43. `WhatsAppCta` (renders wa.me link with pre-encoded message)
44. `MembershipSignupForm` (Tally + redirect-to-Stripe-Payment-Link pattern)
45. `WishlistHeart` (localStorage toggle)
46. `WishlistList` (reads localStorage, renders ProductCards)
47. `RecentlyViewed` (reads localStorage, renders ProductCards)
48. `ShopFilters` (chips that update searchParams; client-side filter)
49. `PagefindSearchModal` (cmd-K shortcut, modal with search box)
50. `LiteVimeo` / `LiteYoutube` (lazy-load wrappers)

## 11. Page inventory and build order

26 distinct routes (52 with EN/AR). Build in phases. Each page's DoD: copy populated, all components rendering, analytics events firing, mobile + desktop verified, RTL verified, Lighthouse passing.

### Phase 1: foundation (Week 1 to 2)
1. Design tokens + Tailwind config
2. shadcn/ui primitives generated
3. Layout: Header, Footer, MobileNavDrawer, LanguageToggle
4. CookieConsentBanner integration
5. WhatsAppFloatingButton
6. GTM bootstrap (gated by consent)
7. i18n routing scaffold (`/en` and `/ar` parallel trees)
8. Sanity client + content schemas

### Phase 2: core marketing pages (Week 3 to 6)
9. **Homepage** (`/`)
10. **About** (`/about`)
11. **Tracks** (`/tracks`, `/tracks/city`, `/tracks/village`)
12. **Experiences hub** (`/experiences`)
13. **Trial** (`/experiences/trial`)
14. **Open Practice** (`/experiences/open-practice`)
15. **Memberships** (`/memberships`)

### Phase 3: conversion pages and embeds (Week 7 to 9)
16. **Birthday Parties** (`/experiences/birthday-parties`)
17. **Corporate Events** (`/experiences/corporate-events`)
18. **Schools** (`/experiences/schools`)
19. **Academy** (`/academy`)
20. **Tourist** (`/tourist`)
21. **Booking modal host** (`/book` and modal trigger on every CTA)
22. **Membership signup** (`/memberships/join/[tier]`)
23. **Booking confirmed** (`/booking/confirmed`)

### Phase 4: content and commerce (Week 10 to 12)
24. **Shop home** (`/shop`)
25. **Shop category** (`/shop/category/[slug]`)
26. **Product detail** (`/shop/product/[slug]`)
27. **Wishlist** (`/wishlist`)
28. **Orders** (`/orders`)
29. **Events** (`/events`, `/events/[slug]`)
30. **Blog** (`/blog`, `/blog/[slug]`)
31. **Gallery** (`/gallery`)
32. **FAQ** (`/faq`)

### Phase 5: support and SEO pages (Week 13)
33. **Contact** (`/contact`)
34. **Press** (`/press`)
35. **Careers** (`/careers`)
36. **Members placeholder** (`/members`)
37. **Privacy**, **Terms**, **Cookies**
38. **404** and global error
39. Sitemap, robots, manifest

### Phase 6: hardening (Week 14)
40. Lighthouse pass on every page
41. axe-core pass on every page
42. Cross-browser test (Chrome, Safari, Firefox, Samsung Internet)
43. Playwright E2E across critical paths
44. Sentry verified
45. GTM event audit

## 12. SaaS embed integration contracts

For each SaaS, here is the exact integration shape the AI must follow.

### 12.1 Sanity content fetch (build time)

```ts
// lib/sanity.ts
import { createClient } from "@sanity/client";

export const sanity = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_READ_TOKEN,        // build-time only
  useCdn: false,
});
```

Schemas to create in Sanity Studio: `blogPost`, `event`, `faqEntry`, `testimonial`, `teamMember`, `pressItem`, `careerPosting`, `homeContent` (singleton), `tracksContent` (singleton).

### 12.2 SimplyBook.me services to configure (in their admin)

Configure these services with these prices and capacities:

| Service name | Price (AED) | Capacity per slot | Duration |
|---|---|---|---|
| Trial Session | 99 (intro) or 195 (standard) | 10 | 30 min |
| Open Practice (Hourly) | 75 | 8 | 60 min |
| Birthday Party - Bronze | 2,800 | 1 | 90 min |
| Birthday Party - Silver | 4,200 | 1 | 120 min |
| Birthday Party - Gold | 6,500 | 1 | 120 min |
| Academy - Beginner Term | 1,800 | 12 | per cohort |
| Academy - Intermediate Term | 1,800 | 12 | per cohort |
| Academy - Advanced Term | 1,800 | 12 | per cohort |
| Corporate Event Enquiry | 0 (quote) | 1 | 30 min consult |

Configure post-payment redirect URL: `https://[brand].ae/booking/confirmed?service={service}&value={amount}`.

### 12.3 SimplyBook.me embed pattern

```tsx
// features/booking/components/BookingWidgetEmbed.tsx
'use client';
import { useEffect, useRef } from "react";

interface Props {
  serviceId?: number;            // pre-select a service when known
  onClose?: () => void;
}

export function BookingWidgetEmbed({ serviceId, onClose }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const widget = new (window as any).SimplybookWidget({
      widget_type: "iframe",
      url: `https://${process.env.NEXT_PUBLIC_SIMPLYBOOK_COMPANY_LOGIN}.simplybook.me`,
      theme: "minimalistic",
      theme_settings: {
        timeline_modern_display: "as_slots",
        sb_base_color: "#F26B1F",         // Track Orange
        body_bg_color: "#FFFFFF",
        sb_review_image: "13",
      },
      timeline: "modern",
      datepicker: "top_calendar",
      is_rtl: document.documentElement.dir === "rtl",
      app_config: { predefined: { service: serviceId } },
      container_id: containerRef.current.id,
    });
    return () => widget?.destroy?.();
  }, [serviceId]);

  return <div id="simplybook-widget" ref={containerRef} />;
}
```

### 12.4 Shopify Buy Button

```tsx
// features/shop/components/ShopifyBuyButton.tsx
'use client';
import Script from "next/script";
import { useEffect, useId, useRef } from "react";

interface Props {
  productId: string;             // Shopify product ID
  variantId?: string;
}

export function ShopifyBuyButton({ productId, variantId }: Props) {
  const containerId = useId();
  const initializedRef = useRef(false);

  useEffect(() => {
    if (initializedRef.current) return;
    const init = () => {
      const ShopifyBuy = (window as any).ShopifyBuy;
      if (!ShopifyBuy) return;
      const client = ShopifyBuy.buildClient({
        domain: process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN!,
        storefrontAccessToken: process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN!,
      });
      ShopifyBuy.UI.onReady(client).then((ui: any) => {
        ui.createComponent("product", {
          id: productId,
          node: document.getElementById(containerId),
          options: {
            product: {
              styles: {
                button: {
                  "background-color": "#F26B1F",
                  "border-radius": "10px",
                  ":hover": { "background-color": "#D9531A" },
                },
              },
              buttonDestination: "modal",
              text: { button: "Buy Now" },
            },
            cart: { popup: false },
          },
        });
      });
      initializedRef.current = true;
    };
    if ((window as any).ShopifyBuy) init();
    else (window as any).addEventListener("shopify-buy-loaded", init);
  }, [productId, containerId]);

  return (
    <>
      <Script
        src="https://sdks.shopifycdn.com/buy-button/latest/buy-button-storefront.min.js"
        onLoad={() => window.dispatchEvent(new Event("shopify-buy-loaded"))}
        strategy="lazyOnload"
      />
      <div id={containerId} />
    </>
  );
}
```

### 12.5 Mailchimp newsletter embed

```tsx
// features/newsletter/components/NewsletterEmbed.tsx
'use client';
import { useState } from "react";
import { z } from "zod";

const Schema = z.object({ email: z.string().email() });

export function NewsletterEmbed({ source }: { source: string }) {
  const [state, setState] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function onSubmit(formData: FormData) {
    const parsed = Schema.safeParse({ email: formData.get("email") });
    if (!parsed.success) return setState("error");

    setState("loading");
    const body = new FormData();
    body.append("EMAIL", parsed.data.email);
    body.append("SOURCE", source);

    try {
      await fetch(process.env.NEXT_PUBLIC_MAILCHIMP_FORM_ACTION_URL!, {
        method: "POST",
        mode: "no-cors",                // Mailchimp returns opaque; we cannot read response
        body,
      });
      setState("success");
      // GTM event
      (window as any).dataLayer?.push({ event: "newsletter_signup", source });
    } catch {
      setState("error");
    }
  }

  // ... render based on state
}
```

### 12.6 Tally form embed

```tsx
// features/forms/components/TallyFormEmbed.tsx
'use client';
import { useEffect } from "react";

export function TallyFormEmbed({ formId, height = 600 }: { formId: string; height?: number }) {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://tally.so/widgets/embed.js";
    script.async = true;
    document.body.appendChild(script);
    return () => { document.body.removeChild(script); };
  }, []);

  return (
    <iframe
      data-tally-src={`https://tally.so/embed/${formId}?alignLeft=1&transparentBackground=1`}
      width="100%"
      height={height}
      frameBorder="0"
      title="Form"
    />
  );
}
```

### 12.7 WhatsApp deep link

```ts
// features/_shared/whatsapp.ts
export function whatsAppLink(message: string, locale: "en" | "ar"): string {
  const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER!;
  const text = encodeURIComponent(message);
  return `https://wa.me/${number}?text=${text}`;
}
```

Pre-encoded message templates live in `messages/en.json` and `messages/ar.json` under `whatsapp.*` keys.

## 13. Code patterns

### 13.1 Form pattern (use this every time)

```tsx
'use client';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const Schema = z.object({
  name: z.string().min(2, "Please enter your full name."),
  email: z.string().email("That email looks off."),
  phone: z.string().regex(/^(\+971|0)5\d{8}$/, "Use UAE format like +971501234567."),
  message: z.string().max(2000),
});
type Input = z.infer<typeof Schema>;

export function ContactForm() {
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<Input>({
    resolver: zodResolver(Schema),
    mode: "onBlur",
    reValidateMode: "onChange",
  });

  async function onSubmit(data: Input) {
    const res = await fetch(`https://formspree.io/f/${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (res.ok) { reset(); /* show success */ }
  }

  return <form onSubmit={handleSubmit(onSubmit)}>{/* fields with {...register("name")} */}</form>;
}
```

### 13.2 Localized link pattern

```tsx
import { useLocale } from "next-intl";
import Link from "next/link";

export function LocalizedLink({ href, children }: { href: string; children: React.ReactNode }) {
  const locale = useLocale();
  return <Link href={`/${locale}${href}`}>{children}</Link>;
}
```

### 13.3 Analytics event helper

```ts
// features/analytics/track.ts
export function track(event: string, props: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  (window as any).dataLayer = (window as any).dataLayer || [];
  (window as any).dataLayer.push({ event, ...props });
}
```

Use everywhere conversions happen. See full event list in Section 6.22 of the PDF spec.

### 13.4 Image pattern (Cloudinary)

```tsx
import Image from "next/image";

const cloudinaryLoader = ({ src, width, quality }: { src: string; width: number; quality?: number }) =>
  `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/f_auto,q_${quality ?? 80},w_${width}/${src}`;

export function CloudinaryImage(props: React.ComponentProps<typeof Image>) {
  return <Image loader={cloudinaryLoader} {...props} />;
}
```

### 13.5 Cookie consent gate for pixels

```tsx
// features/cookie-consent/hooks/useConsent.ts
export function useConsent() {
  // returns { necessary: true, analytics: bool, marketing: bool, personalisation: bool }
}

// Bootstrap GTM only after the user grants analytics consent.
// Until then, dataLayer accepts events but tag firing is paused via GTM's built-in consent mode.
```

## 14. Per-page contracts (essential ones)

For full per-page detail (copy, image prompts, exact sections), use `RC_Track_UAE_Website_MVP_Specification.pdf` Part V. Below are the per-page **contracts** that the AI must satisfy.

### 14.1 Homepage (`/`)

- **Primary CTA**: "Book Your Trial Session" -> opens BookingWidgetEmbed with Trial service preselected.
- **Sections**: Hero (video) -> Trust bar -> Stat row -> Experiences grid -> "How it works" 3-step -> Testimonials -> FAQ teaser -> Newsletter -> Footer.
- **Components**: `Hero`, `TrustBar`, `StatCard`, `FeatureRow`, `TestimonialCarousel`, `FaqAccordion`, `NewsletterEmbed`.
- **Content source**: `homeContent` singleton in Sanity.
- **Analytics**: `page_view`, `cta_click` (hero), `video_play` (hero video), `whatsapp_click` (floating button), `newsletter_signup`.
- **Lighthouse target**: 95+ across all four.
- **DoD**: pixel-checked at 375/768/1280, EN and AR both verified, hero video Vimeo embed loads in under 1.5s on mobile 4G simulated, all CTAs route correctly.

### 14.2 Trial page (`/experiences/trial`)

- **Primary CTA**: "Book Trial" -> BookingWidgetEmbed with service "Trial Session" preselected.
- **Sections**: Hero -> What's included -> Pricing -> Safety -> Reviews -> FAQ -> Sticky mobile CTA.
- **Components**: `Hero`, `FeatureRow`, `PriceCard`, `TestimonialCarousel`, `FaqAccordion`, `StickyMobileCta`, `BookingTrigger`.
- **Content source**: Sanity `experienceContent` document keyed by slug.

### 14.3 Memberships (`/memberships`)

- **Primary CTA**: "Join" per tier -> `/memberships/join/[tier]` page.
- **Sections**: Hero -> Tier cards (Bronze, Silver, Gold) -> Comparison table -> Member testimonials -> FAQ.
- **Components**: `PriceCard`, `ComparisonTable`, `TestimonialCarousel`, `FaqAccordion`.
- **Note**: NO custom auth, NO portal. The "Members" route is a placeholder (see Section 14.4).

### 14.4 Membership signup (`/memberships/join/[tier]`)

- **Flow**: form (Tally) collects name, email, phone, tier confirmation -> on submit, redirect to the Stripe Payment Link for that tier -> Stripe handles payment and confirmation email -> venue manually onboards via WhatsApp.
- **Components**: `TallyFormEmbed`, redirect logic in `onSubmit`.
- **NO** custom checkout. NO custom subscription management.

### 14.5 Shop pages

- **Shop home** (`/shop`): category grid (static), featured products row (Shopify Buy Buttons), new arrivals.
- **Category** (`/shop/category/[slug]`): client-side filter chips (scale, price, brand), product grid with Shopify Buy Buttons.
- **Product detail** (`/shop/product/[slug]`): gallery, copy from Sanity, single large Shopify Buy Button, wishlist heart (localStorage), Tabby/Tamara informational widgets, recently-viewed strip.
- **Static product catalogue**: at build time, fetch all products from Shopify Storefront API into a JSON file embedded in the page. Filters and sorting operate on this in-memory list.

### 14.6 Booking flow (`/book` and modal)

- **The booking widget is the SaaS.** Do not build a custom multi-step flow.
- `/book` is a thin route that mounts `BookingWidgetEmbed`.
- Every other booking trigger CTA on the site opens the same embed in a modal.
- Post-payment, SimplyBook.me redirects to `/booking/confirmed?service=X&value=Y`.

### 14.7 Members placeholder (`/members`)

- Static page: headline "Member-only features are coming soon."
- Form: "Notify me" (Tally email capture).
- DO NOT build auth, dashboard, lap-time tracking, etc. Out of MVP scope.

## 15. Testing strategy

### 15.1 Unit tests (Vitest)
- All Zod schemas.
- All pure utility functions (`whatsAppLink`, `cloudinaryLoader`, `formatPrice`, etc.).
- All branded type constructors.
- Critical Result helpers.

### 15.2 E2E tests (Playwright)
Critical paths only:
1. Homepage loads, hero video plays, booking modal opens, SimplyBook.me iframe mounts.
2. Trial page CTA opens booking modal with Trial preselected.
3. Newsletter signup happy path.
4. Contact form happy path.
5. Language toggle round-trips (EN -> AR -> EN, same page).
6. Shop product page renders Buy Button, wishlist heart toggles, localStorage persists.
7. Mobile nav drawer opens and closes.
8. Cookie consent flow.
9. Booking confirmed page renders after redirect with query params.

### 15.3 Accessibility (axe-core in Playwright)
Run axe-core after every E2E test navigation. Zero violations is the bar.

### 15.4 Visual regression
Optional: Percy or Chromatic. Not required at MVP.

### 15.5 CI matrix (GitHub Actions)
- Lint (`pnpm lint`)
- Type-check (`pnpm type-check`)
- Unit tests (`pnpm test`)
- Build (`pnpm build`)
- Playwright (`pnpm test:e2e`)
- Lighthouse CI (target 90+ all categories on key routes)
- axe-core (zero violations)

## 16. Deployment

### 16.1 Cloudflare Pages
- Connect to `main` branch.
- Build command: `pnpm install && pnpm build`.
- Build output directory: `out` (Next.js static export).
- Environment variables set in Cloudflare dashboard.

### 16.2 Custom domains
- `[brand].ae` -> Cloudflare Pages.
- `[brand].com` -> 301 redirect to `[brand].ae`.
- `book.[brand].ae` -> CNAME to SimplyBook.me hosted booking page.

### 16.3 Preview deploys
- Every PR gets a preview URL.
- E2E tests run against the preview URL.

### 16.4 Build webhooks
- Sanity webhook (on content change) -> Cloudflare Pages build hook -> incremental rebuild (2 to 5 minutes).

## 17. Common pitfalls and house style

1. **Do not paginate, infinite-scroll, or otherwise hide content** that should be SEO-indexed. If a route is on the sitemap, its content must be in the initial HTML.
2. **Do not hardcode AED prices** in components. Pull from Sanity or env constants so ops can change them.
3. **Do not use `margin-left` / `margin-right` / `text-align: left`**. Use `margin-inline-start`, `text-align: start`. RTL breaks otherwise.
4. **Do not autoplay video with sound.** Muted only. Show explicit play button for sound.
5. **Do not load third-party scripts on initial page load.** Use `next/script` with `strategy="lazyOnload"` or load on user interaction. The exception is GTM (loaded after consent).
6. **Do not generate AI images at runtime.** All Nano Banana images are generated ahead of time, uploaded to Cloudinary, referenced by public ID. Prompt library lives in `RC_Track_UAE_Website_MVP_Specification.pdf` Part IV.
7. **Do not introduce LangChain, LlamaIndex, Redux, TanStack Query, or similar.** Direct API calls only.
8. **Do not change `output: 'export'` in next.config.** It is the contract. If something needs server-side, it is wrong.
9. **Do not use em dashes** in code, copy, comments, commits, or PR titles. Substitute colon, hyphen, or "and."
10. **Do not skip the accessibility audit** on any merged PR.
11. **Do not commit `.env.local`.** Verify `.gitignore` includes it.
12. **Do not log PII** (email, phone, name) to Sentry. Strip before reporting.

## 18. Reference files

- `RC_Track_UAE_Website_MVP_Specification.pdf` (or .docx) -> page-by-page detail, copy, image prompts, full design system, full SaaS comparisons, full launch plan. The PDF is the authoritative source where this brief lacks detail.
- `RC_Track_UAE_Deep_Market_Research_and_Strategy.pdf` -> strategic narrative behind the venture; useful for tone-of-voice decisions and audience prioritisation.

## 19. Done definition for the whole MVP

The MVP is shippable when:

- [ ] All 26 routes in Section 11 build and render in both EN and AR.
- [ ] All 50 components in Section 10 exist, tested, accessible, RTL-verified.
- [ ] All SaaS embeds in Section 12 are wired with real account IDs and verified end-to-end.
- [ ] All env vars in Section 9 are populated in Cloudflare Pages production.
- [ ] Lighthouse 90+ on Homepage, Trial, Memberships, Shop home, Blog index.
- [ ] axe-core zero violations on every page.
- [ ] Playwright E2E suite green.
- [ ] Sitemap, robots, hreflang verified in Google Search Console.
- [ ] GTM event audit: every event in Section 6.22 of the PDF fires from at least one place.
- [ ] Cookie consent banner verifiably gates analytics and marketing pixels.
- [ ] Stripe Payment Links live for all three membership tiers and verified.
- [ ] SimplyBook.me service catalogue configured per Section 12.2 and verified end-to-end with a real payment.
- [ ] Shopify Buy Buttons load at least 10 real SKUs and checkout to a real test order.
- [ ] Sentry receiving errors from production.
- [ ] WhatsApp deep links open the correct number with pre-encoded message.
- [ ] All Nano Banana images generated, uploaded to Cloudinary, and referenced in pages.
- [ ] Privacy, Terms, Cookies pages drafted and reviewed by legal.

When every box is ticked, ship.

---

**Build start command for the AI agent**:

> Read this file end to end. Then start at Section 4 (Setup commands), execute the scaffold, then Section 11 Phase 1. Pause after Phase 1 and ask for review. Do not skip phases. Do not silently swap stack choices. Do not write any backend code. When in doubt, ask.
