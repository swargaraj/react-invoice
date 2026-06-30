import { forwardRef } from "react";

export type InvoiceSectionProps = React.HTMLAttributes<HTMLDivElement>;

const FLEX_DIRECTION_RE = /\bflex-(row|col|row-reverse|col-reverse)\b/;

export const InvoiceSection = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  function InvoiceSection({ children, className, style, ...props }, ref) {
    const hasDirection = className && FLEX_DIRECTION_RE.test(className);
    return (
      <div
        ref={ref}
        className={`flex${hasDirection ? "" : " flex-col"}${className ? ` ${className}` : ""}`}
        style={style}
        {...props}
      >
        {children}
      </div>
    );
  },
);

InvoiceSection.displayName = "Invoice.Section";
