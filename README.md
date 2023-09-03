# Frontend-Box 🎁

Frontend-Box는 프론트엔드 개발을 위한 유용한 플러그인 및 도구들의 모음입니다. 이 패키지 모음은 효율적인 프론트엔드 개발을 돕기 위해 여러 작은 패키지들로 구성되어 있습니다.

## 패키지

### 1. Image Preloader (@frontend-box/image-preloader)

이미지 프리로더는 웹페이지의 로딩 시간을 줄이기 위해 사용됩니다. 이 패키지는 웹페이지에 사용되는 이미지들을 미리 로드하고, AVIF, WEBP 및 PNG 이미지 포맷을 지원합니다.

#### 사용 방법

```
import { preloadImages } from '@frontend-box/image-preloader';

const images = [
  { png: 'path/to/image1.png' },
  { avif: 'path/to/image2.avif', png: 'path/to/image2.png' },
  { webp: 'path/to/image3.webp', png: 'path/to/image3.png' },
  { avif: 'path/to/image4.avif', webp: 'path/to/image4.webp', png: 'path/to/image4.png' },
];

preloadImages(images);
```

## 라이선스

이 프로젝트는 MIT 라이선스 하에 이용할 수 있습니다. 자세한 내용은 [여기](https://github.com/tooooo1/frontend-box/blob/main/LICENSE)를 참조하세요.
