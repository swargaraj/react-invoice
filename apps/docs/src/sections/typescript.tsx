import { CodeBlock } from "@/components/code-block";

export function TypeScript() {
  return (
    <section>
      <h2>TypeScript</h2>
      <p>Component props interfaces are exported for typing your invoice components.</p>
      <CodeBlock
        language="ts"
        code={`import type {
  InvoiceRootProps,
  InvoiceTextProps,
  InvoiceSectionProps,
  InvoiceLinkProps,
} from "react-invoice";`}
      />
      <p>All props extend their corresponding HTML element attributes.</p>
    </section>
  );
}
