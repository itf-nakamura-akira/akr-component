# @akr/akr-component

[English](./README.md) | [日本語](./README.ja.md) | [简体中文](./README.zh.md) | [한국어](./README.ko.md) | [Deutsch](./README.de.md) | [Français](./README.fr.md) | [हिन्दी](./README.hi.md)

모던 Angular 애플리케이션을 위한 경량, 웹 접근성 준수, 스탠드얼론 UI 컴포넌트 라이브러리입니다.

## 🚀 주요 기능

- **Angular v21 Ready**: 최신 Angular 기능을 사용하여 구축되었습니다.
- **스탠드얼론 컴포넌트**: NgModule이 필요 없으며, 간편하게 임포트하여 사용할 수 있습니다.
- **가볍고 빠름**: 최적의 성능을 위해 의존성을 최소화했습니다.
- **웹 접근성 준수**: 접근성을 고려하여 설계되었습니다 (`@angular/aria` 사용).

## 📦 설치

npm을 통해 패키지를 설치합니다:

```bash
npm install @akr/akr-component
```

## 🛠 사용법

필요한 컴포넌트를 스탠드얼론 컴포넌트에 직접 임포트하여 사용하세요:

```typescript
import { AkrAlert, AkrButton } from '@akr/akr-component';
import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [AkrButton, AkrAlert],
    template: `
        <akr-alert type="success">AKR Components에 오신 것을 환영합니다!</akr-alert>
        <akr-button (click)="onHandleClick()">클릭하세요</akr-button>
    `,
})
export class AppComponent {
    onHandleClick() {
        console.log('버튼이 클릭되었습니다!');
    }
}
```

### 스타일

`angular.json` 또는 `styles.css`에 라이브러리 스타일을 포함하는 것을 잊지 마세요:

```css
@import '@akr/akr-component/styles.css';
```

## 🧱 컴포넌트

- **Alert**: 다양한 유형의 정보 메시지.
- **Button**: 다양한 스타일의 다목적 버튼 컴포넌트.
- **Form Field**: 라벨 및 에러 표시를 지원하는 폼 요소 컨테이너.
- **Input**: 향상된 텍스트 입력 필드.
- **Navigation Tree**: 계층적 데이터 시각화.
- **Radio Button**: 커스텀 라디오 버튼 및 그룹.

## 📄 라이선스

MIT © [Nakamura Akira](mailto:nakamura.akira@itfllc.co.jp)

## 📛 이름의 유래

공식적으로 "AKR"은 **Angular Kernel Resources**의 약자입니다(상사에게 보고할 때 이 설명을 사용하세요). 실제 유래는 개발자의 이름에서 따온 것입니다.
