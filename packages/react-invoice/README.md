# React Invoice

Build invoices with React components and render the same component tree to both HTML and PDF.

React Invoice is built on top of [`@react-pdf/renderer`](https://github.com/diegomura/react-pdf) and [`react-pdf-tailwind`](https://github.com/aanckar/react-pdf-tailwind), allowing you to build invoices with familiar React components and Tailwind CSS without maintaining separate templates for web preview and PDF generation.

**Documentation:** https://react-invoice.swrg.dev

## Installation

```bash
npm install react-invoice
```

**Peer dependencies**

- `react` ^18 || ^19
- `react-dom` ^18 || ^19

## Quick Start

```tsx
import { Invoice, renderToPdf } from "react-invoice";

const data = {
  items: [
    { id: 1, description: "React Invoice License", amount: 49 },
    { id: 2, description: "Priority Support", amount: 19 },
  ],
};

function InvoiceView() {
  return (
    <Invoice.Root className="bg-white p-10 text-sm">
      <Invoice.Section className="mb-10 flex justify-between">
        <Invoice.Text className="text-2xl font-bold">Invoice</Invoice.Text>
        <Invoice.Text>INV-001</Invoice.Text>
      </Invoice.Section>

      <Invoice.Section className="border-y py-4">
        {data.items.map((item) => (
          <Invoice.Section key={item.id} className="flex justify-between py-2">
            <Invoice.Text>{item.description}</Invoice.Text>
            <Invoice.Text>${item.amount}</Invoice.Text>
          </Invoice.Section>
        ))}
      </Invoice.Section>
    </Invoice.Root>
  );
}
```

Render the component in your React application:

```tsx
<InvoiceView />
```

Generate a PDF:

```tsx
const blob = await renderToPdf(<InvoiceView />);
```

## Components

| Component         | HTML        | PDF                 |
| ----------------- | ----------- | ------------------- |
| `Invoice.Root`    | `<article>` | `Document` + `Page` |
| `Invoice.Section` | `<div>`     | `View`              |
| `Invoice.Text`    | `<p>`       | `Text`              |
| `Invoice.Link`    | `<a>`       | `Link`              |

## Documentation

The complete documentation is available at:

**https://react-invoice.swrg.dev**
