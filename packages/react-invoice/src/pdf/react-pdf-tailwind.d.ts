declare module "react-pdf-tailwind" {
  export function createTw(
    config: Record<string, unknown>,
    options?: { ptPerRem?: number },
  ): (classes: string) => any;
}
