import { Code } from "@/components/code";

export function Limitations() {
  return (
    <section>
      <h2>Limitations</h2>
      <ul className="list-disc list-inside text-muted-foreground leading-relaxed space-y-1">
        <li>
          Not every Tailwind utility is supported in PDF. Only utilities that can be translated to{" "}
          <Code>@react-pdf/renderer</Code> styles are available.
        </li>
        <li>
          CSS Grid is not supported by <Code>@react-pdf/renderer</Code> , use flexbox.
        </li>
        <li>External stylesheets and CSS-in-JS libraries only apply to HTML output.</li>
        <li>Nested flex layouts may have different behavior between HTML and PDF.</li>
      </ul>
    </section>
  );
}
