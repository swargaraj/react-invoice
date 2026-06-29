import { forwardRef } from "react";

export interface InvoiceTextProps extends React.HTMLAttributes<HTMLParagraphElement> {}

export const InvoiceText = forwardRef<HTMLParagraphElement, InvoiceTextProps>(function InvoiceText(
  { children, className, style, ...props },
  ref,
) {
  return (
    <p ref={ref} className={className} style={style} {...props}>
      {children}
    </p>
  );
});

InvoiceText.displayName = "Invoice.Text";
