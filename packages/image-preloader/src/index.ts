function supportsImageFormat(format: string) {
  const canvas = document.createElement("canvas");
  return (
    canvas.toDataURL(`image/${format}`).indexOf(`data:image/${format}`) === 0
  );
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

export { preloadImages };
