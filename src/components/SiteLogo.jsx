import Link from "next/link";
import React from "react";
import { FaBookOpenReader } from "react-icons/fa6";

const SiteLogo = () => {
  return (
    <Link
      href={"/"}
      className="flex items-center gap-2 font-sans text-2xl font-bold"
    >
      <FaBookOpenReader className="size-7 rounded-sm bg-primary p-1.5 text-foreground" />
      <span className="font-serif text-xl font-semibold tracking-wide">
        Read Shop
      </span>
    </Link>
  );
};

export default SiteLogo;
