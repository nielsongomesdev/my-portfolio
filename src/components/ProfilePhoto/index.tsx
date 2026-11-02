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
        className="absolute inset-x-[10%] bottom-0 top-[20%] rounded-full bg-accent/15 blur-3xl"
      />
      <Image
        src="/profile.png"
        alt={alt}
        width={819}
        height={1229}
        sizes="(min-width: 1024px) 520px, 1px"
        priority={priority}
        className="absolute bottom-0 left-1/2 h-full w-auto max-w-none -translate-x-1/2 drop-shadow-[0_24px_48px_rgba(0,0,0,0.5)] [mask-image:linear-gradient(to_right,black_74%,transparent)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-bg to-transparent"
      />
    </div>
  );
}
