import { describe, expect, test } from "vitest";
import { checkWebPSupport } from "../index";

describe("WebP Format Support", () => {
  test("checkWebPSupport should return a boolean", () => {
    checkWebPSupport((isSupported) => {
      expect(typeof isSupported).toBe("boolean");
    });
  });
});
