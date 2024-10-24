import ViewDetails from "@/page/ViewDetails";
export const generateMetadata = ({ params }) => {
  return {
    title: `Book Details | readShop - ${params?.bookid}`,
    description: `Explore in-depth details of the selected book (ID: ${params.bookid}) at readShop. Find information about the author, publication, reviews, and related books to enhance your reading journey.`,
  };
};
const Page = ({ params }) => {
  // console.log(params.bookid);
  return <ViewDetails bookid={params.bookid} />;
};

export default Page;
