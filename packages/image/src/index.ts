/** 
 * @see https://developers.google.com/speed/webp/faq?hl=ko#in_your_own_javascript
 */
function isSupportWebP(): Promise<boolean> {
  return new Promise((resolve) => {
    const image = new Image();
    image.onload = () => resolve(image.width > 0 && image.height > 0);
    image.onerror = () => resolve(false);
    image.src =
      "data:image/webp;base64,UklGRhoAAABXRUJQVlA4TA0AAAAvAAAAEAcQERGIiP4HAA==";
  });
}

interface ImageSource {
  defaultSrc: string;
  webpSrc?: string;
}

async function load(images: ImageSource[]) {
  const isSupportedWebp = await isSupportWebP();

  for (const image of images) {
    const selectedSource =
      isSupportedWebp && image.webpSrc ? image.webpSrc : image.defaultSrc;
    const preloadedImageElement = new Image();

    preloadedImageElement.src = selectedSource;
  }
}

export { isSupportWebP, load, type ImageSource };
