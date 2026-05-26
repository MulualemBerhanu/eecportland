"use client";

import Link from "next/link";
import { useNavScrollClick } from "@/lib/use-nav-scroll-click";

type Props = {
  href: string;
  children: React.ReactNode;
  className?: string;
  /** Called after same-page scroll or when leaving (e.g. close mobile menu). */
  onAfterClick?: () => void;
  ariaLabel?: string;
};

export function NavLink({ href, children, className, onAfterClick, ariaLabel }: Props) {
  const handleClick = useNavScrollClick(href, { onAfter: onAfterClick });

  return (
    <Link
      href={href}
      aria-label={ariaLabel}
      className={className}
      onClick={handleClick}
    >
      {children}
    </Link>
  );
}
