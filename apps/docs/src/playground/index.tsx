import { useCallback, useRef, useState } from "react";
import { Link } from "react-router";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowLeft02Icon, Pdf01Icon } from "@hugeicons/core-free-icons";
import { renderToPdf } from "react-invoice";
import { Button } from "@/components/ui/button";
import { CodeEditor } from "./code-editor";
import { DEFAULT_CODE } from "./default-code";
import { Preview } from "./preview";
import { compileCode } from "./compiler";
import { ConsolePanel, type ConsoleEntry } from "./console-panel";

const STORAGE_KEY = "react-invoice-playground-code";

function loadCode(): string {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved !== null) return saved;
  } catch {}
  return DEFAULT_CODE;
}

export function Playground() {
  const [code, setCode] = useState(loadCode);
  const [downloading, setDownloading] = useState(false);
  const [consoleEntries, setConsoleEntries] = useState<ConsoleEntry[]>([]);
  const nextId = useRef(0);

  const log = useCallback((type: ConsoleEntry["type"], message: string) => {
    setConsoleEntries((prev) => [...prev, { id: nextId.current++, type, message }]);
  }, []);

  const handleCodeChange = useCallback((value: string) => {
    setCode(value);
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch {}
  }, []);

  const handleResetCode = useCallback(() => {
    setCode(DEFAULT_CODE);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {}
  }, []);

  const handleDownload = useCallback(async () => {
    const result = compileCode(code);
    if ("error" in result) {
      log("error", result.error);
      return;
    }

    setDownloading(true);
    try {
      log("info", "Generating PDF.");
      const blob = await renderToPdf(<result.Component />);
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "invoice.pdf";
      link.click();
      URL.revokeObjectURL(url);
      log("info", "PDF downloaded successfully.");
    } catch (err) {
      log("error", err instanceof Error ? err.message : String(err));
    } finally {
      setDownloading(false);
    }
  }, [code, log]);

  return (
    <div className="flex h-screen flex-col bg-background text-foreground">
      <header className="flex items-center gap-2 border-b border-border px-4 py-4">
        <Link
          to="/"
          className="flex items-center text-sm text-muted-foreground gap-1 no-underline hover:text-foreground transition-colors"
        >
          <HugeiconsIcon icon={ArrowLeft02Icon} className="size-4" />
        </Link>
        <h1 className="text-sm font-medium">React Invoice Playground</h1>
        <Button size="sm" variant="outline" onClick={handleResetCode}>
          Default Code
        </Button>
        <div className="ml-auto flex items-center gap-2">
          <Button size="sm" onClick={handleDownload} disabled={downloading}>
            Download
            <HugeiconsIcon icon={Pdf01Icon} className="size-4" />
          </Button>
        </div>
      </header>
      <div className="flex flex-1 overflow-hidden">
        <div className="w-1/2 border-r border-border">
          <CodeEditor onCodeChange={handleCodeChange} initialValue={code} />
        </div>
        <div className="w-1/2 flex flex-col">
          <div className="flex-1 overflow-hidden">
            <Preview code={code} />
          </div>
          <ConsolePanel entries={consoleEntries} />
        </div>
      </div>
    </div>
  );
}
