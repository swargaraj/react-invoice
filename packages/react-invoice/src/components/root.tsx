import React, { forwardRef } from "react";

export interface InvoiceRootProps extends React.HTMLAttributes<HTMLElement> {}

export const InvoiceRoot = forwardRef<HTMLElement, InvoiceRootProps>(function InvoiceRoot(
  { children, className, style, ...props },
  ref,
) {
  return (
    <article ref={ref} className={className} style={style} {...props}>
      {children}
    </article>
  );
});

InvoiceRoot.displayName = "Invoice.Root";
