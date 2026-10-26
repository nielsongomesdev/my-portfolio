import Image from "next/image";
import { cn } from "@/utils/cn";

type ProfilePhotoProps = {
  alt: string;
  variant?: "cutout" | "avatar";
  className?: string;
  priority?: boolean;
};

/**
 * `cutout`: the transparent PNG anchored to the bottom of its box, with a
 * soft accent glow behind and a fade into the page background.
 * `avatar`: circular crop of the head and shoulders.
 */
export function ProfilePhoto({ alt, variant = "cutout", className, priority = false }: ProfilePhotoProps) {
  if (variant === "avatar") {
    return (
      <div
        className={cn(
          "relative size-20 shrink-0 overflow-hidden rounded-full bg-bg-subtle ring-1 ring-border",
          className
        )}
      >
        <Image
          src="/profile.png"
          alt={alt}
          fill
          sizes="96px"
          priority={priority}
          className="object-cover object-[50%_12%]"
        />
      </div>
    );
  }

  return (
    <div className={cn("relative", className)}>
      <div
        aria-hidden="true"
        className="absolute inset-x-[10%] bottom-0 top-[20%] rounded-full bg-accent/15 blur-3xl"
      />
      <Image
        src="/profile.png"
        alt={alt}
        fill
        sizes="(min-width: 1024px) 520px, 1px"
        priority={priority}
        className="object-contain object-bottom drop-shadow-[0_24px_48px_rgba(0,0,0,0.5)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-bg to-transparent"
      />
    </div>
  );
}
