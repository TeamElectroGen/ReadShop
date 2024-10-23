"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";
import Image from "next/image";
import { FaCircleUser } from "react-icons/fa6";
import { useSession } from "next-auth/react";
import AdminMenu from "./AdminMenu";
import PublisherMenu from "./PublisherMenu";
import LogoutButton from "./LogoutButton";
import useRole from "@/hooks/useRole";

const UserDropdown = () => {
  const { data: session } = useSession();
  const role = useRole();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="overflow-hidden rounded-full"
        >
          {session?.user?.image ? (
            <Image
              src={session.user.image}
              width={36}
              height={36}
              alt="Avatar"
              className="overflow-hidden rounded-full"
            />
          ) : (
            <FaCircleUser className="size-7" />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-52">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <nav className="grid items-start text-sm font-medium">
          {role === "admin" && <AdminMenu />}
          {role === "publisher" && <PublisherMenu />}
          <LogoutButton />
        </nav>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropdown;
