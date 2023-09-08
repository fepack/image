// https://developers.google.com/speed/webp/faq?hl=ko#in_your_own_javascript
function checkWebPSupport(callback: (result: boolean) => void) {
  const testImage = "UklGRhoAAABXRUJQVlA4TA0AAAAvAAAAEAcQERGIiP4HAA==";
  const img = new Image();

  img.onload = () => {
    callback(img.width > 0 && img.height > 0);
  };

  img.onerror = () => {
    callback(false);
  };

  img.src = "data:image/webp;base64," + testImage;
}

interface ImageSources {
  defaultSrc: string;
  webp?: string;
}

function preloadImages(images: ImageSources[]) {
  checkWebPSupport((supportsWebp) => {
    images.forEach((image) => {
      const src = supportsWebp && image.webp ? image.webp : image.defaultSrc;
      const img = new Image();
      img.src = src;
    });
  });
}

export { checkWebPSupport, preloadImages };
