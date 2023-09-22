import { describe, expect, it } from "vitest";
import { extractColors } from ".";

describe("extractColors function", () => {
  it("should return an array of colors", async () => {
    const result = await extractColors("src/images/test.png", {
      quality: 10,
    });
    expect(result.length).toBeGreaterThan(0);
  });

  it("should return limited number of colors when colorCount is provided", async () => {
    const colorCount = 5;
    const result = await extractColors("src/images/test.png", {
      quality: 10,
      colorCount,
    });
    expect(result.length).toEqual(colorCount);
  });

  it("should throw an error if quality is out of range", async () => {
    await expect(
      extractColors("src/images/test.png", { quality: 101 }),
    ).rejects.toThrow("Quality should be between 1 and 100");
    await expect(
      extractColors("src/images/test.png", { quality: 0 }),
    ).rejects.toThrow("Quality should be between 1 and 100");
  });

  it("should filter out pixels with opacity less than 125", async () => {
    const result = await extractColors("src/images/test.png");
    const hasTransparentPixel = result.some(([, , , a]) => a < 125);
    expect(hasTransparentPixel).toBe(false);
  });

  it("should filter out almost white pixels", async () => {
    const result = await extractColors("src/images/test.png");
    const hasWhitePixel = result.some(
      ([r, g, b]) => r > 250 && g > 250 && b > 250,
    );
    expect(hasWhitePixel).toBe(false);
  });
});
