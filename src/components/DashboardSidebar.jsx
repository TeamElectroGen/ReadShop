"use client"
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";

import LogoutButton from "@/components/LogoutButton";
import SiteLogo from "@/components/SiteLogo";
import AdminMenu from "./AdminMenu";
import PublisherMenu from "./PublisherMenu";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { getUserRole } from "@/services/getUserData";

const DashboardSidebar = () => {
  const { data: session } = useSession() || {};
  const [role, setRole] = useState("");

  useEffect(() => {
    if (session?.user?.email) {
      const getRole = async () => {
        const { role } = await getUserRole(session?.user?.email);
        console.log(role);
        setRole(role);
      };
      getRole();
    }
  }, [session?.user?.email]);

  return (
    <aside className="sticky bottom-0 left-0 top-0 z-50 hidden bg-background shadow-lg md:block">
      <div className="flex h-full max-h-screen flex-col gap-6">
        {/* logo */}
        <header className="flex h-14 items-center px-4 pt-3 lg:h-[60px] lg:px-6">
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
