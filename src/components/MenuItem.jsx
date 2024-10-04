"use client";
import React from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Link from "next/link";

const MenuItem = ({ href, title, icon: Icon, handleClick }) => {
  const pathname = usePathname();

  return (
    <Link
      key={href}
      href={href}
      onClick={handleClick}
      className={cn(
        pathname === href
          ? "bg-muted text-foreground hover:text-foreground"
          : "text-muted-foreground hover:text-foreground",
        "flex items-center gap-3 rounded-lg px-3 py-2 transition-all"
      )}
    >
      {Icon && <Icon className="h-4 w-4" />}
      {title}
    </Link>
  );
};

export default MenuItem;
