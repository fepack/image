import { preloadImages } from "@febox/image-preloader";

const images = [
  { defaultSrc: "/options_resize.png" },
  {
    webpSrc: "/information_resize.webp",
    defaultSrc: "/information_resize.png",
  },
];

preloadImages(images);

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div>
    <h1>@febox/demo-image-preloader</h1>
  </div>
`;
