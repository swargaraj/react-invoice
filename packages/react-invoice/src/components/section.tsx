import { forwardRef } from "react";
import { cn } from "cnfast";

export const InvoiceSection = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  function InvoiceSection({ className, ...props }, ref) {
    return <div ref={ref} className={cn("flex flex-col", className)} {...props} />;
  },
);

InvoiceSection.displayName = "Invoice.Section";

export type InvoiceSectionProps = React.HTMLAttributes<HTMLDivElement>;
