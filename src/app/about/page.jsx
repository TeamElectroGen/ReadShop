import About from "@/page/About";

export const generateMetadata = () => {
  return {
    title: "About Us",
    description:
      "Learn more about ReadShop, your trusted destination for discovering, reading, and purchasing your favorite books. Explore our mission, vision, and values.",
    keywords: [
      "about us",
      "about ReadShop",
      "book discovery",
      "trusted bookstore",
      "online bookstore",
    ],
  };
};

const Page = () => {
  return (
    <>
      <About />
    </>
  );
};

export default Page;
