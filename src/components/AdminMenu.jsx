"use client"
import { BookOpen, FileText, Home, ShoppingCart, Users } from "lucide-react";
import MenuItem from "./MenuItem";

const adminMenuItems = [
  {
    title: "Dashboard",
    href: "/dashboard/admin",
    icon: Home,
  },
  {
    title: "Inventory",
    href: "/dashboard/admin/products",
    icon: BookOpen,
  },
  {
    title: "Manage Orders",
    href: "/dashboard/admin/manage-orders",
    icon: ShoppingCart,
  },
  {
    title: "Manage User",
    href: "/dashboard/admin/users",
    icon: Users,
  },
  {
    title: "Manage Publishers",
    href: "/dashboard/admin/publishers",
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
