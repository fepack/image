import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { type ImageSource, load } from "..";

class MockImage {
  public src = "";

  public setAttribute(name: string, value: string) {
    this[name] = value;
  }

  public constructor() {
    MockImage.lastInstance = this;
  }

  public static lastInstance: MockImage;
}

describe("load function", () => {
  const originalImage = window.Image;

  beforeAll(() => {
    window.Image = MockImage as unknown as typeof Image;
  });

  afterAll(() => {
    window.Image = originalImage;
  });

  it("should load defaultSrc when webpSrc is not provided", () => {
    const testImage: ImageSource = {
      defaultSrc: "./images/test.png",
    };

    load([testImage]);

    expect(MockImage.lastInstance.src).toBe("./images/test.png");
  });

  it("should load webpSrc when provided", () => {
    const imageSource: ImageSource = {
      defaultSrc: "./images/test.png",
      webpSrc: "./images/test.webp",
    };

    load([imageSource]);

    expect(MockImage.lastInstance.src).toBe("./images/test.webp");
  });
});
