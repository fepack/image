// https://developers.google.com/speed/webp/faq?hl=ko#in_your_own_javascript
function checkWebPSupport(): Promise<boolean> {
  return new Promise((resolve) => {
    const testImage = "UklGRhoAAABXRUJQVlA4TA0AAAAvAAAAEAcQERGIiP4HAA==";
    const img = new Image();

    img.onload = () => {
      resolve(img.width > 0 && img.height > 0);
    };

    img.onerror = () => {
      resolve(false);
    };

    img.src = "data:image/webp;base64," + testImage;
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
