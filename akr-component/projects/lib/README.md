# @akr506/akr-component

[English](./README.md) | [日本語](./README.ja.md) | [简体中文](./README.zh.md) | [한국어](./README.ko.md) | [Deutsch](./README.de.md) | [Français](./README.fr.md) | [हिन्दी](./README.hi.md)

A collection of lightweight, accessible, and standalone UI components for modern Angular applications.

## 🚀 Features

- **Angular v21 Ready**: Built with the latest Angular features.
- **Standalone Components**: No NgModules required, easy to import and use.
- **Lightweight & Fast**: Minimal dependencies for optimal performance.
- **Fully Accessible**: Designed with accessibility in mind (using `@angular/aria`).

## 📦 Installation

Install the package via npm:

```bash
npm install @akr506/akr-component
```

## 🛠 Usage

Simply import the components you need directly into your standalone component. Note that some components, like buttons, are used as attributes:

```typescript
import { AkrAlert, AkrButton } from '@akr506/akr-component';
import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [AkrButton, AkrAlert],
    template: `
        <akr-alert severity="success">Welcome to AKR Components!</akr-alert>
        <button akr-button (click)="onHandleClick()">Click Me</button>
    `,
})
export class AppComponent {
    onHandleClick() {
        console.log('Button clicked!');
    }
}
```

### Styles

Don't forget to include the library styles in your `angular.json` or `styles.css`:

```css
@import '@akr506/akr-component/styles.css';
```

## 🧱 Components

- **Alert**: Informative messages with multiple types.
- **Button**: Versatile button component with various styles.
- **Form Field**: Container for form elements with label and error support.
- **Input**: Enhanced text input fields.
- **Navigation Tree**: Hierarchical data visualization.
- **Radio Button**: Custom radio buttons and groups.

## 📄 License

MIT © [Nakamura Akira](mailto:nakamura.akira@itfllc.co.jp)

## 📛 Origin of the Name

While "AKR" officially stands for **Angular Kernel Resources** (you might want to use this one for your boss), its true origin is derived from the developer's name.
