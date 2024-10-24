import SignUp from "@/page/SignUp";
export const generateMetadata = () => {
  return {
    title: "Sign Up | readShop - Join Our Book Community",
    description:
      "Create a readShop account to explore a world of books, manage your wishlist, and stay updated with new arrivals and offers. Join our community today!",
  };
};

const Page = () => {
  return <SignUp />;
};

export default Page;
