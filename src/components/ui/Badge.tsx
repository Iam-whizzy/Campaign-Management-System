import React from "react";
import { cn } from "../../lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "success" | "warning" | "destructive" | "secondary" | "outline" | "dark";
}

export const Badge: React.FC<BadgeProps> = ({
  className,
  variant = "default",
  children,
  ...props
}) => {
  const variantStyles = {
    default: "bg-emerald-100 text-emerald-800 border-emerald-200",
    success: "bg-emerald-100 text-emerald-800 border-emerald-200",
    warning: "bg-amber-100 text-amber-900 border-amber-200",
    destructive: "bg-rose-100 text-rose-800 border-rose-200",
    secondary: "bg-zinc-100 text-zinc-800 border-zinc-200",
    outline: "bg-white text-zinc-700 border-zinc-300",
    dark: "bg-zinc-900 text-zinc-100 border-zinc-800",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-xs font-semibold border transition-colors",
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};
