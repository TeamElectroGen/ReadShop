"use client";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
// import { Button } from "./ui/button";
import { IoMdMenu } from "react-icons/io";

const HamburgerMenu = ({ navLinks }) => {
  return (
    <div>
      <Sheet>
        <SheetTrigger className="md:hidden border mt-1.5 rounded-sm border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground" size="icon">
          <IoMdMenu className="size-7" />
        </SheetTrigger>
        <SheetContent className="w-[300px]">
          {/* <SheetHeader>
            <SheetTitle>Title Here</SheetTitle>
            <SheetDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </SheetDescription>
          </SheetHeader> */}
          {navLinks}

          <p className="mt-5">Under construction</p>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default HamburgerMenu;
