import { createOGImage, OG_SIZE } from "@/lib/ogImage";

export const size = OG_SIZE;
export const contentType = "image/png";
export const runtime = "edge";

export default function OGImage() {
  return createOGImage(
    "GPA Scale Reference",
    "Letter grade to GPA conversion for 4.0, 5.0 & UC scales"
  );
}
