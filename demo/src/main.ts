import { load } from "@febox/image";

const images = [
  { defaultSrc: "/options_resize.png" },
  {
    webpSrc: "/information_resize.webp",
    defaultSrc: "/information_resize.png",
  },
];

load(images);

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div>
    <h1>@febox/demo-image</h1>
  </div>
`;
