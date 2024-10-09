"use client"
import { BarChart, Book, Package, User } from "lucide-react";
import MenuItem from "./MenuItem";

const publisherMenuItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: BarChart,
  },
  {
    title: "Published Books",
    href: "/dashboard/books",
    icon: Book,
  },
  {
    title: "Orders",
    href: "/dashboard/orders",
    icon: Package,
  },
  {
    title: "Publisher Profile",
    href: "/dashboard/publishers",
    icon: User,
  },
];

const PublisherMenu = () => {
  return (
    <>
      {publisherMenuItems.map((item) => (
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

export default PublisherMenu;