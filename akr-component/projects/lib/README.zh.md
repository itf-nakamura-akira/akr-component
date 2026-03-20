# @akr/akr-component

[English](./README.md) | [日本語](./README.ja.md) | [简体中文](./README.zh.md) | [한국어](./README.ko.md) | [Deutsch](./README.de.md) | [Français](./README.fr.md) | [हिन्दी](./README.hi.md)

为现代 Angular 应用程序设计的轻量级、无障碍且独立 (standalone) 的 UI 组件库。

## 🚀 特性

- **Angular v21 Ready**: 基于最新的 Angular 特性构建。
- **独立组件 (Standalone)**: 无需 NgModule，易于导入和使用。
- **轻量且快速**: 最小依赖，确保最佳性能。
- **无障碍设计**: 充分考虑无障碍性（使用 `@angular/aria`）。

## 📦 安装

通过 npm 安装：

```bash
npm install @akr/akr-component
```

## 🛠 使用方法

将需要的组件直接导入到您的独立组件中：

```typescript
import { AkrAlert, AkrButton } from '@akr/akr-component';
import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [AkrButton, AkrAlert],
    template: `
        <akr-alert type="success">欢迎使用 AKR Components!</akr-alert>
        <akr-button (click)="onHandleClick()">点击我</akr-button>
    `,
})
export class AppComponent {
    onHandleClick() {
        console.log('按钮被点击了！');
    }
}
```

### 样式

请确保在 `angular.json` 或 `styles.css` 中包含库样式：

```css
@import '@akr/akr-component/styles.css';
```

## 🧱 组件

- **Alert (警报)**: 支持多种类型的信息通知。
- **Button (按钮)**: 具有多种样式的通用按钮组件。
- **Form Field (表单字段)**: 支持标签和错误的表单元素容器。
- **Input (输入框)**: 增强型文本输入字段。
- **Navigation Tree (导航树)**: 层次化数据可视化。
- **Radio Button (单选按钮)**: 自定义单选按钮及分组。

## 📄 许可证

MIT © [Nakamura Akira](mailto:nakamura.akira@itfllc.co.jp)

## 📛 名字由来

虽然 "AKR" 的官方全称是 **Angular Kernel Resources**（您可以向老板这样解释），但其实际由来与开发者的名字有关。
