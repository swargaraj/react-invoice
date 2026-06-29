import { CodeBlock } from "@/components/code-block";
import { Code } from "@/components/code";

export function Contributing() {
  return (
    <section>
      <h2>Contributing</h2>
      <CodeBlock
        language="bash"
        code={`git clone https://github.com/swargaraj/react-invoice.git
cd react-invoice
pnpm install
pnpm  --filter react-invoice build`}
      />
      <p>
        The library is built with <Code>tsdown</Code>. Source is in{" "}
        <Code>packages/react-invoice/src/</Code>
      </p>
    </section>
  );
}
