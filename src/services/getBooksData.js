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

    return res.data;
  } catch (error) {
    console.log(error);
    return {};
  }
};

export const patchRWList = async (which, bookId, email) => {
  try {
    const res = await axios.patch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/private/wish-read/${which}-toggle-update?bookId=${bookId}&email=${email}`
    );
    console.log(res);
    return res;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const getWishlistBooks = async (email) => {
  try {
    const res = await axios(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/private/wish-read/all-wish-user?email=${email}`
    );
    return res.data;
  } catch (error) {
    console.log(error);
    return {};
  }
};

export const getReadListBooks = async (email) => {
  try {
    const res = await axios(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/private/wish-read/all-read-user?email=${email}`
    );
    return res.data;
  } catch (error) {
    console.log(error);
    return {};
  }
};