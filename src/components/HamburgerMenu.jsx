"use client"

import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "./ui/button";
import { IoMdMenu } from "react-icons/io";

const HamburgerMenu = ({navLinks}) => {
  return (
    <div>
      <Sheet>
        <SheetTrigger>
          <Button className="md:hidden" variant="outline" size="icon">
            <IoMdMenu className="size-6" />
          </Button>
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
