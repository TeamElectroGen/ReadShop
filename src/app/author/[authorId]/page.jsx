import AuthorDetails from "@/page/AuthorDetails";
import React from "react";

const Page = ({ params }) => {
  return <AuthorDetails authorId={params.authorId}></AuthorDetails>;
};

export default Page;
