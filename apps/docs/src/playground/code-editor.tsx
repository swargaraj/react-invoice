import { useEffect, useRef } from "react";
import { init } from "modern-monaco";
import { DEFAULT_CODE } from "./default-code";

interface CodeEditorProps {
  onChange?: (value: string) => void;
}

export function CodeEditor({ onChange }: CodeEditorProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const editorRef = useRef<any>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    let disposed = false;

    (async () => {
      const monaco = await init({
        themes: ["kanagawa-wave"],
      });

      if (disposed || !containerRef.current) return;

      const editor = monaco.editor.create(containerRef.current, {
        value: DEFAULT_CODE,
        language: "tsx",
        theme: "kanagawa-wave",
        lineNumbers: "on",
        automaticLayout: true,
        minimap: { enabled: false },
        fontSize: 14,
        fontFamily: "'Geist Mono Variable', ui-monospace, monospace",
        padding: { top: 16 },
        scrollBeyondLastLine: false,
        renderLineHighlight: "gutter",
        bracketPairColorization: { enabled: true },
        smoothScrolling: true,
        cursorBlinking: "smooth",
        cursorSmoothCaretAnimation: "on",
      });

      editorRef.current = editor;

      editor.onDidChangeModelContent(() => {
        onChange?.(editor.getValue());
      });

      onChange?.(editor.getValue());
    })();

    return () => {
      disposed = true;
      editorRef.current?.dispose();
    };
  }, [onChange]);

  return <div ref={containerRef} className="h-full w-full" />;
}
