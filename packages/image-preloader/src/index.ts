// https://developers.google.com/speed/webp/faq?hl=ko#in_your_own_javascript
function checkWebPSupport(): Promise<boolean> {
  return new Promise((resolve) => {
    const webpTestImage = "UklGRhoAAABXRUJQVlA4TA0AAAAvAAAAEAcQERGIiP4HAA==";
    const webpCheckImageElement = new Image();

    webpCheckImageElement.onload = () => {
      resolve(
        webpCheckImageElement.width > 0 && webpCheckImageElement.height > 0
      );
    };

    webpCheckImageElement.onerror = () => {
      resolve(false);
    };

    webpCheckImageElement.src = "data:image/webp;base64," + webpTestImage;
  });
}

interface ImageSources {
  defaultSrc: string;
  webp?: string;
}

async function preloadImages(images: ImageSources[]) {
  const supportsWebp = await checkWebPSupport();

  for (const image of images) {
    const src = supportsWebp && image.webp ? image.webp : image.defaultSrc;
    const img = new Image();
    img.src = src;
  }
}

export { checkWebPSupport, preloadImages };
