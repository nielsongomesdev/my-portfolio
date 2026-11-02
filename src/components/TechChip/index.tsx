import { cn } from "@/utils/cn";
import { hasTechIcon, renderTechIcon } from "./icons";

export function TechChip({ name, className }: { name: string; className?: string }) {
  if (!hasTechIcon(name)) {
    return (
      <li
        className={cn(
          "inline-flex h-10 items-center rounded-lg border border-border bg-bg-subtle/60 px-3 font-mono text-xs tracking-wide text-fg-muted",
          className
        )}
      >
        {name}
      </li>
    );
  }

  return (
    <li className={cn("group/tech relative", className)}>
      <span
        tabIndex={-1}
        className="inline-flex size-10 items-center justify-center rounded-lg border border-border bg-bg-subtle/60 transition-[border-color,background-color,transform] duration-200 ease-out-expo outline-none group-hover/tech:-translate-y-0.5 group-hover/tech:border-border-strong group-hover/tech:bg-bg-subtle group-focus-within/tech:border-border-strong motion-reduce:group-hover/tech:translate-y-0"
      >
        {renderTechIcon(name)}
        <span className="sr-only">{name}</span>
      </span>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute bottom-full left-1/2 z-20 mb-2 hidden -translate-x-1/2 animate-tooltip-in whitespace-nowrap rounded-md border border-border-strong bg-bg-elevated px-2 py-1 font-mono text-xs text-fg shadow-lg group-first/tech:left-0 group-first/tech:translate-x-0 group-hover/tech:block group-focus-within/tech:block"
      >
        {name}
      </span>
    </li>
  );
}

export function TechList({ items, className }: { items: string[]; className?: string }) {
  const withIcon = items.filter(hasTechIcon);
  const textOnly = items.filter((item) => !hasTechIcon(item));

  return (
    <ul className={cn("flex flex-wrap gap-2", className)}>
      {[...withIcon, ...textOnly].map((item) => (
        <TechChip key={item} name={item} />
      ))}
    </ul>
  );
}
