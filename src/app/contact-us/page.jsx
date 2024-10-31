import ContactUs from "@/page/ContactUs";

export const generateMetadata = () => {
  return {
    title: "Contact Us",
    description:
      "Get in touch with ReadShop for any queries, support, or feedback. We're here to assist you with your book discovery and shopping experience. Reach out to us today!",
    keywords: [
      "contact us",
      "support",
      "feedback",
      "queries",
      "book discovery",
      "shopping experience",
      "book",
    ],
  };
};

const Page = () => {
  return (
    <>
      <ContactUs />
    </>
  );
};

export default Page;
