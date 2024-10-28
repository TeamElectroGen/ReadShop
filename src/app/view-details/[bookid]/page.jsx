import ViewDetails from "@/page/ViewDetails";
import { getBookDetails } from "@/services/getBooksData";
export const generateMetadata = async ({ params }) => {
  const { bookDetails } = await getBookDetails(params.bookid);

  return {
    title: `${bookDetails?.BookName}`,
    description: `${bookDetails?.Description}`,
    keywords: [bookDetails?.Description?.split(" ")],
  };
};
const Page = ({ params }) => {
  // console.log(params.bookid);
  return <ViewDetails bookid={params.bookid} />;
};

export default Page;
