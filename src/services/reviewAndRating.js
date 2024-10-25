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

// get review and rating api for user
export const getUserReviewAndRating = async (email, bookId) => {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/private/get-user-rr/${email}?bookId=${bookId}`
    );
    return res.data;
  } catch (error) {
    console.log(error);
    return {};
  }
};

// get review and rating api for book
export const getBookReviewAndRating = async (bookId) => {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/get-all-rr-of-book/${bookId}`
    );
    return res.data;
  } catch (error) {
    console.log(error);
    return {};
  }
};

// PATCH API for updating review and rating
export const patchUpdateReviewAndRating = async (
  email,
  bookId,
  reviewAndRating
) => {
  try {
    const res = await axios.patch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/private/update-user-rr/${email}?bookId=${bookId}`,
      reviewAndRating
    );
    return res.data;
  } catch (error) {
    console.log("Error updating review and rating:", error);
    return { message: "Failed to update review and rating", error };
  }
};

// patch api for deleting review and rating
export const deleteUserReviewAndRating = async (email, bookId) => {
  try {
    const res = await axios.delete(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/private/delete-user-rr/${email}?bookId=${bookId}`
    );
    return res.data;
  } catch (error) {
    console.error("Error deleting review and rating:", error);
    return { message: "Failed to delete review and rating", error };
  }
};
