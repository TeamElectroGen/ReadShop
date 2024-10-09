import axios from "axios";

// post api for review and rating
export const postReviewAndRating = async (email, bookId, reviewAndRating) => {
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/private/post-api-rr/${email}?bookId=${bookId}`,
      reviewAndRating
    );
    return res.data;
  } catch (error) {
    console.log(error);
    return {};
  }
};
