import { CodeBlock } from "@/components/code-block";
import { Code } from "@/components/code";

export function Styling() {
  return (
    <section>
      <h2>Styling</h2>
      <p>
        Tailwind CSS classes work as expected in the browser. For PDF output, classes are converted
        to <Code>@react-pdf/renderer</Code> style objects using the <Code>tw()</Code> utility
        provided by <Code>react-pdf-tailwind</Code>. We re-export this function from{" "}
        <Code>react-invoice</Code> so you can use the same className strings for both HTML and PDF.
      </p>
      <CodeBlock
        language="tsx"
        code={`<Invoice.Text className="text-lg font-bold text-blue-600">
  Styled in both HTML and PDF
</Invoice.Text>`}
      />
      <p>
        Inline <Code>style</Code> props are merged and take precedence over className-derived
        styles.
      </p>
      <p>
        You can also use the <Code>tw()</Code> function directly to convert Tailwind classes to PDF
        style objects:
      </p>
      <CodeBlock
        language="ts"
        code={`import { tw } from "react-invoice";

const pdfStyle = tw("text-lg font-bold text-blue-600");
// { fontSize: 18, fontWeight: "bold", color: "#2563eb" }`}
      />
    </section>
  );
}
