/**
 * Loads the given images. If WebP is WebP source is provided, it will load that. Otherwise, it loads the default source.
 */
export const load = (src: HTMLImageElement["src"]) =>
  new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject();
    image.src = src;
  });
