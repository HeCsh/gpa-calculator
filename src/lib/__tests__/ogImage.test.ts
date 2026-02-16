import { describe, it, expect } from "vitest";
import { createOGImage, OG_SIZE } from "@/lib/ogImage";

describe("ogImage", () => {
  it("should export createOGImage as a function", () => {
    expect(typeof createOGImage).toBe("function");
  });

  it("should export OG_SIZE with correct dimensions", () => {
    expect(OG_SIZE).toBeDefined();
    expect(OG_SIZE.width).toBe(1200);
    expect(OG_SIZE.height).toBe(630);
  });

  it("should be callable with a title argument", () => {
    expect(() => createOGImage("Test Title")).not.toThrow();
  });

  it("should be callable with title and subtitle arguments", () => {
    expect(() => createOGImage("Test Title", "Test Subtitle")).not.toThrow();
  });
});
