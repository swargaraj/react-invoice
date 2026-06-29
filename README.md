# React Invoice

A lightweight React library for building invoices that render to both HTML and PDF from the same component tree.

## Why?

Generating invoices often requires maintaining two separate implementations: one for the web and another for PDF generation. This duplication increases maintenance costs and makes it easy for the two versions to drift apart.

React Invoice provides a small set of React components that work in both environments. Build your invoice once with React and Tailwind CSS, render it in the browser for previews, and generate identical PDF output when needed.

## Packages

This repository is a monorepo containing the following packages:

| Package                  | Description                                 |
| ------------------------ | ------------------------------------------- |
| `packages/react-invoice` | The React Invoice library published to npm. |
| `apps/docs`              | Documentation website.                      |

## Documentation

The complete documentation is available at:

**https://react-invoice.swrg.dev**

## Tech Stack

- Vite+
- React
- TypeScript
- `@react-pdf/renderer`
- `react-pdf-tailwind`
- TailwindCSS
- tsdown

## Development

Clone the repository and install dependencies:

```bash
git clone https://github.com/swargaraj/react-invoice.git
cd react-invoice
vp install
```

Start the playground site:

```bash
pnpm dev
```

Build all packages:

```bash
vp build
```

Run format and type checking:

```bash
vp check
```

Run linting:

```bash
vp lint
```

## Contributing

Contributions are welcome.

If you'd like to contribute, feel free to open an issue to discuss bugs, feature requests, or proposed changes. Pull requests for improvements, documentation updates, and new features are appreciated.

Please ensure changes are well tested and keep the documentation up to date when modifying the library.
