// https://developers.google.com/speed/webp/faq?hl=ko#in_your_own_javascript
function checkWebPSupport(): Promise<boolean> {
  return new Promise((resolve) => {
    const webpCheckImageElement = new Image();

    webpCheckImageElement.onload = () =>
      resolve(
        webpCheckImageElement.width > 0 && webpCheckImageElement.height > 0
      );
    webpCheckImageElement.onerror = () => resolve(false);

    const webpTestImageSrc = "UklGRhoAAABXRUJQVlA4TA0AAAAvAAAAEAcQERGIiP4HAA==";
    webpCheckImageElement.src = "data:image/webp;base64," + webpTestImageSrc;
  });
}

interface ImageSource {
  defaultSrc: string;
  webpSrc?: string;
}

async function preloadImages(images: ImageSource[]) {
  const webpIsSupported = await checkWebPSupport();

  for (const image of images) {
    const selectedSource =
      webpIsSupported && image.webpSrc ? image.webpSrc : image.defaultSrc;
    const preloadedImageElement = new Image();

    preloadedImageElement.src = selectedSource;
  }
}

export { checkWebPSupport, preloadImages, type ImageSource };
