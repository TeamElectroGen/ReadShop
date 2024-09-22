import Link from "next/link";
import React from "react";
import { FaCartShopping, FaCircleUser } from "react-icons/fa6";
import { IoMdMenu } from "react-icons/io";

const Navbar = () => {
  return (
    <>
      <nav className="h-16 w-full bg-background">
        <div className="mx-auto flex h-full w-11/12 items-center justify-between">
          <div>
            <Link href={"/"} className="font-sans text-2xl font-bold">
              ReadShop
            </Link>
          </div>

          <div>
            <ul className="hidden gap-4 md:flex">
              <li>
                <Link href={"/"}>Home</Link>
              </li>
              <li>
                <Link href={"/about"}>About</Link>
              </li>
              <li>
                <Link href={"/contact-us"}>Contact Us</Link>
              </li>
            </ul>
          </div>
          <div className="hidden gap-2 md:flex">
            <button className="flex h-10 w-10 items-center justify-center rounded-md text-2xl">
              <FaCartShopping />
            </button>
            <button className="rounded-md bg-mediumGray-500 px-4 py-1 text-lightGray-100">
              Login
            </button>
          </div>

          {/* for mobile devices */}
          <div className="flex gap-3 text-[.1rem] md:hidden">
            <button className="flex h-10 w-10 items-center justify-center rounded-md text-2xl">
              <FaCartShopping />
            </button>
            <button className="flex h-10 w-10 items-center justify-center rounded-md text-2xl">
              <FaCircleUser />
            </button>
            <button className="flex h-10 w-10 items-center justify-center rounded-md text-2xl">
              <IoMdMenu />
            </button>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
