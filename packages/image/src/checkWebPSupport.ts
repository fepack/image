/**
 * Checks if the browser supports WebP format.
 * @returns {Promise<boolean>} Returns a promise that resolves with a boolean indicating if WebP is supported.
 * @see https://developers.google.com/speed/webp/faq?hl=ko#in_your_own_javascript
 */
async function checkWebPSupport(): Promise<boolean> {
  return new Promise((resolve) => {
    const image = new Image();
    image.onload = () => resolve(image.width > 0 && image.height > 0);
    image.onerror = () => resolve(false);
    image.src =
      "data:image/webp;base64,UklGRhoAAABXRUJQVlA4TA0AAAAvAAAAEAcQERGIiP4HAA==";
  });
}

export default checkWebPSupport;
