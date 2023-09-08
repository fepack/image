import { load } from "@fepack/image";

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
    <h1>@fepack/demo-image</h1>
  </div>
`;
