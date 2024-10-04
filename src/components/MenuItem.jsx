"use client";
import React from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Link from "next/link";

const MenuItem = ({ item }) => {
  const pathname = usePathname();

  return (
    <Link
      key={item.href}
      href={item.href}
      className={cn(
        pathname === item.href
          ? "bg-muted text-foreground hover:text-foreground"
          : "text-muted-foreground hover:text-foreground",
        "flex items-center gap-3 rounded-lg px-3 py-2 transition-all"
      )}
    >
      {item.icon && <item.icon className="size-4" />}
      {item.title}
    </Link>
  );
};

export default MenuItem;
