import { checkWebPSupport, load } from "@fepack/image";

checkWebPSupport().then(console.log);
load("/options_resize.png");
load("/information_resize.webp");
load("/information_resize.png");

(document.querySelector<HTMLDivElement>("#app") as HTMLDivElement).innerHTML = `
  <div>
    <h1>@fepack/demo-image</h1>
  </div>
`;
