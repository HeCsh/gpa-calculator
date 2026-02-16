import { createOGImage, OG_SIZE } from "@/lib/ogImage";
import { getCollegeById, TOP_COLLEGES } from "@/data/topColleges";

export const size = OG_SIZE;
export const contentType = "image/png";
export function generateStaticParams() {
  return TOP_COLLEGES.map((c) => ({ college: c.id }));
}

export default async function OGImage({ params }: { params: Promise<{ college: string }> }) {
  const { college: collegeId } = await params;
  const college = getCollegeById(collegeId);
  const name = college?.name ?? "College";

  return createOGImage(
    `GPA Calculator for ${name}`,
    college ? `Avg GPA: ${college.avgGPA.toFixed(2)} | Acceptance: ${college.acceptanceRate}%` : undefined,
  );
}
