import Link from "next/link";
import React from "react";
import { FaCartShopping, FaCircleUser } from "react-icons/fa6";
import { FaBookOpenReader } from "react-icons/fa6";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import HamburgerMenu from "./HamburgerMenu";

const Navbar = () => {
  const user = false;

  const navLinks = (
    <>
      <li>
        <Link href={"/"}>Home</Link>
      </li>
      <li>
        <Link href={"/about"}>About</Link>
      </li>
      <li>
        <Link href={"/contact-us"}>Contact Us</Link>
      </li>
    </>
  );

  return (
    <>
      <nav className="h-16 w-full bg-background">
        <div className="container flex h-full items-center justify-between">
          <Link
            href={"/"}
            className="flex items-center gap-2 font-sans text-2xl font-bold"
          >
            <FaBookOpenReader className="text-primary" />
            <span className="text-xl font-semibold tracking-wide">
              ReadShop
            </span>
          </Link>

          <div>
            <ul className="hidden gap-5 text-foreground md:flex">{navLinks}</ul>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon">
              <FaCartShopping className="size-5" />
            </Button>
            {user ? (
              <>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      className="overflow-hidden rounded-full"
                    >
                      {user?.photoURL ? (
                        <Image
                          src="/placeholder-user.jpg"
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
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Settings</DropdownMenuItem>
                    <DropdownMenuItem>Support</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Logout</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <Button size="sm" className="font-semibold">Get Started</Button>
            )}
            <HamburgerMenu navLinks={navLinks} />
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
