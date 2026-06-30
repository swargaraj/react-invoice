import { useEffect, useRef } from "react";
import { init } from "modern-monaco";

interface WorkspaceProps {
  onCodeChange: (value: string) => void;
  initialValue: string;
}

export function CodeEditor({ onCodeChange, initialValue }: WorkspaceProps) {
  const editorContainerRef = useRef<HTMLDivElement>(null);
  const editorRef = useRef<any>(null);

  useEffect(() => {
    if (!editorContainerRef.current) return;

    let disposed = false;

    (async () => {
      const monaco = await init({
        themes: ["kanagawa-wave"],
      });

      if (disposed || !editorContainerRef.current) return;

      const editor = monaco.editor.create(editorContainerRef.current, {
        value: initialValue,
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
        lineHeight: 22,
        autoIndent: "full",
        contextmenu: true,
      });

      editorRef.current = editor;

      editor.onDidChangeModelContent(() => {
        onCodeChange?.(editor.getValue());
      });

      onCodeChange?.(editor.getValue());
    })();

    return () => {
      disposed = true;
      editorRef.current?.dispose();
    };
  }, [onCodeChange]);

  useEffect(() => {
    const editor = editorRef.current;
    if (editor && editor.getValue() !== initialValue) {
      editor.setValue(initialValue);
    }
  }, [initialValue]);

  return <div ref={editorContainerRef} className="h-full w-full" />;
}
