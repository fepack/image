# @febox/eslint-config

이 패키지는 FRONTEND BOX 프로젝트 전체에서 사용되는 공유 ESLint 설정을 제공합니다. 이를 사용하여 코드 스타일과 문법을 일관되게 유지하고 잠재적인 문제를 방지할 수 있습니다.

## 설치

이 패키지를 사용하려면 먼저 프로젝트에 설치해야 합니다. 아래의 명령어를 사용하여 설치할 수 있습니다.

```bash
pnpm add @febox/eslint-config
```

## 사용 방법

`.eslintrc.js` 파일 (또는 ESLint 설정을 저장하는 데 사용하는 다른 파일)에 다음과 같이 추가하십시오:

```bash
module.exports = {
  extends: [
    '@febox/eslint-config'
  ]
};
```

이렇게 하면 이제 `@febox/eslint-config`에서 정의된 모든 ESLint 규칙을 프로젝트에 적용할 수 있습니다.

## 규칙 커스터마이징

`@febox/eslint-config`은 기본적인 설정만을 제공합니다. 프로젝트의 특정 요구 사항에 따라 추가 규칙을 설정하거나 기존 규칙을 재정의할 수 있습니다.

```bash
module.exports = {
  extends: [
    '@febox/eslint-config'
  ],
  rules: {
    // 여기에 커스텀 규칙을 추가합니다.
  }
};
```

각 규칙에 대한 자세한 내용은 [ESLint 규칙 문서](https://eslint.org/docs/latest/rules/)를 참조하십시오.
