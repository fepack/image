type RGBA = readonly [number, number, number, number];
type RGBAProcessor = (rgbaArray: RGBA[]) => RGBA[];
type ExtractRGBAsOptions = { quality?: number; unique?: boolean };
const initialOptions: ExtractRGBAsOptions = {
  quality: 100,
  unique: false,
};

/**
 * Filters and extracts relevant pixels from image data based on quality setting.
 * @param image - The image data.
 * @param [options] - The options to define the quality of extraction.
 * @returns An array of RGBA values.
 */
export const extractRGBAs = (
  image: HTMLImageElement,
  options = initialOptions,
) => {
  const uint8ClampedArray = extractUint8ClampedArray(image);
  const rgbaArray = Array.from({
    length: Math.ceil(uint8ClampedArray.length / 4),
  }).map((_, index) => {
    const rIndex = index * 4;

    return [
      uint8ClampedArray[rIndex],
      uint8ClampedArray[rIndex + 1],
      uint8ClampedArray[rIndex + 2],
      uint8ClampedArray[rIndex + 3],
    ] as RGBA;
  });

  const pipelineFunctions = [
    ...((options.quality as number) < 100
      ? [applyQuality(options.quality as number)]
      : []),
    ...(options.unique ? [applyUnique] : []),
  ];

  return pipeline(...pipelineFunctions)(rgbaArray);
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

const pipeline =
  (...functions: RGBAProcessor[]) =>
  (input: RGBA[]) =>
    functions.reduce((acc, func) => func(acc), input);

const applyQuality = (quality: number) => (rgbaArray: RGBA[]) => {
  const step = Math.ceil(100 / quality);

  return rgbaArray.filter((_, index) => index % step === 0);
};

const applyUnique = (rgbaArray: RGBA[]) => {
  const uniqueSet = new Set<string>();

  return rgbaArray.filter((rgba) => {
    const key = rgba.join(",");
    if (!uniqueSet.has(key)) {
      uniqueSet.add(key);

      return true;
    }

    return false;
  });
};
