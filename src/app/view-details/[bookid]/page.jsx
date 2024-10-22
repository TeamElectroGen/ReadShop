"use client";
import ViewDetails from "@/page/ViewDetails";

const Page = ({ params }) => {
  // console.log(params.bookid);
  return <ViewDetails bookid={params.bookid} />;
};

export default Page;
