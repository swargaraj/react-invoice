import { useState } from "react";
import { CodeBlock } from "@/components/code-block";
import { Code } from "@/components/code";
import { Button } from "@/components/ui/button";

const packageManagers = [
  { name: "npm", command: "npm install react-invoice", icon: "/pm-icons/npm.svg" },
  { name: "pnpm", command: "pnpm add react-invoice", icon: "/pm-icons/pnpm.png" },
  { name: "bun", command: "bun add react-invoice", icon: "/pm-icons/bun.png" },
  { name: "yarn", command: "yarn add react-invoice", icon: "/pm-icons/yarn.png" },
] as const;

export function Installation() {
  const [pm, setPm] = useState<(typeof packageManagers)[number]["name"]>("npm");

  const current = packageManagers.find((p) => p.name === pm)!;

  return (
    <section>
      <h2>Installation</h2>
      <p>Install React Invoice using your preferred package manager.</p>
      <div className="flex flex-col space-y-2">
        <div className="flex gap-0.5">
          {packageManagers.map((p) => (
            <Button
              key={p.name}
              size="sm"
              variant={pm === p.name ? "outline" : "ghost"}
              onClick={() => setPm(p.name)}
            >
              <img
                src={p.icon}
                alt={p.name}
                className={`w-auto h-4 ${pm !== p.name ? "grayscale" : ""}`}
              />
              {p.name}
            </Button>
          ))}
        </div>
        <CodeBlock code={current.command} language="bash" />
      </div>
      <p>
        React Invoice supports React 18 and 19 and requires compatible versions of{" "}
        <Code>react</Code> and <Code>react-dom</Code> as peer dependencies.
      </p>
    </section>
  );
}
