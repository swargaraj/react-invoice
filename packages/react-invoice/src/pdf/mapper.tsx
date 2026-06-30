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

function warnDev(message: string, ...args: unknown[]): void {
  if (typeof console !== "undefined") {
    console.warn(`[react-invoice] ${message}`, ...args);
  }
}

function resolveStyles(className?: string, style?: React.CSSProperties): Record<string, unknown> {
  const fromClass = className ? (tw(className) as Record<string, unknown>) : {};
  const fromStyle = style ? (style as unknown as Record<string, unknown>) : {};
  const merged = { ...fromClass, ...fromStyle };
  if (merged.display === "flex" && !merged.flexDirection) {
    merged.flexDirection = "row";
  }
  return merged;
}

function hasResolvedStyles(resolvedStyle: Record<string, unknown>): boolean {
  return Object.keys(resolvedStyle).length > 0;
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
            hasResolvedStyles(resolvedStyle) ? (resolvedStyle as any) : undefined,
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
    const { children, className, style } = props as {
      children?: React.ReactNode;
      className?: string;
      style?: React.CSSProperties;
    };
    const pdfChildren =
      PdfComponent === Text || PdfComponent === Link
        ? processTextChildren(children, documentOptions, pageOptions)
        : processChildren(children, documentOptions, pageOptions);
    const resolvedStyle = resolveStyles(className, style);
    return React.createElement(PdfComponent as React.ComponentType<any>, {
      key: key ?? undefined,
      style: hasResolvedStyles(resolvedStyle) ? resolvedStyle : undefined,
      children: pdfChildren,
    });
  }

  if (typeof type === "function") {
    try {
      const rendered = (type as (p: Record<string, unknown>) => React.ReactNode)(
        props as Record<string, unknown>,
      );
      if (React.isValidElement(rendered)) {
        return convertElement(rendered, documentOptions, pageOptions);
      }
      if (rendered != null) return <>{rendered}</>;
      return null;
    } catch (err) {
      const name =
        typeof type === "function"
          ? (type as { displayName?: string; name?: string }).displayName ||
            (type as { displayName?: string; name?: string }).name ||
            "Anonymous"
          : "Anonymous";
      warnDev(
        `Failed to render component "${name}". ` +
          `Components with hooks/context/refs cannot be rendered inline — wrap them in a supported component (Invoice.Root, Invoice.Text, Invoice.Section, Invoice.Link).`,
        err,
      );
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
        style={hasResolvedStyles(resolvedStyle) ? (resolvedStyle as any) : undefined}
      >
        {pdfChildren}
      </View>
    );
  }

  warnDev("Unknown element type skipped:", type);
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
  const result = convertElement(element, documentOptions, pageOptions);
  if (!result) {
    warnDev("Empty input, returning fallback View");
    return <View />;
  }
  return result;
}
