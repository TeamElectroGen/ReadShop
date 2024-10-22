"use client";
import BookOfCategory from "@/page/BookOfCategory";

const Page = ({ params }) => {
  // console.log(params);
  return <BookOfCategory genre={params} />;
};

export default Page;
