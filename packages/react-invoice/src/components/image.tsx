import { forwardRef } from "react";

export interface InvoiceImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {}

export const InvoiceImage = forwardRef<HTMLImageElement, InvoiceImageProps>(function InvoiceImage(
  { className, style, src, ...props },
  ref,
) {
  return <img ref={ref} className={className} style={style} src={src} {...props} />;
});

InvoiceImage.displayName = "Invoice.Image";
