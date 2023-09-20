/**
 * Checks for various WebP features support in the browser.
 * @see https://developers.google.com/speed/webp/faq?in_your_own_javascript
 */
const kTestImages = {
  lossy: "UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA",
  lossless: "UklGRhoAAABXRUJQVlA4TA0AAAAvAAAAEAcQERGIiP4HAA==",
  alpha:
    "UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAwAAAARBxAR/Q9ERP8DAABWUDggGAAAABQBAJ0BKgEAAQAAAP4AAA3AAP7mtQAAAA==",
  animation:
    "UklGRlIAAABXRUJQVlA4WAoAAAASAAAAAAAAAAAAQU5JTQYAAAD/////AABBTk1GJgAAAAAAAAAAAAAAAAAAAGQAAABWUDhMDQAAAC8AAAAQBxAREYiI/gcA",
};

type Feature = keyof typeof kTestImages;

/**
 * Checks if a specific WebP feature is supported by the browser.
 * @param feature - The WebP feature to check for.
 */
function checkWebPFeatureSupport(feature: Feature) {
  return new Promise<boolean>((resolve) => {
    const image = new Image();
    image.onload = () => resolve(image.width > 0 && image.height > 0);
    image.onerror = () => resolve(false);
    image.src = "data:image/webp;base64," + kTestImages[feature];
  });
}

const features = Object.keys(kTestImages).filter((key): key is Feature =>
  Object.prototype.hasOwnProperty.call(kTestImages, key),
);

/**
 * Checks if the browser supports all key WebP features.
 */
async function checkWebPSupport() {
  const results = await Promise.all(features.map(checkWebPFeatureSupport));
  return results.every(Boolean);
}

export default checkWebPSupport;
