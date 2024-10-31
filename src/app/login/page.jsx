import Login from "@/page/Login";
export const generateMetadata = () => {
  return {
    title: "Login -Join Our Book Community",
    description:
      "Log in to your ReadShop account to continue exploring a world of books, manage your wishlist, and discover new arrivals and offers tailored just for you. Secure your reading journey today!",
  };
};

const Page = () => {
  return <Login />;
};

export default Page;
