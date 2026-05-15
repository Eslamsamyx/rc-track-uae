import type { ImageLoaderProps } from "next/image";

export function cloudinaryLoader({
  src,
  width,
  quality,
}: ImageLoaderProps): string {
  const cloud = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  if (!cloud) {
    return src;
  }
  if (src.startsWith("http") || src.startsWith("/")) {
    return src;
  }
  const q = quality ?? 80;
  return `https://res.cloudinary.com/${cloud}/image/upload/f_auto,q_${q},w_${width}/${src}`;
}

export function cloudinaryUrl(
  publicId: string,
  transforms: string = "f_auto,q_auto",
): string {
  if (publicId.startsWith("/") || publicId.startsWith("http")) {
    return publicId;
  }
  const cloud = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  if (!cloud) {
    return publicId;
  }
  return `https://res.cloudinary.com/${cloud}/image/upload/${transforms}/${publicId}`;
}
