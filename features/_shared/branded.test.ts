import { describe, expect, it } from "vitest";
import {
  productId,
  shopifyVariantId,
  blogPostSlug,
  eventSlug,
  isMembershipTier,
} from "./branded";

describe("branded constructors", () => {
  it("constructs ProductId without changing the string", () => {
    const id = productId("p-1");
    expect(id).toBe("p-1");
  });

  it("constructs ShopifyVariantId and BlogPostSlug and EventSlug as identity", () => {
    expect(shopifyVariantId("v")).toBe("v");
    expect(blogPostSlug("b")).toBe("b");
    expect(eventSlug("e")).toBe("e");
  });

  it("validates membership tier values", () => {
    expect(isMembershipTier("bronze")).toBe(true);
    expect(isMembershipTier("silver")).toBe(true);
    expect(isMembershipTier("gold")).toBe(true);
    expect(isMembershipTier("platinum")).toBe(false);
  });
});
