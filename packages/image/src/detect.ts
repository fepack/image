export const MIME_TYPES = {
  JPEG: "image/jpeg",
  PNG: "image/png",
  GIF: "image/gif",
  WEBP: "image/webp",
  SVG: "image/svg+xml",
  AVIF: "image/avif",
  ICO: "image/x-icon",
} as const;

export type MimeType = keyof typeof MIME_TYPES;

/**
 * Represents the file signatures for various MIME types.
 * @see https://en.wikipedia.org/wiki/List_of_file_signatures
 */
export const FILE_SIGNATURES: Record<MimeType, number[]> = {
  JPEG: [0xff, 0xd8, 0xff],
  PNG: [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a],
  GIF: [0x47, 0x49, 0x46, 0x38],
  WEBP: [0x52, 0x49, 0x46, 0x46, 0, 0, 0, 0, 0x57, 0x45, 0x42, 0x50],
  SVG: [0x3c, 0x3f, 0x78, 0x6d, 0x6c],
  AVIF: [0, 0, 0, 0, 0x66, 0x74, 0x79, 0x70, 0x61, 0x76, 0x69, 0x66],
  ICO: [0x00, 0x00, 0x01, 0x00],
};

function isMimeType(value: string): value is MimeType {
  return value in MIME_TYPES;
}

/**
 * Inspects the first few bytes of a buffer to determine if
 * it matches a known file signature.
 *
 * @param {Buffer} buffer - The buffer containing the file's first few bytes.
 * @returns {(typeof MIME_TYPES)[MimeType] | null} - The detected MIME type or null if no known signature is matched.
 */
export function detect(buffer: Buffer): (typeof MIME_TYPES)[MimeType] | null {
  for (const mimeType in FILE_SIGNATURES) {
    if (isMimeType(mimeType)) {
      const matchesSignature = FILE_SIGNATURES[mimeType].every(
        (b, i) => !b || buffer[i] === b,
      );

      if (matchesSignature) {
        return MIME_TYPES[mimeType];
      }
    }
  }

  return null;
}
