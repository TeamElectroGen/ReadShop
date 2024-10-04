"use client";
import ViewDetails from "@/page/ViewDetails";
import React from "react";

const Page = ({ params }) => {
  console.log(params.bookid);
  return <ViewDetails bookid={params.bookid} />;
};

export default Page;
