import { preloadImages } from "@frontend-box/image-preloader";

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
    <h1>@frontend-box/demo-image-preloader</h1>
  </div>
`;
