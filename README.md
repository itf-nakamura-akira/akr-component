# AKR Component (Angular Kernel Resources)

A collection of lightweight, accessible, and standalone UI components for modern Angular (v21+) applications.

## 📁 Repository Structure

This is a monorepo containing the component library and its documentation site.

- **[projects/lib](./akr-component/projects/lib)**: The core UI component library (`@akr506/akr-component`).
- **[projects/docs](./akr-component/projects/docs)**: The documentation and interactive demonstration site.

## 🚀 Getting Started

To get started with development, follow these steps:

### 1. Installation

Install dependencies for the entire project (we recommend using [Bun](https://bun.sh)):

```bash
bun install
```

### 2. Development

You can run the documentation site locally to see components in action:

```bash
cd akr-component
bun run start:docs
```

To work on the library with live-rebuild enabled:

```bash
cd akr-component
bun run start:lib
```

### 3. Build

To build the library for distribution:

```bash
cd akr-component
bun run build:lib
```

## 🛠 Features

- **Angular v21 Ready**: Using Signals, Standalone Components, and New Control Flow.
- **Modern Styling**: Powered by Tailwind CSS v4 and modern CSS features (OKLCH, color-mix).
- **Accessibility**: Built with `@angular/aria` to ensure WCAG compliance.

## 📄 License

MIT © [Nakamura Akira](mailto:nakamura.akira@itfllc.co.jp)
