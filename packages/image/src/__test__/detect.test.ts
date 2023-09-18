import { Buffer } from "buffer";
import { describe, expect, test } from "vitest";
import { detect } from "..";
import { FILE_TYPES } from "../detect";

describe("MIME type detection utility", () => {
  test("should return null for unknown signatures", () => {
    const unknownSignature = Buffer.from([0x00, 0x00, 0x00, 0x00]);
    expect(detect(unknownSignature)).toBeNull();
  });

  Object.keys(FILE_TYPES).forEach((key) => {
    const mimeType = FILE_TYPES[key].mime;
    const signature = FILE_TYPES[key].signature;

    test(`should detect ${key} files`, () => {
      const signatureBuffer = Buffer.from(signature);
      expect(detect(signatureBuffer)).toEqual(mimeType);
    });
  });

  test("should return null for partial signatures", () => {
    const partialJPEGSignature = Buffer.from([0xff, 0xd8]);
    expect(detect(partialJPEGSignature)).toBeNull();
  });

  test("should detect MIME type even with extra data", () => {
    const jpegWithExtraData = Buffer.concat([
      Buffer.from(FILE_TYPES.JPEG.signature),
      Buffer.from([0x00, 0x01, 0x02]),
    ]);
    expect(detect(jpegWithExtraData)).toEqual(FILE_TYPES.JPEG.mime);
  });
});
