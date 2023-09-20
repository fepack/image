/**
 * Represents the file signatures for various MIME types.
 * @see https://en.wikipedia.org/wiki/List_of_file_signatures
 */
export const FILE_TYPES = {
  JPEG: {
    mime: "image/jpeg",
    signature: [0xff, 0xd8, 0xff],
  },
  PNG: {
    mime: "image/png",
    signature: [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a],
  },
  GIF: {
    mime: "image/gif",
    signature: [0x47, 0x49, 0x46, 0x38],
  },
  WEBP: {
    mime: "image/webp",
    signature: [0x52, 0x49, 0x46, 0x46, 0, 0, 0, 0, 0x57, 0x45, 0x42, 0x50],
  },
  SVG: {
    mime: "image/svg+xml",
    signature: [0x3c, 0x3f, 0x78, 0x6d, 0x6c],
  },
  AVIF: {
    mime: "image/avif",
    signature: [0, 0, 0, 0, 0x66, 0x74, 0x79, 0x70, 0x61, 0x76, 0x69, 0x66],
  },
  ICO: {
    mime: "image/x-icon",
    signature: [0x00, 0x00, 0x01, 0x00],
  },
};

const FILE_TYPE_KEYS = Object.keys(
  FILE_TYPES,
) as readonly (keyof typeof FILE_TYPES)[];

/**
 * Inspects the first few bytes of a buffer to determine if
 * it matches a known file signature.
 *
 * @param {Buffer} buffer - The buffer containing the file's first few bytes.
 * @returns The detected MIME type or null if no known signature is matched.
 */
export const detect = (buffer: Buffer) => {
  for (const key of FILE_TYPE_KEYS) {
    const { mime, signature } = FILE_TYPES[key];

    if (signature.every((byte, index) => byte === buffer[index])) {
      return mime;
    }
  }

  return null;
};
