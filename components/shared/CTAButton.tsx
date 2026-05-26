"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { useNavScrollClick } from "@/lib/use-nav-scroll-click";
import type { LucideIcon } from "lucide-react";

type Base = {
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "ghost" | "outlineLight" | "outlineWarm";
  size?: "md" | "lg";
  icon?: LucideIcon;
};

type LinkProps = Base & {
  href: string;
  external?: boolean;
  onClick?: () => void;
};

type ButtonProps = Base & {
  type?: "button" | "submit";
  disabled?: boolean;
  onClick?: () => void;
};

const variants: Record<NonNullable<Base["variant"]>, string> = {
  primary: cn(
    "group relative isolate overflow-hidden border border-gold-500/30 bg-gradient-to-b from-gold-300 via-gold-400 to-gold-600 text-navy-950 [&>*]:relative [&>*]:z-10",
    "shadow-[0_1px_0_rgba(255,255,255,0.45)_inset,0_14px_36px_-8px_rgba(212,175,55,0.45),0_0_0_1px_rgba(184,150,46,0.15)]",
    "transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
    "hover:-translate-y-1 hover:border-gold-300/50 hover:from-gold-300 hover:via-gold-400 hover:to-gold-600",
    "hover:shadow-[0_1px_0_rgba(255,255,255,0.55)_inset,0_22px_48px_-8px_rgba(212,175,55,0.42),0_0_52px_-4px_rgba(241,210,122,0.35)]",
    "active:translate-y-0 active:shadow-[0_1px_0_rgba(255,255,255,0.3)_inset,0_10px_28px_-8px_rgba(184,150,46,0.35)]",
    "before:pointer-events-none before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/35 before:to-transparent before:opacity-0 before:transition-opacity before:duration-500 hover:before:opacity-100",
    "after:pointer-events-none after:absolute after:inset-[-40%] after:-z-10 after:rounded-full after:bg-gold-300/28 after:blur-3xl after:opacity-0 after:transition-opacity after:duration-500 hover:after:opacity-100",
    "focus-visible:ring-2 focus-visible:ring-gold-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-cream-50",
  ),
  secondary: cn(
    "relative overflow-hidden border border-navy-800/35 bg-gradient-to-b from-navy-900 to-navy-950 text-cream-50 [&>*]:relative [&>*]:z-10",
    "shadow-[0_1px_0_rgba(255,255,255,0.1)_inset,0_14px_36px_-12px_rgba(11,28,44,0.5)]",
    "transition-all duration-300 ease-out",
    "hover:-translate-y-0.5 hover:border-navy-700/80 hover:from-navy-800 hover:to-navy-950 hover:shadow-[0_1px_0_rgba(255,255,255,0.14)_inset,0_20px_44px_-10px_rgba(11,28,44,0.45)]",
    "active:translate-y-0",
    "focus-visible:ring-2 focus-visible:ring-navy-700/45 focus-visible:ring-offset-2 focus-visible:ring-offset-cream-50",
  ),
  ghost: cn(
    "bg-transparent text-navy-950",
    "transition-colors duration-300",
    "hover:bg-cream-200/80",
    "focus-visible:ring-2 focus-visible:ring-navy-900/18 focus-visible:ring-offset-2 focus-visible:ring-offset-cream-50",
  ),
  outlineLight: cn(
    "group relative border border-white/50 bg-white/[0.07] text-cream-50 backdrop-blur-md",
    "shadow-[0_1px_0_rgba(255,255,255,0.14)_inset,0_12px_40px_-20px_rgba(0,0,0,0.35)]",
    "transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
    "hover:-translate-y-1 hover:border-gold-300/45 hover:bg-white/[0.16] hover:ring-1 hover:ring-gold-400/35",
    "hover:shadow-[0_1px_0_rgba(255,255,255,0.22)_inset,0_0_44px_-10px_rgba(212,175,55,0.25),0_18px_50px_-24px_rgba(0,0,0,0.4)]",
    "active:translate-y-0",
    "focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-navy-950",
  ),
  outlineWarm: cn(
    "group relative border border-navy-950/12 bg-white/95 text-navy-950 shadow-[0_1px_0_rgba(255,255,255,0.9)_inset,0_12px_32px_-16px_rgba(11,28,44,0.1)] backdrop-blur-sm",
    "transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
    "hover:-translate-y-1 hover:border-gold-500/35 hover:bg-white hover:shadow-[0_1px_0_rgba(255,255,255,1)_inset,0_18px_44px_-14px_rgba(212,175,55,0.22),0_0_0_1px_rgba(212,175,55,0.12)]",
    "active:translate-y-0",
    "focus-visible:ring-2 focus-visible:ring-gold-500/45 focus-visible:ring-offset-2 focus-visible:ring-offset-cream-50",
  ),
};

const sizes: Record<NonNullable<Base["size"]>, string> = {
  md: "px-5 py-2.5 text-sm font-semibold tracking-wide",
  lg: "px-8 py-3.5 text-[0.9375rem] font-semibold tracking-wide",
};

function classes(variant: Base["variant"], size: Base["size"], className?: string) {
  return cn(
    "inline-flex transform-gpu items-center justify-center gap-2 rounded-full font-medium outline-none will-change-transform active:scale-[0.98]",
    variants[variant ?? "primary"],
    sizes[size ?? "md"],
    className,
  );
}

export function CTALink({
  href,
  children,
  className,
  variant,
  size,
  icon: Icon,
  external,
  onClick,
}: LinkProps) {
  const handleClick = useNavScrollClick(href, {
    enabled: !external,
    onAfter: onClick,
  });

  return (
    <Link
      href={href}
      className={classes(variant, size, className)}
      onClick={handleClick}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {Icon ? <Icon className="size-4 shrink-0 opacity-90" aria-hidden /> : null}
      {children}
    </Link>
  );
}

export function CTAButton({
  type = "button",
  children,
  className,
  variant,
  size,
  icon: Icon,
  disabled,
  onClick,
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={cn(
        classes(variant, size, className),
        disabled && "pointer-events-none opacity-55",
      )}
    >
      {Icon ? <Icon className="size-4 shrink-0 opacity-90" aria-hidden /> : null}
      {children}
    </button>
  );
}
