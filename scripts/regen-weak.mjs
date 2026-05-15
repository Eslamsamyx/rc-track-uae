import fs from "node:fs";
import path from "node:path";
import { generateImage, reviewImage, saveBase64Png, loadApiKey } from "./lib/gemini.mjs";
import { ALL_PROMPTS } from "./prompts.mjs";

const apiKey = loadApiKey();
const ROOT = "public/generated";
const REVIEWS = path.join(ROOT, "reviews.json");

const SCORE_FLOOR = Number(process.argv.find((a) => a.startsWith("--floor="))?.slice(8) || 7);

if (!fs.existsSync(REVIEWS)) {
  console.error("Run review-images.mjs first to produce reviews.json");
  process.exit(1);
}

const data = JSON.parse(fs.readFileSync(REVIEWS, "utf8"));
const weak = data.reviews.filter((r) => r.score < SCORE_FLOOR);
if (!weak.length) {
  console.log(`No images below score ${SCORE_FLOOR}. Nothing to regenerate.`);
  process.exit(0);
}

const STRICT_SUFFIX = ` CRITICAL CONSTRAINTS: Absolutely no readable text, no signage with letters, no brand names, no logos, no posters, no banners with words, no chalkboards or whiteboards with writing, no race numbers that read as text, no screens displaying text, no captions, no watermarks. Any sign or screen visible must be blurred or generic shapes. Stick strictly to the racing-blue and track-orange palette in props and clothing. If unsure, leave a surface plain.`;

console.log(`Regenerating ${weak.length} image(s) below score ${SCORE_FLOOR}:`);
const results = [];
for (const w of weak) {
  const item = ALL_PROMPTS.find((p) => p.id === w.id);
  if (!item) {
    console.log(`  ${w.id}: prompt not found, skipping`);
    continue;
  }
  console.log(`- ${w.id} (was ${w.score}/10): ${w.verdict}`);
  const newPrompt = item.prompt + STRICT_SUFFIX;
  try {
    const result = await generateImage(newPrompt, apiKey, { tries: 3, timeoutMs: 90000 });
    const outPath = path.join(ROOT, item.out);
    saveBase64Png(result.data, outPath);
    console.log(`  regenerated -> ${outPath}`);

    const reviewPrompt = `You are a senior creative director evaluating a brand image for RC Track UAE.
Brand palette: Racing Blue (#0B2447), Track Orange (#F26B1F). NO text, NO logos, NO brand names.
Brief: "${item.prompt}".
Return JSON: { "fits": boolean, "score": integer 0-10, "verdict": "...", "issues": [string], "improvements": "..." }.`;
    const r2 = await reviewImage({ apiKey, prompt: reviewPrompt, imagePath: outPath });
    results.push({ id: w.id, before: w.score, after: r2.score, verdict: r2.verdict });
    console.log(`  new score: ${r2.score}/10 -> ${r2.verdict}`);
  } catch (err) {
    console.log(`  FAIL: ${err.message ?? err}`);
    results.push({ id: w.id, before: w.score, error: err.message ?? String(err) });
  }
}

fs.writeFileSync(
  path.join(ROOT, "reviews-after-regen.json"),
  JSON.stringify({ regeneratedAt: new Date().toISOString(), results }, null, 2),
);
console.log(`\nRegen finished. Detail in ${path.join(ROOT, "reviews-after-regen.json")}`);
