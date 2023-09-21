interface PaletteOptions {
  colorCount?: number;
  quality?: number;
}

/**
 * Extracts a palette of colors from a given image URL based on provided options.
 * @param {string} imageUrl - The URL of the image.
 * @param {PaletteOptions} [options] - The extraction options.
 */
export const colorExtractor = (imageUrl: string, options?: PaletteOptions) => {
  return loadImageFromUrl(imageUrl)
    .then(extractImage)
    .then((data) => {
      if (!data) {
        return [];
      }

      const pixels = filterRelevantPixels(data, options?.quality);
      const count = options?.colorCount || pixels.length;
      return pixels.slice(0, count);
    });
};

/**
 * Extracts pixel data from an image.
 * @param {HTMLImageElement} img - The image element.
 */
const extractImage = (img: HTMLImageElement) => {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");

  if (!context) {
    return null;
  }

  canvas.width = img.naturalWidth;
  canvas.height = img.naturalHeight;
  context.drawImage(img, 0, 0);

  return context.getImageData(0, 0, canvas.width, canvas.height).data;
};

/**
 * Loads an image from a given URL.
 * @param {string} url - The URL of the image to load.
 */
const loadImageFromUrl = (url: string) => {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.crossOrigin = "Anonymous";
    img.src = url;
  });
};

/**
 * Filters and extracts relevant pixels from image data based on quality setting.
 * @param {Uint8ClampedArray} data - The image pixel data.
 * @param {number} [quality=100] - Quality setting for filtering pixels. Higher values mean more pixels are processed. Range: [1, 100].
 */
const filterRelevantPixels = (data: Uint8ClampedArray, quality = 100) => {
  if (quality < 1 || quality > 100) {
    throw new Error("Quality should be between 1 and 100");
  }

  const step = Math.ceil(100 / quality);
  return Array.from({ length: Math.ceil(data.length / (4 * step)) })
    .map((_, index) => {
      const idx = index * 4 * step;
      return [data[idx], data[idx + 1], data[idx + 2], data[idx + 3]];
    })
    .filter(([r, g, b, a]) => a >= 125 && !(r > 250 && g > 250 && b > 250))
    .map(([r, g, b]) => [r, g, b]);
};
