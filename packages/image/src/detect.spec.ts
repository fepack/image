import { describe, expect, test } from "vitest";
import { FILE_TYPES } from "./detect";
import { detect } from ".";

describe("MIME type detection utility", () => {
  test("should return null for unknown signatures", () => {
    const unknownSignature = new Uint8Array([0x00, 0x00, 0x00, 0x00]);
    expect(detect(unknownSignature)).toBeNull();
  });

  Object.keys(FILE_TYPES).forEach((key) => {
    const { mime, signature } = FILE_TYPES[key];

    test(`should detect ${key} files`, () => {
      const signatureUint8Array = new Uint8Array(signature);
      expect(detect(signatureUint8Array)).toEqual(mime);
    });
  });

  test("should return null for partial signatures", () => {
    const partialJPEGSignature = new Uint8Array([0xff, 0xd8]);
    expect(detect(partialJPEGSignature)).toBeNull();
  });

  test("should detect MIME type even with extra data", () => {
    const jpegWithExtraData = new Uint8Array([
      ...FILE_TYPES.JPEG.signature,
      0x00,
      0x01,
      0x02,
    ]);
    expect(detect(jpegWithExtraData)).toEqual(FILE_TYPES.JPEG.mime);
  });
});
