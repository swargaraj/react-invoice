import type { ReactNode } from "react";

interface CodeProps {
  children: ReactNode;
}

export function Code({ children }: CodeProps) {
  return (
    <code className="border bg-muted text-primary px-1.5 py-0.5 rounded text-sm">{children}</code>
  );
}
