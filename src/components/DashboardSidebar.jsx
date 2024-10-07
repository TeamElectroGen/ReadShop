import Link from "next/link";
import {
  Bell,
  Home,
  LineChart,
  Package,
  ShoppingCart,
  Users,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import LogoutButton from "@/components/LogoutButton";
import SiteLogo from "@/components/SiteLogo";

const DashboardSidebar = () => {
  return (
    <aside className="hidden shadow-lg bg-background md:block sticky top-0 bottom-0 left-0 z-50">
      <div className="flex h-full max-h-screen flex-col gap-2">
        {/* logo */}
        <header className="flex h-14 mt-1 items-center px-4 lg:h-[60px] lg:px-6">
          <SiteLogo />
          <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
            <Bell className="h-4 w-4" />
            <span className="sr-only">Toggle notifications</span>
          </Button>
        </header>
        {/* main navigation */}
        <div className="flex-1">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            <Link
              href="#"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
            >
              <Home className="h-4 w-4" />
              Dashboard
            </Link>
            <Link
              href="#"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
            >
              <ShoppingCart className="h-4 w-4" />
              Orders
              <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                6
              </Badge>
            </Link>
            <Link
              href="#"
              className="flex items-center gap-3 rounded-lg bg-muted px-3 py-2 text-primary transition-all hover:text-primary"
            >
              <Package className="h-4 w-4" />
              Products{" "}
            </Link>
            <Link
              href="#"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
            >
              <Users className="h-4 w-4" />
              Customers
            </Link>
            <Link
              href="#"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
            >
              <LineChart className="h-4 w-4" />
              Analytics
            </Link>
          </nav>
        </div>
        {/* end */}
        <footer className="border-t border-slate-200 p-3">
          <LogoutButton />
        </footer>
      </div>
    </aside>
  );
};

export default DashboardSidebar;
