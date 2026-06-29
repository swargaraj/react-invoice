import { CodeBlock } from "@/components/code-block";
import { Code } from "@/components/code";

export function QuickStart() {
  return (
    <section>
      <h2>Quick Start</h2>
      <p>
        Create your invoice using the <Code>Invoice.*</Code> components. The same component can be
        rendered as HTML in your React application or converted to a PDF.
      </p>
      <CodeBlock
        language="tsx"
        code={`import { Invoice, renderToPdf, registerFont } from "react-invoice";

registerFont({
  family: "Geist Mono",
  src: "/fonts/GeistMono-Regular.ttf",
  variable: "font-mono",
});

const data = {
  items: [
    { id: 1, description: "React Invoice License", amount: 49.0 },
    { id: 2, description: "Priority Support", amount: 19.0 },
  ],
};

function InvoiceView({ data }) {
  return (
    <Invoice.Root className="bg-white p-10 text-sm font-mono">
      <Invoice.Section className="flex-row justify-between mb-12">
        <Invoice.Text className="text-2xl font-bold">Invoice</Invoice.Text>
        <Invoice.Text className="text-xs">INV-001</Invoice.Text>
      </Invoice.Section>

      <Invoice.Section className="mb-10 border-y py-4">
        {data.items.map((item) => (
          <Invoice.Section key={item.id} className="flex-row py-2">
            <Invoice.Text className="flex-1">{item.description}</Invoice.Text>
            <Invoice.Text className="w-20 text-right">\${item.amount}</Invoice.Text>
          </Invoice.Section>
        ))}
      </Invoice.Section>
    </Invoice.Root>
  );
}`}
      />
      <p>Render the component directly in your React application.</p>
      <CodeBlock language="tsx" code="<InvoiceView data={data} />" />
      <p className="text-muted-foreground">
        Generate a PDF by passing the component to <Code>renderToPdf</Code>.
      </p>
      <CodeBlock
        language="ts"
        code="const blob = await renderToPdf(<InvoiceView data={data} />);"
      />
      <p className="text-muted-foreground">
        The function returns a <Code>Blob</Code>, which can be downloaded or uploaded like any other
        file. To save it in the browser:
      </p>
      <CodeBlock
        language="ts"
        code={`const url = URL.createObjectURL(blob);
            
const link = document.createElement("a");
link.href = url;
link.download = "invoice.pdf";
link.click();

URL.revokeObjectURL(url);`}
      />
    </section>
  );
}
