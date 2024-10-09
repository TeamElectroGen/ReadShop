"use client"
import { BookOpen, FileText, Home, ShoppingCart, Users } from "lucide-react";
import MenuItem from "./MenuItem";

const adminMenuItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: Home,
  },
  {
    title: "Inventory",
    href: "/dashboard/books",
    icon: BookOpen,
  },
  {
    title: "Orders",
    href: "/dashboard/orders",
    icon: ShoppingCart,
  },
  {
    title: "Manage User",
    href: "/dashboard/users",
    icon: Users,
  },
  {
    title: "Manage Publishers",
    href: "/dashboard/publishers",
    icon: FileText,
  },
];

const AdminMenu = () => {
  return (
    <>
      {adminMenuItems.map((item) => (
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

export default AdminMenu;
