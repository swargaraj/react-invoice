import { Font } from "@react-pdf/renderer";
import { createTw } from "react-pdf-tailwind";

export { createTw };

let twConfig: Record<string, unknown> = {};
let twInstance: ReturnType<typeof createTw> = createTw({});

export function setupPdf(options?: Parameters<typeof createTw>[0]): ReturnType<typeof createTw> {
  twConfig = options ?? {};
  twInstance = createTw(twConfig);
  return twInstance;
}

export function extendTwConfig(options: Record<string, unknown>): void {
  twConfig = { ...twConfig, ...options };
  twInstance = createTw(twConfig as Parameters<typeof createTw>[0]);
}

export function tw(classes: string): Record<string, unknown> {
  return twInstance(classes) as Record<string, unknown>;
}

export { Font };

export const defaultFonts = [{ family: "Helvetica", src: "Helvetica" }];
