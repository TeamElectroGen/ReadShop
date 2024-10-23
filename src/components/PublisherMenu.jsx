"use client"
import { BarChart, Book, Package, PlusSquare, User } from "lucide-react";
import MenuItem from "./MenuItem";

const publisherMenuItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: BarChart,
  },
  {
    title: "Published Books",
    href: "/dashboard/publisher/books",
    icon: Book,
  },
  {
    title: "Publish New Book",
    href: "/dashboard/publisher/add-book",
    icon: PlusSquare,
  },
  {
    title: "Publisher Profile",
    href: "/dashboard/publisher/profile",
    icon: User,
  },
  {
    title: "Orders",
    href: "/dashboard/publisher/orders",
    icon: Package,
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