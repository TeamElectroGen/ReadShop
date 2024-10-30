import AuthorDetails from "@/page/AuthorDetails";
export const generateMetadata = () => {
  return {
    title: "Authors - Meet Your Favorite Writers",
    description:
      "Discover the authors behind your favorite books at readShop. Explore author profiles, their works, and their journey in the literary world.",
  };
};

const Page = ({ params }) => {
  return <AuthorDetails authorId={params.authorId}></AuthorDetails>;
};

export default Page;
