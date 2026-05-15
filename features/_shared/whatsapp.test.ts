import { describe, expect, it, beforeEach, afterEach, vi } from "vitest";
import { whatsAppLink, whatsAppNumberForDisplay } from "./whatsapp";

describe("whatsAppLink", () => {
  beforeEach(() => {
    vi.stubEnv("NEXT_PUBLIC_WHATSAPP_NUMBER", "971501234567");
  });
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("encodes message and adds the number from env", () => {
    const link = whatsAppLink("Hi there", "en");
    expect(link).toBe("https://wa.me/971501234567?text=Hi%20there");
  });

  it("strips non-digit characters from the env number", () => {
    vi.stubEnv("NEXT_PUBLIC_WHATSAPP_NUMBER", "+971 50 123 4567");
    const link = whatsAppLink("ok", "ar");
    expect(link).toBe("https://wa.me/971501234567?text=ok");
  });

  it("formats the display number with spaces", () => {
    const display = whatsAppNumberForDisplay();
    expect(display).toBe("+971 50 123 4567");
  });
});
