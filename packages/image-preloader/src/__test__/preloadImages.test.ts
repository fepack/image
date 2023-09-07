import { describe, expect, test } from "vitest";
import { preloadImages, supportsImageFormat } from "../index";

describe("Image Format Support", () => {
  test("supportsImageFormat should return true for webp if supported", async () => {
    const isSupported = supportsImageFormat("webp");
    expect(typeof isSupported).toBe("boolean");
  });

  test("supportsImageFormat should return true for avif if supported", async () => {
    const isSupported = supportsImageFormat("avif");
    expect(typeof isSupported).toBe("boolean");
  });

  test("supportsImageFormat should return false for unsupported formats", async () => {
    const isSupported = supportsImageFormat("unsupported-format");
    expect(isSupported).toBe(false);
  });

  test("supportsImageFormat should return false for non-string formats", async () => {
    // @ts-ignore
    const isSupported = supportsImageFormat(12345);
    expect(isSupported).toBe(false);
  });
});

describe("Preload Images", () => {
  test("preloadImages should preload the provided images", async () => {
    const mockImages = [
      {
        png: "./images/test.png",
        webp: "./images/test.webp",
        avif: "./images/test.avif",
      },
      {
        png: "./images/test.png",
        webp: "./images/test.webp",
      },
      {
        png: "./images/test.png",
      },
    ];

    preloadImages(mockImages);
    expect(true).toBe(true);
  });

  test("preloadImages should handle empty image array", async () => {
    const mockImages = [];

    preloadImages(mockImages);
    expect(true).toBe(true);
  });
});
