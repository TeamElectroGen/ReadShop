import {
  Bell,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import LogoutButton from "@/components/LogoutButton";
import SiteLogo from "@/components/SiteLogo";
import AdminMenu from "./AdminMenu";
import PublisherMenu from "./PublisherMenu";

const DashboardSidebar = () => {
  const role = "admin";
  
  return (
    <aside className="hidden shadow-lg bg-background md:block sticky top-0 bottom-0 left-0 z-50">
      <div className="flex h-full max-h-screen flex-col gap-6">
        {/* logo */}
        <header className="flex h-14 pt-3 items-center px-4 lg:h-[60px] lg:px-6">
          <SiteLogo />
          <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
            <Bell className="h-4 w-4" />
            <span className="sr-only">Toggle notifications</span>
          </Button>
        </header>
        {/* main navigation */}
        <div className="flex-1">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            {role === "admin" && <AdminMenu />}
            {role === "publisher" && <PublisherMenu />}
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
