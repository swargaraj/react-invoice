import { forwardRef } from "react";

export type InvoiceSectionProps = React.HTMLAttributes<HTMLDivElement>;

export const InvoiceSection = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  function InvoiceSection({ children, className, style, ...props }, ref) {
    return (
      <div
        ref={ref}
        className={`flex flex-col${className ? ` ${className}` : ""}`}
        style={style}
        {...props}
      >
        {children}
      </div>
    );
  },
);

InvoiceSection.displayName = "Invoice.Section";
