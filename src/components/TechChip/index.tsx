import { cn } from "@/utils/cn";

export function TechChip({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <li
      className={cn(
        "rounded-md border border-border bg-bg-subtle/60 px-2.5 py-1 font-mono text-xs tracking-wide text-fg-muted",
        className
      )}
    >
      {children}
    </li>
  );
}

export function TechList({ items, className }: { items: string[]; className?: string }) {
  return (
    <ul className={cn("flex flex-wrap gap-1.5", className)}>
      {items.map((item) => (
        <TechChip key={item}>{item}</TechChip>
      ))}
    </ul>
  );
}
