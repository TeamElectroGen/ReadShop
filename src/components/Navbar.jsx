import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <>
      <nav className="w-full h-16 bg-background">
        <div className="flex items-center h-full w-11/12 justify-between mx-auto">
          <div>
            <button className="font-sans font-bold text-2xl">ReadShop</button>
          </div>

          <div>
            <ul className="hidden md:flex gap-4">
              <li><Link href={'/'}>Home</Link></li>
              <li><Link href={'/about'}>About</Link></li>
              <li><Link href={'/contact-us'}>Contact Us</Link></li>
            </ul>
          </div>
          <div className="hidden md:flex gap-2">
            <button className="bg-primary/30 text-xs border w-10 h-10 rounded-md">Cart</button>
            <button className="text-lightGray-100 px-4 py-1 rounded-md bg-primary">Login</button>
          </div>
          <div className="md:hidden flex gap-3 text-[.1rem]">
            <button className="bg-primary/30 text-xs border w-10 h-10 rounded-md">Cart</button>
            <button className="bg-primary/30 text-xs border w-10 h-10 rounded-md">Profile</button>
            <button className="bg-primary/30 text-xs border w-10 h-10 rounded-md">Menu</button>

          </div>
        </div>

      </nav>
      <div className="hidden">
        <div className="bg-gray-200">
          {/* Navbar */}
          <nav className="flex items-center justify-between bg-gray-800 px-6">
            <div className="text-xl text-white">Logo</div>
            <div className="flex items-center">
              <div className="ml-4 h-8 w-8 bg-purple-400"></div>
              <div className="ml-4 h-8 w-8 rounded-full bg-orange-400"></div>
            </div>
          </nav>

          {/* Search Bar */}
          <div className="bg-gray-500 py-4">
            <div className="flex justify-center gap-2">
              <div>
                <input
                  className="rounded-sm p-1"
                  type="text"
                  placeholder="Search book"
                />
              </div>
              <button className="rounded-sm bg-orange-400 p-1 font-bold">
                Search
              </button>
            </div>
          </div>
          {/*Section*/}
          <section>
            <h1 className="text-center font-bold">All Books</h1>
          </section>
        </div>
      </div>
    </>
  );
};

export default Navbar;
