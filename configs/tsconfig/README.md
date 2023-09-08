# @fepack/tsconfig

이 패키지는 fepack 프로젝트 전체에서 사용되는 공통 TypeScript 설정을 제공합니다. 이를 사용하면 프로젝트 전체에서 TypeScript를 일관되게 적용할 수 있습니다.

## 설치

이 패키지를 사용하려면 먼저 프로젝트에 설치해야 합니다. 아래의 명령어를 사용하여 설치할 수 있습니다.

```bash
pnpm add -D @fepack/tsconfig
```

## 사용법

TypeScript 설정 파일(tsconfig.json)에서 이 패키지를 확장하여 사용할 수 있습니다.

```json
{
  "extends": "@fepack/tsconfig",
  "compilerOptions": {
    // 프로젝트별로 필요한 추가적인 설정을 여기에 추가
  }
}
```

위와 같이 설정하면 기본적인 TypeScript 설정은 @fepack/tsconfig에서 가져오고, 각 프로젝트별로 필요한 추가 설정은 compilerOptions에 직접 추가하여 사용할 수 있습니다.
