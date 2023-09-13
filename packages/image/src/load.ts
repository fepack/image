import checkWebPSupport from "./checkWebPSupport";

interface ImageSource {
  defaultSrc: string;
  webpSrc?: string;
}

/**
 * Loads the given images. If WebP is supported and a WebP source is provided, it will load that. Otherwise, it loads the default source.
 * @param {ImageSource[]} images - Array of image sources to preload.
 */
async function load(images: ImageSource[]) {
  const webpSupported = await checkWebPSupport();

  for (const image of images) {
    const selectedSource =
      webpSupported && image.webpSrc ? image.webpSrc : image.defaultSrc;
    const imageElement = new Image();
    imageElement.src = selectedSource;
  }
}

export { load, type ImageSource };
