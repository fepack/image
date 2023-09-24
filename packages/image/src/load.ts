/**
 * Loads an image from the given source URL and returns a Promise that resolves to the loaded image.
 */
export const load = (src: HTMLImageElement["src"]) =>
  new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject();
    image.src = src;
  });
