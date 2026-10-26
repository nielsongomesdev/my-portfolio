import type { ComponentProps } from "react";
import { Link } from "@/i18n/navigation";
import { cn } from "@/utils/cn";

export type ButtonVariant = "primary" | "secondary" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg font-medium transition-[color,background-color,border-color,transform] duration-200 ease-out-expo active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50";

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-accent-solid text-accent-fg shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)] hover:bg-accent-solid-hover",
  secondary: "border border-border-strong text-fg hover:border-fg-subtle hover:bg-bg-subtle",
  ghost: "text-fg-muted hover:text-fg",
};

const sizes: Record<ButtonSize, string> = {
  sm: "h-10 px-3.5 text-sm",
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-6 text-base",
};

export function buttonClasses({
  variant = "primary",
  size = "md",
  className,
}: {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
}) {
  return cn(base, variants[variant], sizes[size], className);
}

type InternalHref = "/" | "/about" | "/projects" | "/contact";

type ButtonLinkProps = {
  href: InternalHref | (string & {});
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: React.ReactNode;
  /** Forces a plain <a> (new tab). Inferred for http(s), mailto and files. */
  external?: boolean;
  "aria-label"?: string;
};

const isExternalHref = (href: string) => /^(https?:|mailto:|tel:)/.test(href) || /\.[a-z0-9]+$/i.test(href);

export function ButtonLink({ href, variant, size, className, children, external, ...rest }: ButtonLinkProps) {
  const classes = buttonClasses({ variant, size, className });

  if (external ?? isExternalHref(href)) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes} {...rest}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href as InternalHref} className={classes} {...rest}>
      {children}
    </Link>
  );
}

type ButtonProps = ComponentProps<"button"> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

export function Button({ variant, size, className, type = "button", ...rest }: ButtonProps) {
  return <button type={type} className={buttonClasses({ variant, size, className })} {...rest} />;
}
