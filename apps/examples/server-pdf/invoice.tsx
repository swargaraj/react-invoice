import { resolve } from "node:path";
import { Invoice, registerFont } from "react-invoice";

registerFont({
  family: "Geist",
  src: resolve(import.meta.dir, "./assets/Geist-VariableFont.ttf"),
  variable: "font-geist",
});

const lineItems = [
  {
    description: "UI/UX review of all web products on the platform",
    quantity: 3,
    rate: 1000,
  },
  { description: "Logo Design", quantity: 1, rate: 2000 },
  { description: "Review of Business Strategy", quantity: 1, rate: 5000 },
];

const fmt = (n: number) => "$" + n.toLocaleString("en-US", { minimumFractionDigits: 0 });

export function InvoiceDocument({ logo }: { logo?: string }) {
  const subtotal = lineItems.reduce((s, i) => s + i.quantity * i.rate, 0);
  const discount = 0;
  const tax = 1000;
  const total = subtotal - discount + tax;

  return (
    <Invoice.Root className="p-10 font-geist text-xs">
      {/* Header */}
      <Invoice.Section className="flex-row justify-between items-center pb-4 mb-6 border-b border-gray-200">
        <Invoice.Section className="flex-row justify-center gap-2">
          <Invoice.Image
            src={
              "https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Figma-logo.svg/1920px-Figma-logo.svg.png"
            }
            className="h-5 w-5 object-contain"
          />
          <Invoice.Text className="font-bold text-base">Figma Inc.</Invoice.Text>
        </Invoice.Section>
        <Invoice.Text className="text-gray-500 text-base">Los Angeles, California</Invoice.Text>
      </Invoice.Section>

      {/* Logo */}
      <Invoice.Section className="flex-row items-center justify-center gap-2 bg-[#2D2D2D] self-start p-4 rounded-2xl mb-6">
        <Invoice.Image src={logo} className="w-10 h-10 object-contain" />
      </Invoice.Section>

      {/* Invoice meta */}
      <Invoice.Section className="flex-row justify-between mb-4">
        <Invoice.Text className="text-[13px]">Invoice from Google Design Inc.</Invoice.Text>
        <Invoice.Text className="text-[11px] text-gray-500">
          Issue Date: <Invoice.Text className="text-black">01 Mar, 2025</Invoice.Text>
        </Invoice.Text>
      </Invoice.Section>
      <Invoice.Section className="flex flex-row justify-between mb-6 pb-6 border-b border-gray-200">
        <Invoice.Text className="text-[11px] text-gray-500">ID: #0045</Invoice.Text>
        <Invoice.Text className="text-[11px] text-gray-500">
          Due Date: <Invoice.Text className="text-black">31 Mar, 2025</Invoice.Text>
        </Invoice.Text>
      </Invoice.Section>

      {/* Bill from / Bill to */}
      <Invoice.Section className="flex-row justify-between mb-8">
        <Invoice.Section className="flex-1">
          <Invoice.Text className="text-[11px] text-gray-500 mb-3">Bill from:</Invoice.Text>
          <Invoice.Text className="text-[11px] leading-[1.5]">Google Design Inc</Invoice.Text>
          <Invoice.Text className="text-[11px] leading-[1.5]">
            16/345 Palatial Avenue, South Mascot, 2026
          </Invoice.Text>
        </Invoice.Section>
        <Invoice.Section className="flex-1">
          <Invoice.Text className="text-[11px] text-gray-500 mb-3">Bill to:</Invoice.Text>
          <Invoice.Text className="text-[11px] leading-[1.5]">Figma Inc</Invoice.Text>
          <Invoice.Text className="text-[11px] leading-[1.5]">
            760 Market Street, Floor 10, United States
          </Invoice.Text>
        </Invoice.Section>
      </Invoice.Section>

      {/* Table header */}
      <Invoice.Section className="flex-row bg-[#F6F6F8] text-gray-500 pt-1.5 pb-3 px-3.5 rounded-lg">
        <Invoice.Text className="flex-[3] text-[11px] font-bold">Item</Invoice.Text>
        <Invoice.Text className="flex-1 text-[11px] font-bold text-left">QTY</Invoice.Text>
        <Invoice.Text className="flex-1 text-[11px] font-bold text-left">Rate</Invoice.Text>
        <Invoice.Text className="flex-1 text-[11px] font-bold text-right">Amount</Invoice.Text>
      </Invoice.Section>

      {/* Table rows */}
      {lineItems.map((item, i) => (
        <Invoice.Section key={i} className="flex flex-row py-3.5 px-3.5">
          <Invoice.Text className="flex-[3] text-[11px]">{item.description}</Invoice.Text>
          <Invoice.Text className="flex-1 text-[11px] text-left">{item.quantity}</Invoice.Text>
          <Invoice.Text className="flex-1 text-[11px] text-left">{fmt(item.rate)}</Invoice.Text>
          <Invoice.Text className="flex-1 text-[11px] text-right">
            {fmt(item.quantity * item.rate)}
          </Invoice.Text>
        </Invoice.Section>
      ))}

      {/* Totals */}
      <Invoice.Section className="flex-row justify-end mt-12 px-3.5">
        <Invoice.Section className="w-56 border-t border-gray-200 pt-4">
          <Invoice.Section className="flex-row justify-between mb-4">
            <Invoice.Text className="text-[11px] text-gray-500">Subtotal</Invoice.Text>
            <Invoice.Text className="text-[11px] font-bold">{fmt(subtotal)}</Invoice.Text>
          </Invoice.Section>
          <Invoice.Section className="flex-row justify-between mb-4">
            <Invoice.Text className="text-[11px] text-gray-500">Discount</Invoice.Text>
            <Invoice.Text className="text-[11px] font-bold">0%</Invoice.Text>
          </Invoice.Section>
          <Invoice.Section className="flex-row justify-between mb-4">
            <Invoice.Text className="text-[11px] text-gray-500">Tax</Invoice.Text>
            <Invoice.Text className="text-[11px] font-bold">{fmt(tax)}</Invoice.Text>
          </Invoice.Section>
          <Invoice.Section className="flex-row justify-between">
            <Invoice.Text className="text-[11px] text-gray-500">Total</Invoice.Text>
            <Invoice.Text className="text-[16px] font-bold">{fmt(total)}</Invoice.Text>
          </Invoice.Section>
        </Invoice.Section>
      </Invoice.Section>

      {/* Credit */}
      <Invoice.Link
        className="text-[9px] text-gray-400 mt-20 text-center no-underline"
        href="https://dribbble.com/shots/25712352-Invoice-Generation-pt-3"
      >
        Original design by Monty Hayton: https://dribbble.com/shots/25712352-Invoice-Generation-pt-3
      </Invoice.Link>
    </Invoice.Root>
  );
}
