// WHAT THIS FILE DOES: lets the CMS refer to pictures by their file path (for example
// "/src/assets/uploads/hero.jpg") and turns that path into the real image Astro can optimise.
// Any picture uploaded through the CMS lands in src/assets/uploads and works automatically.
import type { ImageMetadata } from "astro";

const allImages = import.meta.glob<ImageMetadata>("/src/assets/**/*.{jpg,jpeg,png,webp,avif}", {
  eager: true,
  import: "default",
});

export function getImage(path: string): ImageMetadata {
  const key = path.startsWith("/") ? path : `/${path}`;
  const image = allImages[key];
  if (!image) {
    throw new Error(`Image not found: ${path}. Check the file exists in src/assets/uploads/.`);
  }
  return image;
}
