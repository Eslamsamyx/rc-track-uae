import fs from "node:fs";
import path from "node:path";

const envPath = path.resolve(".env.local");
const envText = fs.readFileSync(envPath, "utf8");
const apiKey = envText.match(/^GOOGLE_GEMINI_API_KEY=(.+)$/m)?.[1]?.trim();
if (!apiKey) {
  console.error("Missing GOOGLE_GEMINI_API_KEY in .env.local");
  process.exit(1);
}

const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;
const res = await fetch(url);
const json = await res.json();
if (!res.ok) {
  console.error("Request failed:", json);
  process.exit(1);
}

const items = json.models ?? [];
console.log(`Total models: ${items.length}`);
for (const m of items) {
  const methods = (m.supportedGenerationMethods ?? []).join(",");
  if (
    m.name.includes("image") ||
    methods.includes("generateContent") &&
    (m.name.includes("flash") || m.name.includes("imagen") || m.name.includes("2.5") || m.name.includes("3.0"))
  ) {
    console.log(`- ${m.name}\n    methods=[${methods}]`);
  }
}
