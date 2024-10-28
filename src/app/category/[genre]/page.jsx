import BookOfCategory from "@/page/BookOfCategory";
export const generateMetadata = ({ params }) => {
  return {
    title: `${params.genre.split("%20").join(" ")} Books`,
    description: `Discover the best books in the ${params.genre.split("%20").join(" ")} category at readShop. Browse a curated selection of top titles, authors, and reviews to find your next great read.`,
    keywords: [
      `Discover the best books in the ${params.genre.split("%20").join(" ")} category at readShop. Browse a curated selection of top titles, authors, and reviews to find your next great read.`.split(
        " "
      ),
    ],
  };
};
const Page = ({ params }) => {
  // console.log(params);
  return <BookOfCategory genre={params} />;
};

export default Page;
