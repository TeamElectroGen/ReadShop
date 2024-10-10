"use client";
import BookOfCategory from "@/page/BookOfCategory";
import React from "react";

const Page = ({ params }) => {
  // console.log(params);
  return <BookOfCategory genre={params} />;
};

export default Page;
