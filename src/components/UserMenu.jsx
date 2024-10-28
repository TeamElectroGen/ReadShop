"use client";
import React from "react";
import { User, Heart, Library, ShoppingCart } from "lucide-react";
import MenuItem from "./MenuItem";

const userMenuItems = [
  {
    title: "My Profile",
    href: "/profile",
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
    href: "/profile/orders-history",
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
    </>
  );
};

export default UserMenu;
