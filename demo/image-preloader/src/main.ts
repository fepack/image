import { preloadImages } from "@febox/image-preloader";

const images = [
  { png: "/options_resize.png" },
  {
    webp: "/information_resize.webp",
    png: "/information_resize.png",
  },
];

preloadImages(images);

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div>
    <h1>@febox/demo-image-preloader</h1>
  </div>
`;
