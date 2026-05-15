import { describe, expect, it } from "vitest";
import { isLocale, getDirection, locales, defaultLocale } from "./config";

describe("i18n config", () => {
  it("isLocale narrows known locales", () => {
    expect(isLocale("en")).toBe(true);
    expect(isLocale("ar")).toBe(true);
    expect(isLocale("fr")).toBe(false);
  });

  it("getDirection returns rtl for Arabic", () => {
    expect(getDirection("en")).toBe("ltr");
    expect(getDirection("ar")).toBe("rtl");
  });

  it("includes en and ar in locales and sets defaultLocale", () => {
    expect(locales).toContain("en");
    expect(locales).toContain("ar");
    expect(defaultLocale).toBe("en");
  });
});
