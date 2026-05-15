import { describe, expect, it } from "vitest";
import { cn, formatPrice, formatDate, slugify, absoluteUrl } from "./utils";

describe("cn", () => {
  it("merges Tailwind classes and dedupes conflicts", () => {
    expect(cn("p-2", "p-4")).toBe("p-4");
  });
  it("handles conditional classes", () => {
    expect(cn("a", false && "b", "c")).toBe("a c");
  });
});

describe("formatPrice", () => {
  it("formats AED in English with the currency code", () => {
    const out = formatPrice(2495, "en");
    expect(out).toMatch(/AED/);
    expect(out).toMatch(/2,495/);
  });
  it("formats AED in Arabic", () => {
    const out = formatPrice(2495, "ar");
    expect(out.length).toBeGreaterThan(0);
  });
});

describe("formatDate", () => {
  it("formats a date in English", () => {
    const out = formatDate("2026-05-15", "en");
    expect(out).toMatch(/2026/);
    expect(out).toMatch(/May|15/);
  });
});

describe("slugify", () => {
  it("kebab-cases punctuation and spaces", () => {
    expect(slugify("Hello World!")).toBe("hello-world");
    expect(slugify("Open Practice (Hourly)")).toBe("open-practice-hourly");
  });
});

describe("absoluteUrl", () => {
  it("appends the path to NEXT_PUBLIC_SITE_URL or the default", () => {
    const out = absoluteUrl("/about");
    expect(out).toMatch(/\/about$/);
    expect(out.startsWith("http")).toBe(true);
  });
});
