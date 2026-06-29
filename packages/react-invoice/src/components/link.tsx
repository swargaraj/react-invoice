import React, { forwardRef } from "react";

export interface InvoiceLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {}

export const InvoiceLink = forwardRef<HTMLAnchorElement, InvoiceLinkProps>(function InvoiceLink(
  { children, className, style, ...props },
  ref,
) {
  return (
    <a ref={ref} className={className} style={style} {...props}>
      {children}
    </a>
  );
});

InvoiceLink.displayName = "Invoice.Link";
