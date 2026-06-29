import { CodeBlock } from "@/components/code-block";
import { Code } from "@/components/code";

export function Fonts() {
  return (
    <section>
      <h2>Fonts</h2>
      <p className="text-muted-foreground leading-relaxed">
        Register custom fonts for PDF rendering. The <Code>variable</Code> option automatically adds
        a Tailwind <Code>font-*</Code> class for the font family.
      </p>
      <CodeBlock
        language="ts"
        code={`import { registerFont } from "react-invoice";

registerFont({
  family: "Geist Mono",
  src: "/GeistMono-Regular.ttf",
  variable: "font-mono",
});`}
      />
      <p>
        After registration, use <Code>font-mono</Code> in className and it will resolve correctly in
        both HTML and PDF.
      </p>
      <p>
        The <Code>src</Code> can also be an object with a <Code>uri</Code> property for remote
        fonts.
      </p>
    </section>
  );
}
