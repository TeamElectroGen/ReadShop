"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaCircleUser } from "react-icons/fa6";
import { FaBookOpenReader } from "react-icons/fa6";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import HamburgerMenu from "./HamburgerMenu";
import { useSession } from "next-auth/react";
import ProductCart from "./ProductCart";
import UserMenu from "./UserMenu";
// import { useCart } from "@/app/context/CartContext";
import dynamic from "next/dynamic";
import useScrollPosition from "@/hooks/useScrollPosition";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import AdminMenu from "./AdminMenu";
import PublisherMenu from "./PublisherMenu";
import { getUserRole } from "@/services/getUserData";

const DynamicCartButton = dynamic(() => import("./CartButton"), { ssr: false });

const Navbar = () => {
  const { data } = useSession() || {};
  const [isCartOpen, setCartOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const scrollPosition = useScrollPosition();
  const pathName = usePathname();
  const [role, setRole] = useState("");
  // const role = "publisher";

  useEffect(() => {
    if (data?.user?.email) {
      const getRole = async () => {
        const { role } = await getUserRole(data?.user?.email);
        console.log(role);
        setRole(role);
      };
      getRole();
    }
    setIsClient(true);
  }, [data?.user?.email]);
  // const { cart } = useCart();

  const navLinks = (
    <>
      <li>
        <Link
          href={"/"}
          className={cn(
            "transition-all hover:text-primary/80",
            pathName === "/"
              ? "border-b-2 border-yellow-300 pb-2 font-bold text-primary"
              : "text-foreground/60"
          )}
        >
          Home
        </Link>
      </li>
      <li>
        <Link
          href={"/about"}
          className={cn(
            "transition-all hover:text-primary/80",
            pathName === "/about"
              ? "border-b-2 border-yellow-300 pb-1 font-bold text-primary"
              : "text-foreground/60"
          )}
        >
          About
        </Link>
      </li>
      <li>
        <Link
          href={"/contact-us"}
          className={cn(
            "transition-all hover:text-primary/80",
            pathName === "/contact-us"
              ? "border-b-2 border-yellow-300 pb-1 font-bold text-primary"
              : "text-foreground/60"
          )}
        >
          Contact Us
        </Link>
      </li>
    </>
  );

  if (pathName.includes("dashboard")) {
    return;
  }

  return (
    <>
      <header
        className={`sticky top-0 z-50 h-16 w-full border-border/40 ${scrollPosition > 0 && "bg-background/80 backdrop-blur supports-[backdrop-blur]:bg-background/60"}`}
      >
        <div className="container z-50 flex h-full items-center justify-between">
          <Link
            href={"/"}
            className="flex items-center gap-2 font-sans text-2xl font-bold"
          >
            <FaBookOpenReader className="size-7 rounded-sm bg-primary p-1.5 text-foreground" />
            <span className="font-serif text-xl font-semibold tracking-wide">
              Read Shop
            </span>
          </Link>

          <nav>
            <ul className="text-md hidden gap-4 md:flex md:items-center md:justify-center lg:gap-6">
              {navLinks}
            </ul>
          </nav>
          <div className="flex items-center gap-3">
            {isClient && (
              <DynamicCartButton onClick={() => setCartOpen(true)} />
            )}
            {data?.user ? (
              <>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      className="overflow-hidden rounded-full"
                    >
                      {data?.user?.image ? (
                        <Image
                          src={data.user.image}
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
                      {role === "user" && <UserMenu />}
                      {role === "admin" && <AdminMenu />}
                      {role === "publisher" && <PublisherMenu />}
                    </nav>
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
      </header>

      {/* Cart Drawer */}
      <ProductCart isOpen={isCartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
};

export default Navbar;
