import { afterEach, beforeAll, describe, expect, test } from "vitest";
import { preloadImages, supportsImageFormat } from "../index";

describe("Image Format Support", () => {
  test("supportsImageFormat should return true for webp if supported", () => {
    const isSupported = supportsImageFormat("webp");
    expect(typeof isSupported).toBe("boolean");
  });

  test("supportsImageFormat should return true for avif if supported", () => {
    const isSupported = supportsImageFormat("avif");
    expect(typeof isSupported).toBe("boolean");
  });

  test("supportsImageFormat should return false for unsupported formats", () => {
    const isSupported = supportsImageFormat("unsupported-format");
    expect(isSupported).toBe(false);
  });

  test("supportsImageFormat should return false for non-string formats", () => {
    // @ts-ignore
    const isSupported = supportsImageFormat(12345);
    expect(isSupported).toBe(false);
  });
});

describe("Preload Images", () => {
  let mockImageSrc: string | undefined;

  beforeAll(() => {
    Object.defineProperty(global.Image.prototype, "src", {
      set(src) {
        mockImageSrc = src;
      },
    });
  });

  afterEach(() => {
    mockImageSrc = undefined;
  });

  test("avif support, preloadImages should preload the provided images", () => {
    const mockImages = [
      {
        png: "./images/test.png",
        webp: "./images/test.webp",
        avif: "./images/test.avif",
      },
    ];

    preloadImages(mockImages);
    expect(mockImageSrc).toBe("./images/test.avif");
  });

  test("preloadImages should handle empty image array", () => {
    const mockImages = [];
    preloadImages(mockImages);
    expect(mockImageSrc).toBeUndefined();
  });
});
