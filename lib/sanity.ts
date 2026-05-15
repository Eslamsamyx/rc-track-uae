import { createClient, type SanityClient } from "@sanity/client";

let cached: SanityClient | null = null;

export function getSanityClient(): SanityClient | null {
  if (cached) return cached;
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
  if (!projectId || !dataset) {
    return null;
  }
  cached = createClient({
    projectId,
    dataset,
    apiVersion: "2024-01-01",
    token: process.env.SANITY_API_READ_TOKEN,
    useCdn: false,
  });
  return cached;
}
