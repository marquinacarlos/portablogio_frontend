import type React from "react";
import { cn } from "../lib/utils";

interface SubtitleProps {
  children: React.ReactNode;
  className?: string;
}

export const Subtitle = ({ children, className }: SubtitleProps) => {
  return (
    <h2
      className={cn(
        "w-fit text-2xl font-bold text-brand uppercase tracking-wide lg:text-4xl",
        className
      )}
    >
      {children}
    </h2>
  );
};
