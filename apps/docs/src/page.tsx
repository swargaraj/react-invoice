import {
  Introduction,
  Installation,
  QuickStart,
  Components,
  Styling,
  Fonts,
  PdfOptions,
  AdvancedTailwindConfig,
  ApiReference,
  TypeScript,
  Limitations,
  Contributing,
} from "./sections";

export default function Page() {
  return (
        <main className="flex w-full flex-col mx-auto max-w-2xl items-start gap-8 px-4 py-20">
      <Introduction />
      <Installation />
      <QuickStart />
      <Components />
      <Styling />
      <Fonts />
      <PdfOptions />
      <AdvancedTailwindConfig />
      <ApiReference />
      <TypeScript />
      <Limitations />
      <Contributing />
        </main>
  );
}
