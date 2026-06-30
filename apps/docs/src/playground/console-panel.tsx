import { useEffect, useState } from "react";

export interface ConsoleEntry {
  id: number;
  type: "info" | "error";
  message: string;
}

interface ConsolePanelProps {
  entries: ConsoleEntry[];
}

export function ConsolePanel({ entries }: ConsolePanelProps) {
  const [collapsed, setCollapsed] = useState(true);

  useEffect(() => {
    if (entries.length > 0) setCollapsed(false);
  }, [entries.length]);

  return (
    <div className="border-t border-border flex flex-col" style={{ height: collapsed ? 36 : 180 }}>
      <button
        onClick={() => setCollapsed((c) => !c)}
        className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-muted-foreground hover:text-foreground border-b border-border bg-background cursor-pointer shrink-0"
      >
        <span>Console</span>
        {entries.length > 0 && (
          <span className="rounded-full bg-primary/20 px-1 text-[10px] font-mono">
            {entries.length}
          </span>
        )}
      </button>
      {!collapsed && (
        <div className="flex-1 overflow-auto bg-background p-2 font-mono text-xs">
          {entries.map((entry) => (
            <div
              key={entry.id}
              className={`py-1 ${entry.type === "error" ? "text-red-500" : "text-muted-foreground"}`}
            >
              <span className="mr-2 text-[10px] uppercase">{entry.type}:</span>
              {entry.message}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
