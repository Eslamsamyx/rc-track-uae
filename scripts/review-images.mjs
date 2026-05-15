import fs from "node:fs";
import path from "node:path";
import { reviewImage, loadApiKey } from "./lib/gemini.mjs";
import { ALL_PROMPTS } from "./prompts.mjs";

const apiKey = loadApiKey();
const ROOT = "public/generated";

const onlyArg = process.argv.find((a) => a.startsWith("--only="))?.slice(7);
let items = ALL_PROMPTS;
if (onlyArg) {
  const ids = onlyArg.split(",");
  items = items.filter((p) => ids.includes(p.id));
}

const reviews = [];
for (const item of items) {
  const filePath = path.join(ROOT, item.out);
  if (!fs.existsSync(filePath)) {
    console.log(`[missing] ${item.id} -> ${filePath}`);
    continue;
  }
  process.stdout.write(`[review] ${item.id}: `);
  const reviewPrompt = `You are a senior creative director evaluating a brand image.
Brand: RC Track UAE. Indoor and outdoor RC car racing venue in Dubai targeting families, hobbyists, and corporate clients.
Brand palette: Racing Blue (#0B2447), Track Orange (#F26B1F), Checkered Black, white. Premium, motorsport-magazine feel.
The image must look like a real photograph (or a realistic editorial render), free of text overlays, free of logos, free of em dashes.
The original image brief was: "${item.prompt}".

Judge whether the generated image fits the brief AND the brand. Score 0 to 10:
- 0 to 3 means clearly broken (wrong subject, looks like AI slop, distorted humans, text noise, wrong colors).
- 4 to 6 means mediocre (off-brand colors, generic composition, missing key element from brief).
- 7 to 8 means good (matches the brief but with minor issues).
- 9 to 10 means excellent (publication-ready, brand-aligned, premium-looking).

Return JSON only: { "fits": boolean, "score": integer, "verdict": "one-sentence reasoning", "issues": [string], "improvements": "one-sentence on what to change next time" }.`;

  try {
    const r = await reviewImage({ apiKey, prompt: reviewPrompt, imagePath: filePath });
    reviews.push({ id: item.id, file: filePath, ...r });
    console.log(`${r.score}/10 -> ${r.verdict}`);
  } catch (err) {
    console.log(`FAIL ${err.message ?? err}`);
  }
}

fs.writeFileSync(
  path.join(ROOT, "reviews.json"),
  JSON.stringify({ generatedAt: new Date().toISOString(), reviews }, null, 2),
);

const passed = reviews.filter((r) => r.score >= 7).length;
const weak = reviews.filter((r) => r.score < 7);
console.log(`\nSummary: ${passed}/${reviews.length} scored 7 or higher.`);
if (weak.length) {
  console.log("\nWeak images to regenerate:");
  for (const w of weak) console.log(`  - ${w.id} (${w.score}/10): ${w.verdict}`);
}
