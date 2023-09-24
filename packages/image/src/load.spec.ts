import { describe, expect, it } from "vitest";
import { load } from ".";

describe("load", () => {
  it("should load image by src", async () => {
    const loadedImage = await load("src/images/test.png");
    expect(loadedImage.src).toBe("http://localhost:5173/src/images/test.png");
  });
});
