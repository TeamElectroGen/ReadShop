"use client";

import Link from "next/link";
import React, { useState } from "react";
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
import { signOut, useSession } from "next-auth/react";
import ProductCart from "./ProductCart";
import UserMenu from "./UserMenu";
import { useCart } from "@/app/context/CartContext";
import { LogOutIcon } from "lucide-react";

const Navbar = () => {
  const { data } = useSession();
  const [isCartOpen, setCartOpen] = useState(false);

  const { cart } = useCart();

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
      <nav className="h-16 w-full">
        <div className="container flex h-full items-center justify-between">
          <Link
            href={"/"}
            className="flex items-center gap-2 font-sans text-2xl font-bold"
          >
            <FaBookOpenReader className="size-7 rounded-sm bg-primary p-1.5 text-foreground" />
            <span className="font-serif text-xl font-semibold tracking-wide">
              Read Shop
            </span>
          </Link>

          <div>
            <ul className="hidden gap-5 text-foreground md:flex">{navLinks}</ul>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="relative"
              onClick={() => setCartOpen(true)}
            >
              <FaCartShopping className="size-7" />
              {cart.length > 0 && (
                <span className="absolute right-0 top-0 size-4 rounded-sm bg-primary text-xs font-bold text-black">
                  {cart.length}
                </span>
              )}
            </Button>
            {data?.user ? (
              <>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      className="overflow-hidden rounded-full"
                    >
                      {data?.user?.photoURL ? (
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
                    <UserMenu />
                    <DropdownMenuItem onClick={() => signOut()} className="pl-3.5 cursor-pointer flex gap-2.5 text-red-600">
                      <LogOutIcon className="size-4" /> Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <Link href={"/login"}>
                <Button size="sm" className="font-semibold">
                  Get Started
                </Button>
              </Link>
            )}
            <HamburgerMenu navLinks={navLinks} />
          </div>
        </div>
      </nav>

      {/* Cart Drawer */}
      <ProductCart isOpen={isCartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
};

export default Navbar;
