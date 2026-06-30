import { renderToPdf } from "react-invoice";
import { InvoiceDocument } from "./invoice";

const logoDataUri = await (async () => {
  const buf = await Bun.file("./assets/figma-logo.png").arrayBuffer();
  return `data:image/png;base64,${Buffer.from(buf).toString("base64")}`;
})();

async function main() {
  const blob = await renderToPdf(<InvoiceDocument logo={logoDataUri} />);
  const buffer = Buffer.from(await blob.arrayBuffer());

  const outputPath = "./out/invoice.pdf";
  await Bun.write(outputPath, buffer);

  console.log(`PDF generated: ${outputPath} (${buffer.byteLength} bytes)`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
