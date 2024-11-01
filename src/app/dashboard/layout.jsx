// import {
//   Breadcrumb,
//   BreadcrumbItem,
//   BreadcrumbLink,
//   BreadcrumbList,
//   BreadcrumbPage,
//   BreadcrumbSeparator,
// } from "@/components/ui/breadcrumb";
import { Search } from "lucide-react";
// import Link from "next/link";
import DashboardDrawer from "@/components/DashboardDrawer";
import DashboardSidebar from "@/components/DashboardSidebar";
import { Input } from "@/components/ui/input";
import UserDropdown from "@/components/UserDropdown";

export const generateMetadata = async () => {
  return {
    title: `Dashboard`,
    description: `Manage orders from the ReadShop admin panel. Track and update order statuses for a seamless customer experience.`,
    keywords: ["admin", "dashboard", "orders", "manage orders", "order status"],
  };
};

const DashboardLayout = ({ children }) => {
  return (
    <div className="grid min-h-screen w-full bg-background md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      {/* Sidebar */}
      <DashboardSidebar />
      <div className="flex flex-col bg-primary/5 sm:gap-4 sm:py-4 md:pl-5">
        {/* Header */}
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent lg:px-12">
          {/* Mobile drawer menu */}
          <DashboardDrawer />
          {/* <Breadcrumb className="hidden md:flex">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="#">Dashboard</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="#">Orders</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Recent Orders</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb> */}
          <div className="relative ml-auto flex-1 md:grow-0">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[320px]"
            />
          </div>
          <UserDropdown />
        </header>

        {/* Dynamic pages */}
        <main className="h-full p-4 lg:px-12 lg:py-6">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
