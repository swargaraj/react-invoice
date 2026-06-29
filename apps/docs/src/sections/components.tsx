import { Code } from "@/components/code";

export function Components() {
  return (
    <section>
      <h2>Components</h2>

      <p>
        React Invoice exposes a small set of components that render to semantic HTML in the browser
        and the corresponding React PDF components when generating a PDF.
      </p>

      <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="border-b text-left">
              <th className="font-medium">Component</th>
              <th className="font-medium">HTML</th>
              <th className="font-medium">PDF</th>
            </tr>
          </thead>
          <tbody className="text-muted-foreground">
            <tr className="border-b">
              <td>
                <Code>Invoice.Root</Code>
              </td>
              <td>
                <Code>&lt;article&gt;</Code>
              </td>
              <td className="py-2">
                <Code>Document</Code> + <Code>Page</Code>
              </td>
            </tr>
            <tr className="border-b">
              <td>
                <Code>Invoice.Text</Code>
              </td>
              <td>
                <Code>&lt;p&gt;</Code>
              </td>
              <td className="py-2">
                <Code>Text</Code>
              </td>
            </tr>
            <tr className="border-b">
              <td>
                <Code>Invoice.Section</Code>
              </td>
              <td>
                <Code>&lt;div&gt;</Code>
              </td>
              <td className="py-2">
                <Code>View</Code>
              </td>
            </tr>
            <tr>
              <td>
                <Code>Invoice.Link</Code>
              </td>
              <td>
                <Code>&lt;a&gt;</Code>
              </td>
              <td className="py-2">
                <Code>Link</Code>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <p className="leading-loose">
        All components support the props relevant to their HTML equivalents, including{" "}
        <Code>className</Code> , <Code>style</Code> , and <Code>children</Code> .{" "}
        <Code>Invoice.Link</Code> also accepts <Code>href</Code>. <Code>Invoice.Section</Code>{" "}
        applies <Code>display: flex</Code> and <Code>flex-direction: column</Code> by default.
      </p>
    </section>
  );
}
