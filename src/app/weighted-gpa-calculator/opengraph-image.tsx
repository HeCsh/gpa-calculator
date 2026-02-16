import { createOGImage, OG_SIZE } from "@/lib/ogImage";

export const size = OG_SIZE;
export const contentType = "image/png";
export const runtime = "edge";

export default function OGImage() {
  return createOGImage(
    "Weighted GPA Calculator",
    "See how AP, IB & Honors courses boost your 5.0 scale GPA"
  );
}
