"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
// import { Button } from "./ui/button";
import { IoMdMenu } from "react-icons/io";
import SiteLogo from "./SiteLogo";
import MenuItem from "./MenuItem";
import { HomeIcon, PhoneIcon, StoreIcon } from "lucide-react";

const HamburgerMenu = () => {
  return (
    <div>
      <Sheet>
        <SheetTrigger
          className="mt-1.5 rounded-sm border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground md:hidden"
          size="icon"
        >
          <IoMdMenu className="size-7" />
        </SheetTrigger>
        <SheetContent className="w-[300px]">
          <SheetHeader>
            <SheetTitle>
              <SiteLogo />
            </SheetTitle>
          </SheetHeader>
          <div className="grid gap-4 py-4 mt-3 text-sm">
            <MenuItem href="/" title="Home" icon={HomeIcon} />
            <MenuItem href="/about" title="About" icon={StoreIcon} />
            <MenuItem href="/contact-us" title="Contact Us" icon={PhoneIcon} />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default HamburgerMenu;
