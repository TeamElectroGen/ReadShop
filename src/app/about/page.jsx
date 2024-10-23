import About from "@/page/About";
import React from "react";

export const generateMetadata = () => {
  return {
    title: "About Us | readShop - Your Trusted Bookstore",
    description:
      "Learn more about readShop, your trusted destination for discovering, reading, and purchasing your favorite books. Explore our mission, vision, and values.",
  };
};

const Page = () => {
  return (
    <>
      <About />
    </>
  );
};

export default Page;
