"use client";

import Link from "next/link";
import React, { useState } from "react";
import { FaBookOpenReader, FaFacebook, FaInstagram, FaLocationArrow, FaXTwitter, FaYoutube } from "react-icons/fa6";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import toast, { Toaster } from "react-hot-toast";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(false);

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
    }
  };

  return (
    <footer className="w-full bg-secondary pt-10 rounded-t-sm -mt-2">
      <div className="mx-auto w-11/12 md:container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-accent-foreground">
          {/* Logo and Address */}
          <div className="w-full">
            <div className="flex flex-col">
              <Link
                href={"/"}
                className="flex items-center gap-2 font-sans text-2xl font-bold"
              >
                <FaBookOpenReader className="text-foreground size-7 p-1.5 bg-primary rounded-sm" />
                <span className="text-xl font-serif font-semibold tracking-wide">
                  Read Shop
                </span>
              </Link>
              <div className="pt-2 flex items-center gap-2">
                <FaLocationArrow />
                <p>51/A, Kamal Ataturk Avenue, Dhaka-1218</p>
              </div>
            </div>
          </div>
          {/* Links */}
          <div className="w-full">
            <div className="grid grid-cols-2 text-sm">
              <div className="flex flex-col">
                <p className="text-lg font-bold pb-3">Pages:</p>
                <span></span>
                <Link href={'/'} className="w-fit">Home</Link>
                <Link href={'/about'} className="w-fit">About</Link>
                <Link href={'/contact-us'} className="w-fit">Contact us</Link>
                <Link href={''} className="w-fit">Page 4</Link>
                <Link href={''} className="w-fit">Page 5</Link>
                <Link href={''} className="w-fit">Page 6</Link>
                <Link href={''} className="w-fit">Page 7</Link>
                <span></span>
              </div>
              <div className="flex flex-col">
                <p className="text-lg font-bold pb-3">Category:</p>
                <Link href={''} className="w-fit">Page 1</Link>
                <Link href={''} className="w-fit">Page 2</Link>
                <Link href={''} className="w-fit">Page 3</Link>
                <Link href={''} className="w-fit">Page 4</Link>
                <Link href={''} className="w-fit">Page 5</Link>
              </div>
            </div>
          </div>
          {/* Newsletter & Social */}
          <div className="w-full">
            <div className="border px-5 pb-2 rounded-md w-full mb-4">
              <h2 className="md:text-sm lg:text-lg font-bold pt-5 text-center">
                Subscribe to get our <span className="text-accent-foreground">Newsletter</span> weekly!
              </h2>
              <p className="text-xs text-center pb-5">We don't send any spam mail, your email will be safe with us!</p>
              <div className="flex flex-col lg:flex-row border rounded-md py-0.5 px-0.5">
                <Input
                  placeholder="Email"
                  className="border-none"
                  value={email}
                  onChange={handleEmailChange}
                />
                <Button
                  className="bg-yellow-600"
                  onClick={handleSubscribe}
                  disabled={!isValidEmail}
                >
                  Subscribe
                </Button>
              </div>
            </div>
            <div className="flex gap-4 items-center justify-center lg:justify-start">
              <p className="">Follow Us:</p>
              <div className="flex gap-4 text-xl">
                <Link href={''}><FaFacebook /></Link>
                <Link href={''}><FaInstagram /></Link>
                <Link href={''}><FaYoutube /></Link>
                <Link href={''}><FaXTwitter /></Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-3 flex items-center justify-center bg-primary py-2 text-xs text-secondary-foreground">
        <p>
          Copyright © {new Date().getFullYear()} by{" "}
          <Link href={'/'} className="underline">
            Readshop Inc.
          </Link>
        </p>
      </div>
      <Toaster />
    </footer>
  );
};

export default Footer;
