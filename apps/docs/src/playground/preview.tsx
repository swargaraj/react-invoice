import React, { useCallback, useEffect, useRef, useState } from "react";
import { createRoot, type Root } from "react-dom/client";
import { compileCode, extractFonts, type FontInfo } from "./compiler";

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
          borderColor: { DEFAULT: "#000" },
        },
      },
    };
  </script>
  <style>
    html, body { margin: 0; padding: 0; min-height: 100vh; }
    body { background-color: white }
  </style>
</head>
<body></body>
</html>`;

function injectFonts(doc: Document, fonts: FontInfo[]) {
  let style = doc.getElementById("registered-fonts");
  if (!style) {
    style = doc.createElement("style");
    style.id = "registered-fonts";
    doc.head.appendChild(style);
  }

  const fontFaces = fonts
    .map((f) => {
      const weight = f.src.match(/(\d+)\.ttf/i)?.[1];
      const weightDecl = weight ? `font-weight: ${weight};` : "";
      const familyDecl = f.variable
        ? `font-family: "${f.family}"; font-style: normal;`
        : `font-family: "${f.family}";`;
      return `@font-face { ${familyDecl} src: url("${f.src}") format("truetype"); ${weightDecl} font-display: swap; }`;
    })
    .join("\n");

  style.textContent = fontFaces;

  const variableFonts = fonts.filter((f) => f.variable);
  if (variableFonts.length > 0) {
    const win = doc.defaultView as any;
    if (win?.tailwind?.config) {
      win.tailwind.config = {
        ...win.tailwind.config,
        theme: {
          ...win.tailwind.config.theme,
          extend: {
            ...win.tailwind.config.theme?.extend,
            fontFamily: {
              ...(win.tailwind.config.theme?.extend as any)?.fontFamily,
              ...Object.fromEntries(
                fonts
                  .filter((f) => f.variable)
                  .map((f) => [f.variable!.replace(/^font-/, ""), [f.family]]),
              ),
            },
          },
        },
      };
    }
  }
}

export function Preview({ code }: PreviewProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const rootRef = useRef<Root | null>(null);
  const codeRef = useRef(code);
  const loadedRef = useRef(false);
  const lastFontKeyRef = useRef<string>("");
  const [error, setError] = useState<string | null>(null);

  codeRef.current = code;

  const renderCode = useCallback(() => {
    const iframe = iframeRef.current;
    if (!iframe?.contentDocument?.body) return;

    const result = compileCode(codeRef.current);

    if ("error" in result) {
      setError(result.error);
      return;
    }

    setError(null);

    if (!rootRef.current) {
      rootRef.current = createRoot(iframe.contentDocument.body);
    }

    rootRef.current.render(React.createElement(result.Component));
  }, []);

  const fonts = extractFonts(code);
  const fontKey = JSON.stringify(fonts);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    const fontsChanged = lastFontKeyRef.current !== fontKey;
    lastFontKeyRef.current = fontKey;

    if (fontsChanged && loadedRef.current) {
      injectFonts(iframe.contentDocument!, fonts);
    }
  }, [fontKey]);

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
      injectFonts(doc, fonts);
      renderCode();
    };

    return () => {
      rootRef.current?.unmount();
      rootRef.current = null;
      loadedRef.current = false;
    };
  }, []);

  useEffect(() => {
    if (loadedRef.current) {
      renderCode();
    }
  }, [code]);

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
