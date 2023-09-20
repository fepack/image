export interface ImageSource {
  defaultSrc: string;
  webpSrc?: string;
}

/**
 * Loads the given images. If WebP is WebP source is provided, it will load that. Otherwise, it loads the default source.
 * @param {ImageSource[]} images - Array of image sources to preload.
 */
export const load = (images: ImageSource[]) => {
  for (const image of images) {
    const imageElement = new Image();
    imageElement.src = image.webpSrc ? image.webpSrc : image.defaultSrc;
  }
};
