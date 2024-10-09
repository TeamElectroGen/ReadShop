"use client"

import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import React from "react";

const LogoutButton = () => {
  return (
    <button
      onClick={() => signOut()}
      className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground"
    >
      <LogOut className="size-4" /> Logout
    </button>
  );
};

export default LogoutButton;
