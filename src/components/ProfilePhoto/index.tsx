import Image from "next/image";
import { cn } from "@/utils/cn";

type ProfilePhotoProps = {
  alt: string;
  variant?: "cutout" | "avatar";
  className?: string;
  priority?: boolean;
};

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
        className="portrait-fade-bottom absolute -inset-x-[10%] -top-[10%] bottom-0"
      >
        <div className="absolute inset-x-1/6 top-[27%] bottom-0 rounded-full bg-accent/15 blur-3xl" />
      </div>
      <Image
        src="/profile.png"
        alt={alt}
        width={819}
        height={1229}
        sizes="(min-width: 1024px) 520px, 1px"
        priority={priority}
        className="absolute bottom-0 left-1/2 h-full w-auto max-w-none -translate-x-1/2 portrait-fade drop-shadow-[0_24px_48px_rgba(0,0,0,0.5)]"
      />
    </div>
  );
}
