"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import { useConsent } from "@/features/cookie-consent/hooks/useConsent";

export function GTMScript() {
  const { consent } = useConsent();
  const [loaded, setLoaded] = useState(false);
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID;

  useEffect(() => {
    if (!consent?.analytics || loaded || !gtmId) return;
    setLoaded(true);
  }, [consent?.analytics, loaded, gtmId]);

  if (!gtmId || !consent?.analytics || !loaded) {
    return null;
  }

  return (
    <>
      <Script id="gtm-base" strategy="afterInteractive">
        {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});
          var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';
          j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','${gtmId}');`}
      </Script>
      <noscript>
        <iframe
          src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
          height="0"
          width="0"
          style={{ display: "none", visibility: "hidden" }}
          title="GTM"
        />
      </noscript>
    </>
  );
}
