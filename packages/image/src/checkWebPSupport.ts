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
 * @returns {Promise<boolean>} Returns a promise that resolves with a boolean indicating if the specified WebP feature is supported.
 */
async function checkWebPFeatureSupport(feature: Features): Promise<boolean> {
  return new Promise((resolve) => {
    const image = new Image();
    image.onload = () => resolve(image.width > 0 && image.height > 0);
    image.onerror = () => resolve(false);
    image.src = "data:image/webp;base64," + kTestImages[feature];
  });
}

/**
 * Checks if the browser supports all key WebP features.
 * @returns {Promise<boolean>} Returns a promise that resolves with a boolean indicating if all key WebP features are supported.
 */
async function checkWebPSupport(): Promise<boolean> {
  const results = await Promise.all([
    checkWebPFeatureSupport("lossy"),
    checkWebPFeatureSupport("lossless"),
    checkWebPFeatureSupport("alpha"),
    checkWebPFeatureSupport("animation"),
  ]);

  return results.every((v) => v);
}

export default checkWebPSupport;
