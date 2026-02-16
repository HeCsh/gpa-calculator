import { createOGImage, OG_SIZE } from "@/lib/ogImage";

export const size = OG_SIZE;
export const contentType = "image/png";
export const runtime = "edge";

export default function OGImage() {
  return createOGImage(
    "GPA Calculator 2025-2026",
    "Free weighted, unweighted & UC GPA calculator for high school students"
  );
}
