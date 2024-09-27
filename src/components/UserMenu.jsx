"use client";
import { cn } from "@/lib/utils";
import React from "react";
import { Home, User, Heart, Library, ShoppingCart, LogOut } from "lucide-react";
import MenuItem from "./MenuItem";

const userMenuItems = [
  {
    title: "Dashboard",
    href: "/profile",
    icon: Home,
  },
  {
    title: "My Profile",
    href: "/profile/my-profile",
    icon: User,
  },
  {
    title: "Wishlist",
    href: "/profile/wishlist",
    icon: Heart,
  },
  {
    title: "Reading list",
    href: "/profile/reading-list",
    icon: Library,
  },
  {
    title: "Orders History",
    href: "/profile/orders",
    icon: ShoppingCart,
  },
  {
    title: "Logout",
    href: "/profile/logout",
    icon: LogOut,
  },
];

const UserMenu = ({ className }) => {
  return (
    <nav
      className={cn(
        "grid items-start text-sm font-medium",
        className
      )}
    >
      {userMenuItems.map((item) => (
        <MenuItem key={item.title} item={item} />
      ))}
    </nav>
  );
};

export default UserMenu;