import type { ImageLoaderProps } from "next/image";
import { asset } from "./asset";

export function cloudinaryLoader({
  src,
  width,
  quality,
}: ImageLoaderProps): string {
  const cloud = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  if (!cloud) {
    return asset(src);
  }
  if (src.startsWith("http")) {
    return src;
  }
  if (src.startsWith("/")) {
    return asset(src);
  }
  const q = quality ?? 80;
  return `https://res.cloudinary.com/${cloud}/image/upload/f_auto,q_${q},w_${width}/${src}`;
}

export function cloudinaryUrl(
  publicId: string,
  transforms: string = "f_auto,q_auto",
): string {
  if (publicId.startsWith("http")) {
    return publicId;
  }
  if (publicId.startsWith("/")) {
    return asset(publicId);
  }
  const cloud = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  if (!cloud) {
    return asset(publicId);
  }
  return `https://res.cloudinary.com/${cloud}/image/upload/${transforms}/${publicId}`;
}
