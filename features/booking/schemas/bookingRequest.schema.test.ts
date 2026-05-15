import { describe, expect, it } from "vitest";
import { parseBookingRequest, SIMPLYBOOK_SERVICE_IDS } from "./bookingRequest.schema";

describe("parseBookingRequest", () => {
  const valid = {
    service: "trial",
    name: "Layla Hassan",
    email: "layla@example.com",
    phone: "+971501234567",
  };

  it("accepts a valid trial booking", () => {
    const result = parseBookingRequest(valid);
    expect(result.ok).toBe(true);
  });

  it("rejects an invalid service", () => {
    const result = parseBookingRequest({ ...valid, service: "moon-trip" });
    expect(result.ok).toBe(false);
  });

  it("rejects phone numbers that are not UAE format", () => {
    const result = parseBookingRequest({ ...valid, phone: "+15551234567" });
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.error).toMatch(/UAE/);
  });

  it("accepts the 0-prefixed UAE phone format", () => {
    const result = parseBookingRequest({ ...valid, phone: "0501234567" });
    expect(result.ok).toBe(true);
  });

  it("rejects short names", () => {
    const result = parseBookingRequest({ ...valid, name: "A" });
    expect(result.ok).toBe(false);
  });

  it("maps every service id to a SimplyBook.me service number", () => {
    expect(Object.keys(SIMPLYBOOK_SERVICE_IDS).length).toBeGreaterThanOrEqual(9);
    for (const id of Object.values(SIMPLYBOOK_SERVICE_IDS)) {
      expect(typeof id).toBe("number");
    }
  });
});
