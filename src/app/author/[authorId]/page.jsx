import AuthorDetails from "@/page/AuthorDetails";
export const generateMetadata = () => {
  return {
    title: "Authors",
    description:
      "Discover the authors behind your favorite books at ReadShop. Explore author profiles, their works, and their journey in the literary world.",
  };
};

const Page = ({ params }) => {
  return <AuthorDetails authorId={params.authorId}></AuthorDetails>;
};

export default Page;
