import { checkWebPSupport, load } from "@fepack/image";

const images = [
  { defaultSrc: "/options_resize.png" },
  {
    webpSrc: "/information_resize.webp",
    defaultSrc: "/information_resize.png",
  },
];

(async function () {
  const webPSupport = await checkWebPSupport();

  console.log(webPSupport);
})();

load(images);

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div>
    <h1>@fepack/demo-image</h1>
  </div>
`;
