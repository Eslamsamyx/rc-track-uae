import { describe, expect, it } from "vitest";
import { parseNewsletter } from "./newsletter.schema";

describe("parseNewsletter", () => {
  it("accepts a valid email", () => {
    const result = parseNewsletter({ email: "racer@example.com" });
    expect(result.ok).toBe(true);
    if (result.ok) expect(result.value.email).toBe("racer@example.com");
  });

  it("rejects an empty string", () => {
    const result = parseNewsletter({ email: "" });
    expect(result.ok).toBe(false);
  });

  it("rejects an invalid email", () => {
    const result = parseNewsletter({ email: "not-an-email" });
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.error).toMatch(/email/);
  });

  it("trims whitespace before validation", () => {
    const result = parseNewsletter({ email: "  racer@example.com  " });
    expect(result.ok).toBe(true);
    if (result.ok) expect(result.value.email).toBe("racer@example.com");
  });
});
