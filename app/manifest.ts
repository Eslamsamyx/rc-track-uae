import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "RC Track UAE",
    short_name: "RC Track",
    description: "RC car racing venue in the UAE.",
    start_url: "/en",
    display: "standalone",
    background_color: "#FFFFFF",
    theme_color: "#0B2447",
    icons: [
      {
        src: "/icons/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
