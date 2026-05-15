import type { ReactNode } from "react";
import { Header } from "@/features/layout/Header";
import { Footer } from "@/features/layout/Footer";
import { WhatsAppFloatingButton } from "@/features/layout/WhatsAppFloatingButton";
import { CookieConsentBanner } from "@/features/cookie-consent/components/CookieConsentBanner";
import { GTMScript } from "@/features/analytics/GTMScript";
import { SentryInit } from "@/features/analytics/SentryInit";
import { ToastProvider } from "@/features/design-system";

export default function MarketingLayout({ children }: { children: ReactNode }) {
  return (
    <ToastProvider>
      <Header />
      <main id="main" tabIndex={-1} className="flex-1">
        {children}
      </main>
      <Footer />
      <WhatsAppFloatingButton />
      <CookieConsentBanner />
      <GTMScript />
      <SentryInit />
    </ToastProvider>
  );
}
