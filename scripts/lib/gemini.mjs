import fs from "node:fs";
import path from "node:path";

export function loadApiKey() {
  const envPath = path.resolve(".env.local");
  const text = fs.readFileSync(envPath, "utf8");
  const match = text.match(/^GOOGLE_GEMINI_API_KEY=(.+)$/m);
  if (!match) throw new Error("GOOGLE_GEMINI_API_KEY missing from .env.local");
  return match[1].trim();
}

const IMAGE_MODEL = "gemini-2.5-flash-image";
const REVIEW_MODEL = "gemini-2.5-flash";

const apiBase = (model) =>
  `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`;

export async function generateImage(prompt, apiKey, options = {}) {
  const { tries = 3, timeoutMs = 90000 } = options;
  let lastErr = null;
  for (let attempt = 1; attempt <= tries; attempt++) {
    try {
      const controller = new AbortController();
      const handle = setTimeout(() => controller.abort(), timeoutMs);
      const res = await fetch(`${apiBase(IMAGE_MODEL)}?key=${apiKey}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: controller.signal,
        body: JSON.stringify({
          contents: [{ role: "user", parts: [{ text: prompt }] }],
          generationConfig: {
            responseModalities: ["TEXT", "IMAGE"],
          },
        }),
      });
      clearTimeout(handle);
      const json = await res.json();
      if (!res.ok) throw new Error(`HTTP ${res.status}: ${JSON.stringify(json).slice(0, 400)}`);
      const parts = json?.candidates?.[0]?.content?.parts ?? [];
      const imagePart = parts.find((p) => p.inlineData?.data);
      if (!imagePart) throw new Error(`No image returned. Response: ${JSON.stringify(json).slice(0, 400)}`);
      return {
        mime: imagePart.inlineData.mimeType ?? "image/png",
        data: imagePart.inlineData.data,
        text: parts.find((p) => p.text)?.text,
      };
    } catch (err) {
      lastErr = err;
      const wait = 1500 * attempt;
      await new Promise((r) => setTimeout(r, wait));
    }
  }
  throw lastErr ?? new Error("Image generation failed");
}

export async function reviewImage({ apiKey, prompt, imagePath, mime = "image/png" }) {
  const data = fs.readFileSync(imagePath);
  const res = await fetch(`${apiBase(REVIEW_MODEL)}?key=${apiKey}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [
        {
          role: "user",
          parts: [
            { text: prompt },
            {
              inlineData: {
                mimeType: mime,
                data: data.toString("base64"),
              },
            },
          ],
        },
      ],
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: {
          type: "object",
          properties: {
            fits: { type: "boolean" },
            score: { type: "integer" },
            verdict: { type: "string" },
            issues: { type: "array", items: { type: "string" } },
            improvements: { type: "string" },
          },
          required: ["fits", "score", "verdict"],
        },
      },
    }),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(`Review failed ${res.status}: ${JSON.stringify(json).slice(0, 400)}`);
  const text = json?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) throw new Error("No review text returned");
  return JSON.parse(text);
}

export function saveBase64Png(b64, filePath) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, Buffer.from(b64, "base64"));
}
