import axios from "axios";

export const getAllBooks = async () => {
  try {
    const res = await axios(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/all-books`
    );
    return res.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getBookDetails = async (id) => {
  try {
    const res = await axios(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/all-books/${id}`
    );
    return res.data;
  } catch (error) {
    console.log(error);
    return {};
  }
};

export const getReadWishStatusUser = async (bookId, email) => {
  try {
    const res = await axios(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/private/wish-read?bookId=${bookId}&email=${email}`
    );
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.log(error);
    return {};
  }
};
