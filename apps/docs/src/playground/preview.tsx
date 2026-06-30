import React, { useCallback, useEffect, useRef, useState } from "react";
import { createRoot, type Root } from "react-dom/client";
import { compileCode } from "./compiler";

interface PreviewProps {
  code: string;
}

function ErrorDisplay({ message }: { message: string }) {
  return (
    <div className="p-4 text-red-600 font-mono text-sm overflow-auto bg-background h-fit">
      <div className="font-semibold mb-2">Error</div>
      <pre className="whitespace-pre-wrap">{message}</pre>
    </div>
  );
}

const IFRAME_HTML = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      theme: {
        extend: {
          borderColor: {
            DEFAULT: "#000",
          },
        },
      },
    };
  </script>
  <style>
    html, body { margin: 0; padding: 0; min-height: 100vh; }
  </style>
</head>
<body></body>
</html>`;

export function Preview({ code }: PreviewProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const rootRef = useRef<Root | null>(null);
  const loadedRef = useRef(false);
  const [error, setError] = useState<string | null>(null);

  const renderCode = useCallback(() => {
    const iframe = iframeRef.current;
    if (!iframe?.contentDocument?.body) return;

    const result = compileCode(code);

    if ("error" in result) {
      setError(result.error);
      return;
    }

    setError(null);

    if (!rootRef.current) {
      rootRef.current = createRoot(iframe.contentDocument.body);
    }

    rootRef.current.render(React.createElement(result.Component));
  }, [code]);

  // Initial setup: write HTML, then render on load
  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    const doc = iframe.contentDocument;
    if (!doc) return;

    doc.open();
    doc.write(IFRAME_HTML);
    doc.close();

    iframe.onload = () => {
      loadedRef.current = true;
      renderCode();
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Re-render when code changes (after initial load)
  useEffect(() => {
    if (loadedRef.current) {
      renderCode();
    }
  }, [renderCode]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      rootRef.current?.unmount();
      rootRef.current = null;
    };
  }, []);

  return (
    <div className="relative h-full">
      <iframe ref={iframeRef} className="h-full w-full border-0" />
      {error && (
        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm">
          <ErrorDisplay message={error} />
        </div>
      )}
    </div>
  );
}
