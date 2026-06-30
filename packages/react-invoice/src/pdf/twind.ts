import { Font } from "@react-pdf/renderer";
import { createTw } from "react-pdf-tailwind";

export { createTw };

interface TwConfig {
  [key: string]: unknown;
}

let twConfig: TwConfig = {};
let twInstance: ReturnType<typeof createTw> = createTw({});

function deepMerge(target: TwConfig, source: TwConfig): TwConfig {
  const result: TwConfig = { ...target };
  for (const key of Object.keys(source)) {
    const targetVal = result[key];
    const sourceVal = source[key];
    if (
      targetVal &&
      sourceVal &&
      typeof targetVal === "object" &&
      typeof sourceVal === "object" &&
      !Array.isArray(targetVal) &&
      !Array.isArray(sourceVal)
    ) {
      result[key] = deepMerge(targetVal as TwConfig, sourceVal as TwConfig);
    } else {
      result[key] = sourceVal;
    }
  }
  return result;
}

export function setupPdf(options?: Parameters<typeof createTw>[0]): ReturnType<typeof createTw> {
  twConfig = options ? { ...options } : {};
  twInstance = createTw(twConfig as Parameters<typeof createTw>[0]);
  return twInstance;
}

export function extendTwConfig(options: Record<string, unknown>): void {
  twConfig = deepMerge(twConfig, options as TwConfig);
  twInstance = createTw(twConfig as Parameters<typeof createTw>[0]);
}

export function tw(classes: string): Record<string, unknown> {
  return twInstance(classes) as Record<string, unknown>;
}

export { Font };

export const defaultFonts = [{ family: "Helvetica", src: "Helvetica" }];
