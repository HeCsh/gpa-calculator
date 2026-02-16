import { createOGImage, OG_SIZE } from "@/lib/ogImage";

export const size = OG_SIZE;
export const contentType = "image/png";
export const runtime = "edge";

export default function OGImage() {
  return createOGImage(
    "College GPA Requirements",
    "Average GPAs & acceptance rates for 50+ US colleges"
  );
}
