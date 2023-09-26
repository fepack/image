/**
 * Loads an image from the given source URL.
 * @param src - The source URL of the image to load.
 * @returns A Promise that resolves to the loaded image.
 * @throws Will reject the promise if the image fails to load.
 */
export const load = (src: HTMLImageElement["src"]) =>
  new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject();
    image.src = src;
  });
