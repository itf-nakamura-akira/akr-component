# @akr/akr-component

[English](./README.md) | [日本語](./README.ja.md) | [简体中文](./README.zh.md) | [한국어](./README.ko.md) | [Deutsch](./README.de.md) | [Français](./README.fr.md) | [हिन्दी](./README.hi.md)

モダンなAngularアプリケーション向けに設計された、軽量でアクセシブルなスタンドアロンUIコンポーネントライブラリです。

## 🚀 特徴

- **Angular v21 Ready**: 最新のAngular機能を活用して構築されています。
- **スタンドアロンコンポーネント**: NgModuleは不要で、簡単にインポートして使用できます。
- **軽量 & 高速**: 最小限の依存関係で、最適なパフォーマンスを実現します。
- **フルアクセシブル**: `@angular/aria`を使用し、アクセシビリティを考慮して設計されています。

## 📦 インストール

npm経由でパッケージをインストールします：

```bash
npm install @akr/akr-component
```

## 🛠 使い方

スタンドアロンコンポーネントに必要なコンポーネントを直接インポートして使用します：

```typescript
import { AkrAlert, AkrButton } from '@akr/akr-component';
import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [AkrButton, AkrAlert],
    template: `
        <akr-alert type="success">AKR Componentsへようこそ！</akr-alert>
        <akr-button (click)="onHandleClick()">クリックしてね</akr-button>
    `,
})
export class AppComponent {
    onHandleClick() {
        console.log('ボタンがクリックされました！');
    }
}
```

### スタイル

`angular.json` または `styles.css` にライブラリのスタイルを含めるのを忘れないでください：

```css
@import '@akr/akr-component/styles.css';
```

## 🧱 コンポーネント

- **Alert**: さまざまなタイプに対応した情報通知。
- **Button**: 多彩なスタイルを持つ汎用ボタンコンポーネント。
- **Form Field**: ラベルやエラー表示をサポートするフォーム要素用コンテナ。
- **Input**: 拡張されたテキスト入力フィールド。
- **Navigation Tree**: 階層データの視覚化。
- **Radio Button**: カスタムラジオボタンとグループ。

## 📄 ライセンス

MIT © [Nakamura Akira](mailto:nakamura.akira@itfllc.co.jp)

## 📛 名前の由来

"AKR"は、公式には **Angular Kernel Resources** の略称です。上司への説明はこちらを利用してください。本当の由来は開発者の名前にちなんでいます。
