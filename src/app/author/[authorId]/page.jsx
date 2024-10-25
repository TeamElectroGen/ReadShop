import AuthorDetails from "@/page/AuthorDetails";

const Page = ({ params }) => {
  return <AuthorDetails authorId={params.authorId}></AuthorDetails>;
};

export default Page;
