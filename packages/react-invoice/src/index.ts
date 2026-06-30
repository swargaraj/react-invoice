export { InvoiceRoot } from "./components/root";
export type { InvoiceRootProps } from "./components/root";

export { InvoiceText } from "./components/text";
export type { InvoiceTextProps } from "./components/text";
export { InvoiceSection } from "./components/section";
export type { InvoiceSectionProps } from "./components/section";

export { InvoiceLink } from "./components/link";
export type { InvoiceLinkProps } from "./components/link";
export { InvoiceImage } from "./components/image";
export type { InvoiceImageProps } from "./components/image";

import { InvoiceRoot } from "./components/root";
import { InvoiceText } from "./components/text";
import { InvoiceSection } from "./components/section";
import { InvoiceLink } from "./components/link";
import { InvoiceImage } from "./components/image";

export const Invoice = {
  Root: InvoiceRoot,
  Text: InvoiceText,
  Section: InvoiceSection,
  Link: InvoiceLink,
  Image: InvoiceImage,
} as const;

export { renderToPdf, registerFont, setupPdf } from "./pdf";
