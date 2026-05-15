import { describe, expect, it, vi, afterEach } from "vitest";
import { cloudinaryLoader, cloudinaryUrl } from "./cloudinary";

afterEach(() => vi.unstubAllEnvs());

describe("cloudinaryLoader", () => {
  it("returns absolute URLs unchanged", () => {
    vi.stubEnv("NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME", "rc-cloud");
    const result = cloudinaryLoader({ src: "https://example.com/a.jpg", width: 400 });
    expect(result).toBe("https://example.com/a.jpg");
  });

  it("returns local paths unchanged", () => {
    vi.stubEnv("NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME", "rc-cloud");
    expect(cloudinaryLoader({ src: "/local.svg", width: 400 })).toBe("/local.svg");
  });

  it("builds a Cloudinary URL when given a public id", () => {
    vi.stubEnv("NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME", "rc-cloud");
    const url = cloudinaryLoader({ src: "products/car", width: 600, quality: 70 });
    expect(url).toBe(
      "https://res.cloudinary.com/rc-cloud/image/upload/f_auto,q_70,w_600/products/car",
    );
  });

  it("falls back to the raw src when no cloud name is configured", () => {
    vi.stubEnv("NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME", "");
    expect(cloudinaryLoader({ src: "products/car", width: 600 })).toBe("products/car");
  });

  it("cloudinaryUrl builds URLs from a public id and default transforms", () => {
    vi.stubEnv("NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME", "rc-cloud");
    expect(cloudinaryUrl("products/x")).toMatch(/rc-cloud\/image\/upload\/.+\/products\/x$/);
  });
});
