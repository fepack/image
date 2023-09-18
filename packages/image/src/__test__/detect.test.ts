import { Buffer } from "buffer";
import { describe, expect, test } from "vitest";
import { FILE_SIGNATURES, MIME_TYPES, type MimeType, detect } from "..";

describe("MIME type detection utility", () => {
  test("should return null for unknown signatures", () => {
    const unknownSignature = Buffer.from([0x00, 0x00, 0x00, 0x00]);
    expect(detect(unknownSignature)).toBeNull();
  });

  Object.keys(FILE_SIGNATURES).forEach((key) => {
    const mimeType = key as MimeType;

    test(`should detect ${mimeType} files`, () => {
      const signatureBuffer = Buffer.from(FILE_SIGNATURES[mimeType]);
      expect(detect(signatureBuffer)).toEqual(MIME_TYPES[mimeType]);
    });
  });

  test("should return null for partial signatures", () => {
    const partialJPEGSignature = Buffer.from([0xff, 0xd8]);
    expect(detect(partialJPEGSignature)).toBeNull();
  });

  test("should detect MIME type even with extra data", () => {
    const jpegWithExtraData = Buffer.concat([
      Buffer.from(FILE_SIGNATURES.JPEG),
      Buffer.from([0x00, 0x01, 0x02]),
    ]);
    expect(detect(jpegWithExtraData)).toEqual(MIME_TYPES.JPEG);
  });
});
