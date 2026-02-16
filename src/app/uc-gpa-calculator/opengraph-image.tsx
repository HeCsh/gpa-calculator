import { createOGImage, OG_SIZE } from "@/lib/ogImage";

export const size = OG_SIZE;
export const contentType = "image/png";
export const runtime = "edge";

export default function OGImage() {
  return createOGImage(
    "UC GPA Calculator",
    "Calculate your UC Capped Weighted, Uncapped & Unweighted GPA"
  );
}
