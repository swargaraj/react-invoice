import { Code } from "@/components/code";

export function ApiReference() {
  return (
    <section>
      <h2>API Reference</h2>
      <p>All exports from the package.</p>
      <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="border-b text-left">
              <th className="py-2 pr-4 font-medium min-w-44">Export</th>
              <th className="py-2 pr-4 font-medium min-w-36">Type</th>
              <th className="py-2 font-medium">Description</th>
            </tr>
          </thead>
          <tbody className="text-muted-foreground">
            <tr className="border-b">
              <td>
                <Code>Invoice</Code>
              </td>
              <td>Namespace</td>
              <td className="py-2">{"{ Root, Text, Section, Link }"}</td>
            </tr>
            <tr className="border-b">
              <td>
                <Code>InvoiceRoot</Code>
              </td>
              <td>Component</td>
              <td className="py-2">Top-level document wrapper</td>
            </tr>
            <tr className="border-b">
              <td>
                <Code>InvoiceText</Code>
              </td>
              <td>Component</td>
              <td className="py-2">Text paragraph</td>
            </tr>
            <tr className="border-b">
              <td>
                <Code>InvoiceSection</Code>
              </td>
              <td>Component</td>
              <td className="py-2">Flex-column layout container</td>
            </tr>
            <tr className="border-b">
              <td>
                <Code>InvoiceLink</Code>
              </td>
              <td>Component</td>
              <td className="py-2">Hyperlink</td>
            </tr>
            <tr className="border-b">
              <td>
                <Code>renderToPdf</Code>
              </td>
              <td>Function</td>
              <td className="py-2">Converts element tree to PDF Blob</td>
            </tr>
            <tr className="border-b">
              <td>
                <Code>registerFont</Code>
              </td>
              <td>Function</td>
              <td className="py-2">Registers a custom font for PDF</td>
            </tr>
            <tr className="border-b">
              <td>
                <Code>setupPdf</Code>
              </td>
              <td>Function</td>
              <td className="py-2">Initializes PDF Tailwind config</td>
            </tr>
            <tr className="border-b">
              <td>
                <Code>extendTwConfig</Code>
              </td>
              <td>Function</td>
              <td className="py-2">Merges config into PDF Tailwind</td>
            </tr>
            <tr className="border-b">
              <td>
                <Code>tw</Code>
              </td>
              <td>Function</td>
              <td className="py-2">Converts Tailwind classes to PDF styles</td>
            </tr>
            <tr className="border-b">
              <td>
                <Code>createTw</Code>
              </td>
              <td>Function</td>
              <td className="py-2">
                Re-exported from <Code>react-pdf-tailwind</Code>
              </td>
            </tr>
            <tr className="border-b">
              <td>
                <Code>Font</Code>
              </td>
              <td>Object</td>
              <td className="py-2">
                Re-exported from <Code>@react-pdf/renderer</Code>
              </td>
            </tr>
            <tr>
              <td>
                <Code>defaultFonts</Code>
              </td>
              <td>Constant</td>
              <td className="py-2">[{"{ family: 'Helvetica', src: 'Helvetica' }"}]</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}
