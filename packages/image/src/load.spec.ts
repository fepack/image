import { describe, expect, it } from "vitest";
import { load } from ".";

describe("load", () => {
  it("should load image by src", async () => {
    const image = await load("src/images/test.png");
    expect(image.src).toBe("http://localhost:5174/src/images/test.png");
  });
});
