import { type ReactElement } from "react";
import { Font } from "@react-pdf/renderer";
import type { DocumentProps, PageProps } from "@react-pdf/renderer";
import { convertToPdf } from "./mapper";

export { setupPdf, extendTwConfig, tw, createTw, Font, defaultFonts } from "./twind";
import { extendTwConfig } from "./twind";

export function registerFont(
  options: Parameters<typeof Font.register>[0] & { variable?: string },
): void {
  const { variable, ...fontOptions } = options;
  Font.register(fontOptions);
  if (variable) {
    const familyKey = variable.replace(/^font-/, "");
    extendTwConfig({ fontFamily: { [familyKey]: [fontOptions.family] } });
  }
}

export async function renderToPdf(
  element: ReactElement,
  documentOptions?: DocumentProps,
  pageOptions?: PageProps,
): Promise<Blob> {
  const pdfElement = convertToPdf(element, documentOptions, pageOptions);
  const { pdf } = await import("@react-pdf/renderer");
  return await pdf(pdfElement as ReactElement<DocumentProps>).toBlob();
}
