'use client'

import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

export default function NavLink({
  children,
  href,
  className,
}: {
  children: React.ReactNode;
  href: string;
  className?: string;
}) {
    const pathname = usePathname();
    const isActive = pathname === href || (
        href !== '/' && pathname.startsWith(href)
    )
  return (
    <Link
      href={href}
      className={cn(
        "transition-colors text-sm duration-200  text-gray-600 hover:text-purple-500",
        className,
        isActive && "text-purple-500"
      )}
    >
      {children}
    </Link>
  );
}
