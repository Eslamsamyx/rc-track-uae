import { generateImage, saveBase64Png, loadApiKey } from "./lib/gemini.mjs";

const apiKey = loadApiKey();

const prompt = `Editorial photograph of an outdoor RC racing circuit at dusk in Dubai. Two scale 1:10 RC touring cars frozen mid-corner, motion blur on the wheels. The track is painted asphalt with checkered curbs in racing blue (#0B2447) and track orange (#F26B1F). Warm golden-hour light, deep shadows, cinematic depth. Aerial three-quarter perspective, shot on a 35mm lens, professional motorsport photography style. Wide aspect 16:9. Sharp focus, premium quality, looks like a real race venue not a toy. No text overlays.`;

console.log("Requesting image: hero test");
const result = await generateImage(prompt, apiKey);
console.log("MIME:", result.mime, "size(b64):", result.data.length);
const out = "public/generated/test-hero.png";
saveBase64Png(result.data, out);
console.log("Saved to", out);
console.log("Model text:", result.text?.slice(0, 200) ?? "(none)");
