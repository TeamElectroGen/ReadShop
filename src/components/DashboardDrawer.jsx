"use client";
import { MenuIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import SiteLogo from "@/components/SiteLogo";
import AdminMenu from "@/components/AdminMenu";
import PublisherMenu from "@/components/PublisherMenu";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import useRole from "@/hooks/useRole";
import LogoutButton from "./LogoutButton";

const DashboardDrawer = () => {
  const role = useRole();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="icon" variant="outline" className="md:hidden">
          <MenuIcon className="h-5 w-5" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="max-w-xs">
        <SheetTitle>
          <SiteLogo />
        </SheetTitle>
        <SheetDescription className="sr-only">
          Manage admin or publisher related stuff here.
        </SheetDescription>
        <nav className="mt-6 grid gap-3 text-base font-medium">
          {role === "admin" && <AdminMenu />}
          {role === "publisher" && <PublisherMenu />}
          <LogoutButton />
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default DashboardDrawer;
