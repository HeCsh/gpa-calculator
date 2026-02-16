import { createOGImage, OG_SIZE } from "@/lib/ogImage";

export const size = OG_SIZE;
export const contentType = "image/png";
export const runtime = "edge";

export default function OGImage() {
  return createOGImage(
    "What Is a Good GPA?",
    "GPA ranges by college tier, national percentiles & tips"
  );
}
