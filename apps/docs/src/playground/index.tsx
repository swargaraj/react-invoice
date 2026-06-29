import { useState } from "react";
import { Link } from "react-router";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowLeft02Icon } from "@hugeicons/core-free-icons";
import { CodeEditor } from "./code-editor";

export function Playground() {
  const [_code, setCode] = useState("");

  return (
    <div className="flex h-screen flex-col bg-background text-foreground">
      <header className="flex items-center gap-2 border-b border-border px-4 py-2">
        <Link
          to="/"
          className="flex items-center text-sm text-muted-foreground gap-1 no-underline hover:text-foreground transition-colors"
        >
          <HugeiconsIcon icon={ArrowLeft02Icon} className="size-4" />
        </Link>
        <h1 className="text-sm font-medium">React Invoice Playground</h1>
      </header>
      <div className="flex flex-1 overflow-hidden">
        <div className="w-1/2 border-r border-border">
          <CodeEditor onChange={setCode} />
        </div>
        <div className="flex w-1/2 items-center justify-center">
          <p className="text-sm text-muted-foreground">
            PDF preview will render here
          </p>
        </div>
      </div>
    </div>
  );
}
