import React from "react";
import { Document, Page, View, Text, Link } from "@react-pdf/renderer";
import type { DocumentProps, PageProps } from "@react-pdf/renderer";
import { tw } from "./twind";
import { InvoiceRoot } from "../components/root";
import { InvoiceText } from "../components/text";
import { InvoiceSection } from "../components/section";
import { InvoiceLink } from "../components/link";

const componentMap = new Map<React.ComponentType, React.ComponentType>([
  [InvoiceRoot, Document],
  [InvoiceText, Text],
  [InvoiceSection, View],
  [InvoiceLink, Link],
]);

function resolveStyles(className?: string, style?: React.CSSProperties): Record<string, unknown> {
  const fromClass = className ? (tw(className) as Record<string, unknown>) : {};
  const fromStyle = style ? (style as unknown as Record<string, unknown>) : {};
  const merged = { ...fromClass, ...fromStyle };
  if (merged.display === "flex" && !merged.flexDirection) {
    merged.flexDirection = "row";
  }
  return merged;
}

function isEmpty(node: React.ReactNode): boolean {
  return node == null || typeof node === "boolean";
}

function convertElement(
  element: React.ReactElement,
  documentOptions?: DocumentProps,
  pageOptions?: PageProps,
): React.ReactElement | null {
  if (isEmpty(element)) return null;

  const { type, props, key } = element;

  if (type === React.Fragment) {
    const { children } = props as { children?: React.ReactNode };
    return <>{processChildren(children, documentOptions, pageOptions)}</>;
  }

  if (type === InvoiceRoot) {
    const { children, className, style } = props as {
      children?: React.ReactNode;
      className?: string;
      style?: React.CSSProperties;
    };
    const resolvedStyle = resolveStyles(className, style);
    return (
      <Document key={key} {...(documentOptions as any)}>
        <Page
          size={pageOptions?.size ?? "A4"}
          {...(pageOptions as any)}
          style={[
            Object.keys(resolvedStyle).length ? (resolvedStyle as any) : undefined,
            pageOptions?.style,
          ].filter(Boolean)}
        >
          {processChildren(children, documentOptions, pageOptions)}
        </Page>
      </Document>
    );
  }

  const PdfComponent = componentMap.get(type as React.ComponentType);
  if (PdfComponent) {
    const { children, className, style, ...rest } = props as {
      children?: React.ReactNode;
      className?: string;
      style?: React.CSSProperties;
      [key: string]: unknown;
    };
    const pdfChildren =
      PdfComponent === Text || PdfComponent === Link
        ? processTextChildren(children, documentOptions, pageOptions)
        : processChildren(children, documentOptions, pageOptions);
    const resolvedStyle = resolveStyles(className, style);
    return (
      <PdfComponent
        key={key ?? undefined}
        style={Object.keys(resolvedStyle).length ? resolvedStyle : undefined}
        {...(rest as any)}
      >
        {pdfChildren}
      </PdfComponent>
    );
  }

  if (typeof type === "function") {
    try {
      const result = (type as (p: Record<string, unknown>) => React.ReactNode)(
        props as Record<string, unknown>,
      );
      if (React.isValidElement(result)) return convertElement(result, documentOptions, pageOptions);
      if (result != null) return <>{result}</>;
      return null;
    } catch {
      return null;
    }
  }

  if (typeof type === "string") {
    const { children, className, style } = props as {
      children?: React.ReactNode;
      className?: string;
      style?: React.CSSProperties;
    };
    const pdfChildren =
      type === "span" || type === "strong" || type === "em" || type === "b" || type === "i"
        ? processTextChildren(children, documentOptions, pageOptions)
        : processChildren(children, documentOptions, pageOptions);
    const resolvedStyle = resolveStyles(className, style);
    return (
      <View
        key={key ?? undefined}
        style={Object.keys(resolvedStyle).length ? (resolvedStyle as any) : undefined}
      >
        {pdfChildren}
      </View>
    );
  }

  return null;
}

function processChildren(
  children: React.ReactNode,
  documentOptions?: DocumentProps,
  pageOptions?: PageProps,
): React.ReactNode {
  return React.Children.map(children, (child) => {
    if (isEmpty(child)) return null;
    if (typeof child === "string") return <Text>{child}</Text>;
    if (typeof child === "number") return <Text>{String(child)}</Text>;
    if (React.isValidElement(child)) return convertElement(child, documentOptions, pageOptions);
    return child;
  });
}

function processTextChildren(
  children: React.ReactNode,
  documentOptions?: DocumentProps,
  pageOptions?: PageProps,
): React.ReactNode {
  return React.Children.map(children, (child) => {
    if (isEmpty(child)) return null;
    if (typeof child === "string") return child;
    if (typeof child === "number") return child;
    if (React.isValidElement(child)) return convertElement(child, documentOptions, pageOptions);
    return child;
  });
}

export function convertToPdf(
  element: React.ReactElement,
  documentOptions?: DocumentProps,
  pageOptions?: PageProps,
): React.ReactElement {
  return convertElement(element, documentOptions, pageOptions) ?? <View />;
}
