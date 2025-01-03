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

// Delete single book data
export const deleteBook = async (id) => {
  console.log(id);
  try {
    const res = await axios.delete(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/remove-book/${id}`
    );
    console.log(res);
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

// Delete single read/wish book
export const deleteRWList = async (which, bookId, email) => {
  try {
    const res = await axios.patch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/private/wish-read/remove-single-${which}?bookId=${bookId}&email=${email}`
    );
    return res;
  } catch (error) {
    console.log(error);
    return error;
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

// Fetches all books by an array of IDs
export const getBooksByIds = async (ids) => {
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/get-books-by-ids`,
      { ids }
    );
    return res.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

//Get All Books with pagination
export const getBooksByPage = async (size, page, hasfilter) => {
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/all-books/pagination?page=${page}&limit=${size}`,
      hasfilter
    );
    return res.data;
  } catch (error) {
    console.log(error);
    return {
      books: [],
      page: 1,
      totalPages: 0,
      totalBooks: 0,
    };
  }
};

// get lower price books
export const getLowerPriceBooks = async () => {
  try {
    const res = await axios(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/get-lower-price-books`
    );
    return res.data;
  } catch (error) {
    console.log(error);
    return [];
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

//Publication Name
//==================================

export const getPublicationName = async () => {
  try {
    const res = await axios(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/all-books/get-publication-name`
    );
    console.log(res.data.PublicationName);
    return res.data;
  } catch (error) {
    console.log(error);
    return {};
  }
};

export const getFilteredBooks = async (filters) => {
  try {
    const { genre, author, minPrice, maxPrice, startDate, endDate } = filters;
    const queryParams = new URLSearchParams();

    if (genre) queryParams.append("genre", genre);
    if (author) queryParams.append("author", author);
    if (minPrice) queryParams.append("minPrice", minPrice);
    if (maxPrice) queryParams.append("maxPrice", maxPrice);
    if (startDate) queryParams.append("startDate", startDate);
    if (endDate) queryParams.append("endDate", endDate);

    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/all-books/filter?${queryParams.toString()}`
    );

    // console.log(res.data.books);
    return res.data.books;
  } catch (error) {
    console.error("Error fetching filtered books:", error);
    return [];
  }
};
