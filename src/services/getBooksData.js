import axios from "axios";

// Fetches all books from the API
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

// Retrieves details of a specific book by its ID
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

// Gets the read/wish status of a book for a specific user
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

// Updates the read/wish list status for a book and user
export const patchRWList = async (which, bookId, email) => {
  try {
    const res = await axios.patch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/private/wish-read/${which}-toggle-update?bookId=${bookId}&email=${email}`
    );
    return res;
  } catch (error) {
    console.log(error);
    return error;
  }
};

// Fetches all books by an array of IDs
export const getBooksByIds = async (ids) => {
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/books-by-ids`,
      { ids }
    );
    return res.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};
