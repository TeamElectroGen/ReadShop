import Link from "next/link";
import React from "react";
import { FaBurger, FaCartShopping, FaCircleUser } from "react-icons/fa6";
import { IoMdMenu } from "react-icons/io";

const Navbar = () => {
  return (
    <>
      <nav className="w-full h-16 bg-background">
        <div className="flex items-center h-full w-11/12 justify-between mx-auto">
          <div>
            <Link href={'/'} className="font-sans font-bold text-2xl">ReadShop</Link>
          </div>

          <div>
            <ul className="hidden md:flex gap-4">
              <li><Link href={'/'}>Home</Link></li>
              <li><Link href={'/about'}>About</Link></li>
              <li><Link href={'/contact-us'}>Contact Us</Link></li>
            </ul>
          </div>
          <div className="hidden md:flex gap-2">
            <button className="text-2xl w-10 h-10 flex items-center justify-center rounded-md"><FaCartShopping /></button>
            <button className="text-lightGray-100 px-4 py-1 rounded-md bg-mediumGray-500">Login</button>
          </div>

          {/* for mobile devices */}
          <div className="md:hidden flex gap-3 text-[.1rem]">
            <button className="text-2xl flex justify-center items-center w-10 h-10 rounded-md"><FaCartShopping /></button>
            <button className="text-2xl flex justify-center items-center w-10 h-10 rounded-md"><FaCircleUser /></button>
            <button className="text-2xl flex justify-center items-center w-10 h-10 rounded-md"><IoMdMenu /></button>

          </div>
        </div>

      </nav>
    </>
  );
};

export default Navbar;
