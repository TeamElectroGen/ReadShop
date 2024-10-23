import ContactUs from "@/page/ContactUs";

export const generateMetadata = () => {
  return {
    title: "Contact Us | readShop - We're Here to Help",
    description:
      "Get in touch with readShop for any queries, support, or feedback. We're here to assist you with your book discovery and shopping experience. Reach out to us today!",
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
