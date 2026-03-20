# @akr506/akr-component

[English](./README.md) | [日本語](./README.ja.md) | [简体中文](./README.zh.md) | [한국어](./README.ko.md) | [Deutsch](./README.de.md) | [Français](./README.fr.md) | [हिन्दी](./README.hi.md)

Eine Sammlung von leichtgewichtigen, barrierefreien und eigenständigen (standalone) UI-Komponenten für moderne Angular-Anwendungen.

## 🚀 Funktionen

- **Angular v21 Ready**: Erstellt mit den neuesten Angular-Funktionen.
- **Standalone-Komponenten**: Keine NgModules erforderlich, einfach zu importieren und zu verwenden.
- **Leichtgewichtig & Schnell**: Minimale Abhängigkeiten für optimale Leistung.
- **Vollständig Barrierefrei**: Entwickelt mit Fokus auf Barrierefreiheit (unter Verwendung von `@angular/aria`).

## 📦 Installation

Installieren Sie das Paket über npm:

```bash
npm install @akr506/akr-component
```

## 🛠 Verwendung

Importieren Sie die benötigten Komponenten direkt in Ihre Standalone-Komponente. Bitte beachten Sie, dass einige Komponenten, wie z.B. Buttons, als Attribute verwendet werden:

```typescript
import { AkrAlert, AkrButton } from '@akr506/akr-component';
import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [AkrButton, AkrAlert],
    template: `
        <akr-alert severity="success">Willkommen bei AKR Components!</akr-alert>
        <button akr-button (click)="onHandleClick()">Klick mich</button>
    `,
})
export class AppComponent {
    onHandleClick() {
        console.log('Button geklickt!');
    }
}
```

### Stile

Vergessen Sie nicht, die Bibliotheksstile in Ihre `angular.json` oder `styles.css` aufzunehmen:

```css
@import '@akr506/akr-component/styles.css';
```

## 🧱 Komponenten

- **Alert**: Informative Nachrichten mit verschiedenen Typen.
- **Button**: Vielseitige Button-Komponente mit verschiedenen Stilen.
- **Form Field**: Container für Formularelemente mit Unterstützung für Labels und Fehler.
- **Input**: Erweiterte Texteingabefelder.
- **Navigation Tree**: Hierarchische Datenvisualisierung.
- **Radio Button**: Benutzerdefinierte Radio-Buttons und Gruppen.

## 📄 Lizenz

MIT © [Nakamura Akira](mailto:nakamura.akira@itfllc.co.jp)

## 📛 Herkunft des Namens

Während "AKR" offiziell für **Angular Kernel Resources** steht (vielleicht möchten Sie diese Version für Ihren Chef verwenden), stammt der wahre Ursprung vom Namen des Entwicklers ab.
