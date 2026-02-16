import { createOGImage, OG_SIZE } from "@/lib/ogImage";

export const size = OG_SIZE;
export const contentType = "image/png";
export const runtime = "edge";

export default function OGImage() {
  return createOGImage(
    "How GPA Calculation Works",
    "Complete guide to unweighted, weighted & UC GPA systems"
  );
}
