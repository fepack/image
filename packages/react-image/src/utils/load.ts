export const load = (src: HTMLImageElement["src"]): Promise<Event> => {
  const image = new Image();

  return new Promise((resolve, reject) => {
    image.onload = (e) => resolve(e);
    image.onerror = (e) => reject(e);

    image.src = src;
  });
};
