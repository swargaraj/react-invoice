import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { HugeiconsIcon } from "@hugeicons/react";
import { Tick02Icon, CopyIcon } from "@hugeicons/core-free-icons";
import { getCodeHtml, type SupportedLanguage, type SupportedTheme } from "@/lib/shiki";

interface CodeBlockProps {
  code: string;
  language?: SupportedLanguage;
  theme?: SupportedTheme;
}

export function CodeBlock({ code, language = "ts", theme = "kanagawa-wave" }: CodeBlockProps) {
  const [html, setHtml] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    getCodeHtml(code.trim(), language, theme).then(setHtml);
  }, [code, language, theme]);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(code.trim());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [code]);

  if (!html) {
    return (
      <pre className="rounded-lg bg-muted px-4 py-3 text-sm font-mono overflow-x-auto">
        {code.trim()}
      </pre>
    );
  }

  return (
    <div className="relative w-full text-sm group">
      <Button
        onClick={handleCopy}
        size="icon"
        variant="secondary"
        className="absolute top-1.5 right-1.5 text-muted-foreground hover:text-foreground z-10"
      >
        {copied ? <HugeiconsIcon icon={Tick02Icon} /> : <HugeiconsIcon icon={CopyIcon} />}
      </Button>
      <div
        className="w-full rounded-lg [&>pre]:block! [&>pre]:w-full [&>pre]:rounded-lg [&>pre]:px-4 [&>pre]:py-3 [&>pre]:overflow-x-auto"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}
