import axios from "axios";

// ================================ Books ================================

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

//fetches newly added books from the API
export const getNewlyAddedBooks = async () => {
  try {
    const res = await axios(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/newly-added-books`
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

// Fetches search results books.
export const getSearchBooks = async (q) => {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/search?q=${q}`
    );
    return res.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

// Fetch wishlist books for user
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

// Fetch readList books for user
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

// Fetch all unique categories
export const getCategories = async () => {
  try {
    const res = await axios(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/get-categories`
    );
    return res.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

// Fetch books by a specific category with pagination
export const getBooksByCategory = async (category, size, page) => {
  try {
    const res = await axios(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/get-books-by-category/${category}?size=${size}&page=${page}`
    );
    return res.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

// get  count of books by category
export const getCategoryCount = async (category) => {
  try {
    const res = await axios(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/get-specific-category-count/${category}`
    );
    return res.data;
  } catch (error) {
    console.log(error);
    return {};
  }
};

// ============================= Author ================================

// Fetch All Authors
export const getAuthors = async () => {
  try {
    const res = await axios(`${process.env.NEXT_PUBLIC_BASE_URL}/api/authors`);
    return res.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

// Fetch Author by id
export const getAuthorById = async (id) => {
  try {
    const res = await axios(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/authors/${id}`
    );
    return res.data;
  } catch (error) {
    console.log(error);
    return {};
  }
};
