"use client";
import React from "react";
import { User, Heart, Library, ShoppingCart, LogOut } from "lucide-react";
import MenuItem from "./MenuItem";
import { signOut } from "next-auth/react";

const userMenuItems = [
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
];

const UserMenu = () => {
  return (
    <>
      {userMenuItems.map((item) => (
        <MenuItem
          key={item.title}
          href={item.href}
          title={item.title}
          icon={item.icon}
        />
      ))}
      <button
        onClick={() => signOut()}
        className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground"
      >
        <LogOut className="size-4" /> Logout
      </button>
    </>
  );
};

export default UserMenu;
