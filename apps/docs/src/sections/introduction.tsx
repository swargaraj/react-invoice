import { Link } from "react-router";
import { Button } from "@/components/ui/button";

export function Introduction() {
  return (
    <section>
      <div className="flex items-center justify-between">
        <h1>React Invoice</h1>
        <div className="flex items-center">
          <Link to="/showcase">
            <Button variant="ghost" size="sm">
              Showcase
            </Button>
          </Link>
          <Link to="/playground">
            <Button variant="ghost" size="sm" className="mr-2">
              Playground
            </Button>
          </Link>
          <a
            href="https://github.com/swargaraj/react-invoice"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="ghost" size="icon">
              <img src="/github.png" alt="GitHub" className="h-4 w-auto" />
            </Button>
          </a>
          <a
            href="https://npmx.dev/package/react-invoice"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="ghost" size="icon">
              <img src="/npmx.png" alt="npmx" className="h-4 w-auto" />
            </Button>
          </a>
        </div>
      </div>
      <p>
        A React library for building invoices that can be rendered as both HTML and PDF. Built on
        top of <img src="/libraries/react-pdf.png" alt="React PDF" className="inline h-4 w-auto" />{" "}
        <a
          href="https://react-pdf.org"
          target="_blank"
          rel="noopener noreferrer"
          className="shimmer"
        >
          React PDF
        </a>{" "}
        and <img src="/libraries/tailwind.svg" alt="Tailwind" className="inline h-4 w-auto" />{" "}
        <a
          href="https://github.com/aanckar/react-pdf-tailwind"
          target="_blank"
          rel="noopener noreferrer"
          className="shimmer"
        >
          React PDF Tailwind
        </a>
        .
      </p>
      <p>
        The library provides a common set of components that work in both environments, so you can
        use the same component tree for your web preview and PDF output instead of maintaining
        separate templates.
      </p>
    </section>
  );
}
