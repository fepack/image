function supportsImageFormat(format: string) {
  const picture = document.createElement("picture");
  const img = document.createElement("img");
  const source = document.createElement("source");

  switch (format) {
    case "webp":
      source.type = "image/webp";
      break;
    case "avif":
      source.type = "image/avif";
      break;
    default:
      return false;
  }

  picture.appendChild(source);
  picture.appendChild(img);

  document.body.appendChild(picture);
  const isSupported = img.complete;
  document.body.removeChild(picture);

  return isSupported;
}

interface ImageSources {
  png: string;
  avif?: string;
  webp?: string;
}

function preloadImages(images: ImageSources[]) {
  const supportsAvif = supportsImageFormat("avif");
  const supportsWebp = supportsImageFormat("webp");

  images.forEach((image) => {
    const src =
      supportsAvif && image.avif
        ? image.avif
        : supportsWebp && image.webp
        ? image.webp
        : image.png;
    const img = new Image();
    img.src = src;
  });
}

export { preloadImages, supportsImageFormat };
