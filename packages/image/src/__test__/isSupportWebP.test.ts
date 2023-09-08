import { describe, expect, test } from "vitest";
import { isSupportWebP } from "../index";

describe("WebP Format Support", () => {
  test("isSupportWebP should return a boolean", async () => {
    const isSupported = await isSupportWebP();
    expect(typeof isSupported).toBe("boolean");
  });
});
