import React from "react";

import { Document, Page, View, Text, Link, Image } from "@react-pdf/renderer";
import type { DocumentProps, PageProps } from "@react-pdf/renderer";

import { InvoiceRoot } from "../components/root";
import { InvoiceText } from "../components/text";
import { InvoiceSection } from "../components/section";
import { InvoiceLink } from "../components/link";
import { InvoiceImage } from "../components/image";

import { tw } from "./twind";

const componentMap = new Map<any, any>([
  [InvoiceRoot, Document],
  [InvoiceText, Text],
  [InvoiceSection, View],
  [InvoiceLink, Link],
  [InvoiceImage, Image],
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

  const PdfComponent = componentMap.get(type);
  if (PdfComponent) {
    const { className, style, ...rest } = props as {
      className?: string;
      style?: React.CSSProperties;
      [key: string]: unknown;
    };
    const isText = PdfComponent === Text || PdfComponent === Link;
    const pdfChildren = isText
      ? processTextChildren(rest.children as React.ReactNode, documentOptions, pageOptions)
      : processChildren(rest.children as React.ReactNode, documentOptions, pageOptions);
    const resolvedStyle = resolveStyles(className, style);
    const { children: _children, ...restProps } = rest;
    const pdfProps: Record<string, unknown> = {
      ...restProps,
      style: hasResolvedStyles(resolvedStyle) ? resolvedStyle : undefined,
      children: pdfChildren,
    };
    return React.createElement(PdfComponent, pdfProps);
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
          `Components with hooks/context/refs cannot be rendered inline — wrap them in a supported component (Invoice.Root, Invoice.Text, Invoice.Section, Invoice.Link, Invoice.Image).`,
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
