import { describe, expect, test } from "vitest";
import { checkWebPSupport } from "..";

describe("WebP Format Support", () => {
  test("checkWebPSupport should return a boolean", async () => {
    const webPSupport = await checkWebPSupport();
    expect(typeof webPSupport).toBe("boolean");
  });
});
