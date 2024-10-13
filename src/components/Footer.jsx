"use client";

import Link from "next/link";
import React, { useState } from "react";
import {
  FaBookOpenReader,
  FaFacebook,
  FaInstagram,
  FaLocationArrow,
  FaXTwitter,
  FaYoutube,
} from "react-icons/fa6";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import toast, { Toaster } from "react-hot-toast";
import { usePathname } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getCategories } from "@/services/getBooksData";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(false);
  const pathName = usePathname();

  // Function to validate the email format
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Handle email input change
  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    setIsValidEmail(validateEmail(newEmail));
  };

  // Handle form submission
  const handleSubscribe = () => {
    if (isValidEmail) {
      console.log(`Subscribed email: ${email}`);
      toast.success("Subscribed successfully!");
      setEmail("");
    }
  };

  const { data: categoriesName } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const { categories } = await getCategories();
      return categories;
    },
  });

  if (pathName.includes("dashboard")) {
    return;
  }

  return (
    <footer className="w-full rounded-t-sm bg-secondary bg-opacity-20 pt-10">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 gap-4 text-accent-foreground md:grid-cols-3">
          {/* Logo and Address */}
          <div className="w-full">
            <div className="flex flex-col">
              <Link
                href={"/"}
                className="flex w-fit items-center gap-2 font-sans text-2xl font-bold"
              >
                <FaBookOpenReader className="size-7 rounded-sm bg-primary p-1.5 text-foreground" />
                <span className="font-serif text-xl font-semibold tracking-wide">
                  Read Shop
                </span>
              </Link>
              <div className="flex items-center gap-2 pt-2">
                <FaLocationArrow />
                <p>51/A, Kamal Ataturk Avenue, Dhaka-1218</p>
              </div>
            </div>
          </div>
          {/* Links */}
          <div className="w-full">
            <div className="grid grid-cols-2 text-sm">
              <div className="flex flex-col">
                <p className="pb-3 text-lg font-bold">Pages:</p>
                <span></span>
                <Link href={"/"} className="w-fit">
                  Home
                </Link>
                <Link href={"/about"} className="w-fit">
                  About
                </Link>
                <Link href={"/contact-us"} className="w-fit">
                  Contact us
                </Link>
                <span></span>
              </div>
              <div className="flex flex-col">
                <p className="pb-3 text-lg font-bold">Category:</p>
                {categoriesName
                  ?.slice(0, 7)
                  ?.sort(() => 0.5 - Math.random())
                  ?.map((categories, idx) => (
                    <Link
                      scroll={true}
                      href={`/category/${categories.Genre}`}
                      className="w-fit"
                      key={idx}
                    >
                      {categories.Genre}
                    </Link>
                  ))}
              </div>
            </div>
          </div>
          {/* Newsletter & Social */}
          <div className="w-full">
            <div className="mb-4 w-full rounded-md border px-5 pb-2">
              <h2 className="pt-5 text-center font-bold md:text-sm lg:text-lg">
                Subscribe to get our{" "}
                <span className="text-red-600">Newsletter</span> weekly!
              </h2>
              <p className="pb-5 text-center text-xs">
                We don&apos;t send any spam mail, your email will be safe with
                us!
              </p>
              <div className="flex flex-col rounded-sm border px-0.5 py-0.5 md:px-0 md:py-0 lg:flex-row">
                <Input
                  placeholder="Email"
                  className="w-full rounded-b-none rounded-l-sm border-none focus:border-none focus:outline-none md:rounded-r-none md:rounded-bl-sm"
                  value={email}
                  onChange={handleEmailChange}
                />
                <Button
                  className="rounded-t-none bg-primary md:rounded-l-none md:rounded-tr-sm"
                  onClick={handleSubscribe}
                  disabled={!isValidEmail}
                >
                  Subscribe
                </Button>
              </div>
            </div>
            <div className="flex items-center justify-center gap-4 lg:justify-start">
              <p className="">Follow Us:</p>
              <div className="flex gap-4 text-xl">
                <Link href={""}>
                  <FaFacebook />
                </Link>
                <Link href={""}>
                  <FaInstagram />
                </Link>
                <Link href={""}>
                  <FaYoutube />
                </Link>
                <Link href={""}>
                  <FaXTwitter />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-3 flex items-center justify-center bg-primary py-2 text-xs text-secondary-foreground">
        <p>
          Copyright © {new Date().getFullYear()} by{" "}
          <Link href={"/"} className="underline">
            Readshop Inc.
          </Link>
        </p>
      </div>
      <Toaster />
    </footer>
  );
};

export default Footer;
