# @akr506/akr-component

[English](./README.md) | [日本語](./README.ja.md) | [简体中文](./README.zh.md) | [한국어](./README.ko.md) | [Deutsch](./README.de.md) | [Français](./README.fr.md) | [हिन्दी](./README.hi.md)

Une collection de composants UI légers, accessibles et autonomes (standalone) pour les applications Angular modernes.

## 🚀 Caractéristiques

- **Angular v21 Ready** : Construit avec les dernières fonctionnalités d'Angular.
- **Composants Autonomes (Standalone)** : Aucun NgModule requis, facile à importer et à utiliser.
- **Léger & Rapide** : Dépendances minimales pour une performance optimale.
- **Entièrement Accessible** : Conçu avec l'accessibilité à l'esprit (en utilisant `@angular/aria`).

## 📦 Installation

Installez le paquet via npm :

```bash
npm install @akr506/akr-component
```

## 🛠 Utilisation

Importez simplement les composants dont vous avez besoin directement dans votre composant autonome. Notez que certains composants, comme les boutons, sont utilisés comme attributs :

```typescript
import { AkrAlert, AkrButton } from '@akr506/akr-component';
import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [AkrButton, AkrAlert],
    template: `
        <akr-alert severity="success">Bienvenue dans AKR Components !</akr-alert>
        <button akr-button (click)="onHandleClick()">Cliquez-moi</button>
    `,
})
export class AppComponent {
    onHandleClick() {
        console.log('Bouton cliqué !');
    }
}
```

### Styles

N'oubliez pas d'inclure les styles de la bibliothèque dans votre `angular.json` ou `styles.css` :

```css
@import '@akr506/akr-component/styles.css';
```

## 🧱 Composants

- **Alert** : Messages informatifs avec plusieurs types.
- **Button** : Composant bouton polyvalent avec divers styles.
- **Form Field** : Conteneur pour éléments de formulaire avec support pour étiquettes et erreurs.
- **Input** : Champs de saisie de texte améliorés.
- **Navigation Tree** : Visualisation de données hiérarchiques.
- **Radio Button** : Boutons radio et groupes personnalisés.

## 📄 Licence

MIT © [Nakamura Akira](mailto:nakamura.akira@itfllc.co.jp)

## 📛 Origine du nom

Bien que « AKR » signifie officiellement **Angular Kernel Resources** (vous voudrez peut-être utiliser cette explication pour votre patron), sa véritable origine est dérivée du nom du développeur.
