import { describe, expect, it } from "vitest";
import { extractRGBAs } from ".";

const load = (src: HTMLImageElement["src"]) =>
  new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject();
    image.src = src;
  });

describe("extractRGBAs", () => {
  it("should return an array of colors", async () => {
    const image = await load("src/images/test.png");
    const result = extractRGBAs(image, { quality: 10 });
    expect(result.length).toBeGreaterThan(0);
  });

  it("should throw an error if quality is out of range", async () => {
    const image = await load("src/images/test.png");
    expect(() => extractRGBAs(image, { quality: 101 })).toThrow(
      "options.quality should be between 1 and 100",
    );
    expect(() => extractRGBAs(image, { quality: 0 })).toThrow(
      "options.quality should be between 1 and 100",
    );
  });
});
