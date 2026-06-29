import { CodeBlock } from "@/components/code-block";
import { Code } from "@/components/code";

export function AdvancedTailwindConfig() {
  return (
    <section>
      <h2>Advanced Tailwind Config</h2>

      <p className="text-muted-foreground leading-relaxed">
        React Invoice exports <Code>setupPdf</Code> and <Code>extendTwConfig</Code> for customizing
        the Tailwind configuration used when generating PDFs.
      </p>

      <CodeBlock
        language="ts"
        code={`import { setupPdf, extendTwConfig } from "react-invoice";

// Replace the current Tailwind config
setupPdf({
  theme: {
    extend: {
      colors: { brand: "#ff5500" },
    },
  },
});

// Merge additional configuration
extendTwConfig({
  fontFamily: { display: ["Georgia", "serif"] },
  spacing: { "2xl": "2rem" },
});`}
      />

      <p className="text-muted-foreground">
        A default configuration is created automatically when the module loads. You only need to
        call <Code>setupPdf</Code> yourself when overriding the default Tailwind configuration.
      </p>
    </section>
  );
}
