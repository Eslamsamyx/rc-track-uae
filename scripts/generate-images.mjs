import fs from "node:fs";
import path from "node:path";
import { generateImage, saveBase64Png, loadApiKey } from "./lib/gemini.mjs";
import { ALL_PROMPTS } from "./prompts.mjs";

const apiKey = loadApiKey();
const ROOT = "public/generated";

const onlyArg = process.argv.find((a) => a.startsWith("--only="))?.slice(7);
const limit = Number(process.argv.find((a) => a.startsWith("--limit="))?.slice(8) || 0);
const force = process.argv.includes("--force");

let prompts = ALL_PROMPTS;
if (onlyArg) {
  const ids = onlyArg.split(",");
  prompts = prompts.filter((p) => ids.includes(p.id));
}
if (limit > 0) prompts = prompts.slice(0, limit);

const failures = [];
let done = 0;
const t0 = Date.now();

for (const item of prompts) {
  const outPath = path.join(ROOT, item.out);
  if (fs.existsSync(outPath) && !force) {
    console.log(`[skip exists] ${item.id} -> ${outPath}`);
    done++;
    continue;
  }
  console.log(`[gen ${++done}/${prompts.length}] ${item.id} (${item.aspect})`);
  try {
    const result = await generateImage(item.prompt, apiKey, { tries: 3, timeoutMs: 90000 });
    saveBase64Png(result.data, outPath);
    console.log(`  ok -> ${outPath} (${(result.data.length * 0.75 / 1024).toFixed(0)} KB approx)`);
  } catch (err) {
    console.log(`  FAIL: ${err.message ?? err}`);
    failures.push({ id: item.id, err: err.message ?? String(err) });
  }
}

const elapsed = ((Date.now() - t0) / 1000).toFixed(1);
console.log(`\nDone in ${elapsed}s. Generated ${prompts.length - failures.length}/${prompts.length}.`);
if (failures.length) {
  console.log("Failures:");
  for (const f of failures) console.log(`  - ${f.id}: ${f.err}`);
  process.exit(1);
}
