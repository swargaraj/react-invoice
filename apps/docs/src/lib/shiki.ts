import { createHighlighterCore } from "shiki/core";
import { createJavaScriptRegexEngine } from "shiki/engine/javascript";

export type SupportedLanguage = "ts" | "tsx" | "bash";
export type SupportedTheme = "kanagawa-wave";

const highlighter = createHighlighterCore({
  themes: [import("@shikijs/themes/kanagawa-wave")],
  langs: [
    import("@shikijs/langs/typescript"),
    import("@shikijs/langs/tsx"),
    import("@shikijs/langs/bash"),
  ],
  engine: createJavaScriptRegexEngine(),
});

export async function getCodeHtml(
  code: string,
  lang: SupportedLanguage,
  theme: SupportedTheme,
): Promise<string> {
  const h = await highlighter;
  return h.codeToHtml(code, { lang, theme });
}
