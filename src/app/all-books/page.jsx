import AllBooks from "@/page/AllBooks";
export const generateMetadata = () => {
  return {
    title: "All Books",
    description:
      "Browse through the extensive collection of books available at readShop. Find books across various genres, authors, and categories to satisfy your reading cravings.",
  };
};

const page = () => {
  return <AllBooks />;
};

export default page;
