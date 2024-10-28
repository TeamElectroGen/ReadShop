import axios from "axios";

// post book data to database
export const postBookData = async (email, bookData) => {
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/publisher/publish-book/${email}`,
      bookData
    );
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
