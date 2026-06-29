export const DEFAULT_CODE = `import { Invoice } from "react-invoice";

export default function InvoiceDocument() {
  return (
    <Invoice.Root className="p-8">
      <Invoice.Section className="mb-6">
        <Invoice.Text className="text-2xl font-bold">
          Invoice #001
        </Invoice.Text>
        <Invoice.Text className="text-gray-500">
          Date: {new Date().toLocaleDateString()}
        </Invoice.Text>
      </Invoice.Section>

      <Invoice.Section className="mb-6">
        <Invoice.Text className="font-semibold">Bill To:</Invoice.Text>
        <Invoice.Text>Acme Corp</Invoice.Text>
        <Invoice.Text>123 Business St</Invoice.Text>
      </Invoice.Section>

      <Invoice.Section>
        <Invoice.Text className="font-semibold">Items:</Invoice.Text>
        <Invoice.Text>Web Development - $5,000</Invoice.Text>
        <Invoice.Text>UI Design - $2,000</Invoice.Text>
        <Invoice.Text className="font-bold mt-4">
          Total: $7,000
        </Invoice.Text>
      </Invoice.Section>
    </Invoice.Root>
  );
}
`;
