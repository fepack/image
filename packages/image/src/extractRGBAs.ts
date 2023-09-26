type RGBA = readonly [number, number, number, number];
type ExtractRGBAsOptions = { quality: number };
const initialOptions: ExtractRGBAsOptions = { quality: 100 };

/**
 * Filters and extracts relevant pixels from image data based on quality setting.
 * @param image - The image data.
 * @param [options] - The options to define the quality of extraction.
 * @throws Will throw an error if quality is not between 1 and 100.
 * @returns An array of RGBA values.
 */
export const extractRGBAs = (
  image: HTMLImageElement,
  options = initialOptions,
) => {
  if (options.quality < 1 || options.quality > 100) {
    throw new Error("options.quality should be between 1 and 100");
  }
  const uint8ClampedArray = extractUint8ClampedArray(image);
  const step = Math.ceil(100 / options.quality);

  return Array.from({
    length: Math.ceil(uint8ClampedArray.length / (4 * step)),
  }).map((_, index) => {
    const rIndex = index * 4 * step;

    return [
      uint8ClampedArray[rIndex],
      uint8ClampedArray[rIndex + 1],
      uint8ClampedArray[rIndex + 2],
      uint8ClampedArray[rIndex + 3],
    ] as RGBA;
  });
};

/**
 * Extracts pixel data from an image.
 * @param image - The image element.
 * @throws Will throw an error if canvasRenderingContext2D is not supported.
 * @returns The pixel data of the image.
 */
const extractUint8ClampedArray = (image: HTMLImageElement) => {
  const canvas = document.createElement("canvas");
  const canvasRenderingContext2D = canvas.getContext("2d");
  if (!canvasRenderingContext2D) {
    throw new Error("canvasRenderingContext2D is not supported");
  }
  canvas.width = image.naturalWidth;
  canvas.height = image.naturalHeight;
  canvasRenderingContext2D.drawImage(image, 0, 0);

  return canvasRenderingContext2D.getImageData(
    0,
    0,
    canvas.width,
    canvas.height,
  ).data;
};
