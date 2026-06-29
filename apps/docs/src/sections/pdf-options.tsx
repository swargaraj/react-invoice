import { CodeBlock } from "@/components/code-block";
import { Code } from "@/components/code";

export function PdfOptions() {
  return (
    <section>
      <h2>PDF Options</h2>

      <p>
        <Code>renderToPdf</Code> accepts <Code>DocumentProps</Code> and <Code>PageProps</Code> from{" "}
        <Code>@react-pdf/renderer</Code> as its second and third arguments. These are passed
        directly to the underlying <Code>Document</Code> and <Code>Page</Code> components.
      </p>

      <CodeBlock
        language="ts"
        code={`const blob = await renderToPdf(
  <InvoiceView />,
  { title: "Invoice", author: "ACME" },
  { size: "A4", orientation: "landscape" },
);`}
      />

      <p>
        By default, pages are rendered using <Code>"A4"</Code> in <Code>"portrait"</Code>{" "}
        orientation.
      </p>

      <p>
        For a complete reference of the available properties, see the{" "}
        <a
          href="https://react-pdf.org/components#document"
          target="_blank"
          rel="noopener noreferrer"
        >
          Document
        </a>{" "}
        and{" "}
        <a href="https://react-pdf.org/components#page" target="_blank" rel="noopener noreferrer">
          Page
        </a>{" "}
        documentation of <Code>@react-pdf/renderer</Code>.
      </p>
    </section>
  );
}
