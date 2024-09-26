"use client"

import Link from "next/link";
import React, { useState, useEffect } from "react";
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
import ProductCart from "./ProductCart";

const Navbar = () => {
  const user = true;
  const [isCartOpen, setCartOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem("cartBooks")) || [];
    setCartCount(storedCartItems.length);
  }, []);

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
            <FaBookOpenReader className="text-foreground size-7 p-1.5 bg-primary rounded-sm" />
            <span className="text-xl font-serif font-semibold tracking-wide">
              Read Shop
            </span>
          </Link>

          <div>
            <ul className="hidden gap-5 text-foreground md:flex">{navLinks}</ul>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="relative" onClick={() => setCartOpen(true)}>
              <FaCartShopping className="size-7" />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 rounded-sm bg-primary text-black text-xs size-4 font-bold">
                  {cartCount}
                </span>
              )}
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

      {/* Cart Drawer */}
      <ProductCart isOpen={isCartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
};

export default Navbar;
