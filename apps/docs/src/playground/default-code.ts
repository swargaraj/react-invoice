export const DEFAULT_CODE = `import { Invoice, registerFont, setupPdf } from "react-invoice";

registerFont({
  family: "Geist",
  src: "https://cdn.jsdelivr.net/fontsource/fonts/geist-mono@latest/latin-400-normal.ttf",
  variable: "font-geist",
});

const data = {
  items: [
    { id: "1", description: "Widget Design", quantity: 10, unitPrice: "100.00", amount: "1,000.00" },
    { id: "2", description: "Dashboard Design", quantity: 5, unitPrice: "200.00", amount: "1,000.00" },
    { id: "3", description: "Branding", quantity: 1, unitPrice: "1,150.00", amount: "1,150.00" },
    { id: "4", description: "Email Marketing", quantity: 3, unitPrice: "300.00", amount: "900.00" },
  ],
};

export default function InvoiceView() {
  return (
    <Invoice.Root className="bg-[#F5F1EE] p-10 text-sm uppercase font-geist">
      <Invoice.Section className="flex-row justify-between items-start mb-12">
        <Invoice.Text className="text-[2.5rem] font-bold">Invoice</Invoice.Text>
        <Invoice.Section className="items-end">
          <Invoice.Text className="text-xs py-1">INV-2026-0042</Invoice.Text>
          <Invoice.Text className="text-xs py-1">June 28, 2026</Invoice.Text>
          <Invoice.Text className="text-xs py-1">PO-2026-1087</Invoice.Text>
        </Invoice.Section>
      </Invoice.Section>

      <Invoice.Section className="flex-row mb-24 border-y">
        <Invoice.Section className="flex-1 py-4 border-r pr-4">
          <Invoice.Text>ACME STUDIO</Invoice.Text>
          <Invoice.Text>875 MARKET STREET</Invoice.Text>
          <Invoice.Text>SAN FRANCISCO CA 94103</Invoice.Text>
          <Invoice.Link href="https://acmestudio.com" className="text-inherit no-underline">ACMESTUDIO.COM</Invoice.Link>
        </Invoice.Section>
        <Invoice.Section className="flex-1 py-4 items-end">
          <Invoice.Text>ARAH MITCHELL</Invoice.Text>
          <Invoice.Text>350 MADISON AVENUE</Invoice.Text>
          <Invoice.Text>NEW YORK NY 10017</Invoice.Text>
          <Invoice.Text>+1 (646) 555-0124</Invoice.Text>
        </Invoice.Section>
      </Invoice.Section>

      <Invoice.Section className="mb-24">
      <Invoice.Section className="flex flex-row border-b pb-4 mb-2">
        <Invoice.Text className="flex-1 text-xs uppercase tracking-wider">Item</Invoice.Text>
        <Invoice.Text className="w-16 text-xs uppercase tracking-wider text-right">Qty</Invoice.Text>
        <Invoice.Text className="w-24 text-xs uppercase tracking-wider text-right">Rate</Invoice.Text>
        <Invoice.Text className="w-24 text-xs uppercase tracking-wider text-right">Total</Invoice.Text>
      </Invoice.Section>

      {(data.items ?? []).map((item) => (
        <Invoice.Section key={item.id} className="flex-row py-2">
          <Invoice.Text className="flex-1 text-sm">{String(item.description)}</Invoice.Text>
          <Invoice.Text className="w-16 text-sm text-right">{String(item.quantity)}</Invoice.Text>
          <Invoice.Text className="w-24 text-sm text-right">{\`$\${String(item.unitPrice)}\`}</Invoice.Text>
          <Invoice.Text className="w-24 text-sm text-right">{\`$\${String(item.amount)}\`}</Invoice.Text>
        </Invoice.Section>
      ))}
      </Invoice.Section>

      <Invoice.Section className="w-72 ml-auto">
        <Invoice.Section className="flex-row justify-between py-1">
          <Invoice.Text className="text-sm">Subtotal</Invoice.Text>
          <Invoice.Text className="text-sm">$4,050.00</Invoice.Text>
        </Invoice.Section>
        <Invoice.Section className="flex-row justify-between py-1">
          <Invoice.Text className="text-sm">Tax (5%)</Invoice.Text>
          <Invoice.Text className="text-sm">$202.50</Invoice.Text>
        </Invoice.Section>
        <Invoice.Section className="flex-row justify-between py-1">
          <Invoice.Text className="text-sm">Discount (10%)</Invoice.Text>
          <Invoice.Text className="text-sm">$405.00</Invoice.Text>
        </Invoice.Section>
        <Invoice.Section className="flex-row justify-between py-1 mb-6">
          <Invoice.Text className="text-sm">Shipping</Invoice.Text>
          <Invoice.Text className="text-sm">$50.00</Invoice.Text>
        </Invoice.Section>
        <Invoice.Section className="flex-row justify-between py-1 border-t pt-2">
          <Invoice.Text className="text-sm font-bold">Total</Invoice.Text>
          <Invoice.Text className="text-sm font-bold">$3,897.50</Invoice.Text>
        </Invoice.Section>
      </Invoice.Section>

      <Invoice.Section className="flex-row mt-24">
        <Invoice.Section className="flex-1 flex-col">
          <Invoice.Text className="text-xs">PAYMENT IS DUE WITHIN 14 DAYS OF THE INVOICE DATE. ALL CHECKS PAYABLE TO ACME STUDIO FOR PROCESSING.
          </Invoice.Text>
        </Invoice.Section>
        <Invoice.Section className="flex-1 items-end flex-col">
          <Invoice.Text className="text-xs">THANK YOU FOR YOUR BUSINESS</Invoice.Text>
        </Invoice.Section>
      </Invoice.Section>
    </Invoice.Root>
  );
}`;
