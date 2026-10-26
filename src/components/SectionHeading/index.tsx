import { cn } from "@/utils/cn";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  as?: "h1" | "h2" | "h3";
  className?: string;
  /** Larger type for page-level headings. */
  size?: "page" | "section";
};

export function Eyebrow({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={cn("font-mono text-xs font-medium uppercase tracking-[0.18em] text-accent", className)}>
      {children}
    </p>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  as: Tag = "h2",
  className,
  size = "section",
}: SectionHeadingProps) {
  return (
    <div className={cn("flex max-w-2xl flex-col gap-3", className)}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <Tag
        className={cn(
          "font-semibold tracking-tight text-balance",
          size === "page"
            ? "text-3xl leading-[1.1] sm:text-4xl lg:text-5xl"
            : "text-2xl leading-[1.15] sm:text-3xl lg:text-4xl"
        )}
      >
        {title}
      </Tag>
      {description && <p className="text-base leading-relaxed text-fg-muted sm:text-lg">{description}</p>}
    </div>
  );
}
