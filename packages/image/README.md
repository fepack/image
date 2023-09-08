# @febox/image

image는 웹페이지의 로딩 시간을 줄이기 위해 사용됩니다. 이 패키지는 웹페이지에 사용되는 이미지들을 미리 로드하며, WEBP 이미지 포맷을 지원합니다.

## 설치

이 패키지를 사용하려면 먼저 프로젝트에 설치해야 합니다.

```
pnpm add -D @febox/image
```

## 기능

1. **이미지 포맷 지원 확인**: 현재 브라우저가 `webp` 이미지 포맷을 지원하는지 확인합니다.
2. **이미지 로딩**: 지원하는 포맷의 이미지를 로딩합니다.

## 사용법

### 이미지 포맷 지원 확인

```js
import { isSupportWebP } from "@febox/image";

const isSupportedWebp = await isSupportWebP();
if (isSupportedWebp) {
  console.log("This browser supports webp format.");
} else {
  console.log("This browser does not support webp format.");
}
```

### 이미지 로딩

```js
import { load } from "@febox/image";

const images = [
  {
    defaultSrc: "path/to/default/image.jpg",
    webpSrc: "path/to/image.webp",
  },
  // ... more images
];

load(images);
```
