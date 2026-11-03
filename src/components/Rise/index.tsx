import { cn } from "@/utils/cn";

const STEP_MS = 70;

export const riseDelay = (step: number) => ({ animationDelay: `${step * STEP_MS}ms` });

type RiseProps = {
  children: React.ReactNode;
  step?: number;
  className?: string;
  as?: "div" | "li" | "ol" | "ul";
  spotlight?: boolean;
};

export function Rise({ children, step = 0, className, as: Tag = "div", spotlight = false }: RiseProps) {
  return (
    <Tag
      className={cn("animate-rise", className)}
      style={riseDelay(step)}
      data-spotlight={spotlight ? "" : undefined}
    >
      {children}
    </Tag>
  );
}
