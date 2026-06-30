import React from "react";
import { transform } from "sucrase";
import { Invoice } from "react-invoice";

export interface CompileSuccess {
  Component: React.ComponentType;
}

export interface CompileError {
  error: string;
}

export type CompileResult = CompileSuccess | CompileError;

function validateAndStripImports(source: string): string {
  const imports = source.match(/^\s*import .*$/gm) ?? [];

  for (const statement of imports) {
    if (
      !statement.includes('"react-invoice"') &&
      !statement.includes('"react"') &&
      !statement.includes("'react-invoice'") &&
      !statement.includes("'react'")
    ) {
      throw new Error(
        `Only imports from 'react' and 'react-invoice' are allowed.\n\nFound: ${statement.trim()}`,
      );
    }
  }

  return source
    .replace(
      /^\s*import\s+(?:\{[^}]*\}|[a-zA-Z_$][a-zA-Z0-9_$]*)\s+from\s+["'][^"']*["'];?\s*$/gm,
      "",
    )
    .replace(/^\s*import\s+["'][^"']*["'];?\s*$/gm, "");
}

export function compileCode(code: string): CompileResult {
  try {
    const cleanedCode = validateAndStripImports(code);

    const transformed = transform(cleanedCode, {
      transforms: ["typescript", "jsx", "imports"],
      jsxRuntime: "classic",
      jsxPragma: "React.createElement",
      jsxFragmentPragma: "React.Fragment",
    });

    const scope = { React, Invoice };
    const scopeKeys = Object.keys(scope);
    const scopeValues = Object.values(scope);

    const factory = new Function("exports", "module", ...scopeKeys, transformed.code);
    const moduleObj = { exports: {} as Record<string, unknown> };
    const exportsObj = moduleObj.exports;

    factory(exportsObj, moduleObj, ...scopeValues);

    const Component =
      moduleObj.exports.default ??
      exportsObj.default ??
      (typeof moduleObj.exports === "function" ? moduleObj.exports : null);

    if (!Component || typeof Component !== "function") {
      return { error: "No default export found. Make sure your code exports a default component." };
    }

    return { Component: Component as React.ComponentType };
  } catch (err) {
    return { error: err instanceof Error ? err.message : "An error occurred" };
  }
}
