import axios from "axios";

// get authors name
export const authorName = async () => {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/authors/get-author-name`
    );
    return res.data;
  } catch (error) {
    return {};
  }
};
// toggle follow author
export const authorToggleFollow = async (authorId, userId) => {
  try {
    const res = await axios.patch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/private/author-toggle-follow/${authorId}`,
      { userId }
    );
    return res.data;
  } catch (error) {
    return {};
  }
};

// get follow status of user
export const followStatusForUser = async (authorId, userId) => {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/private/follow-status-user/${authorId}?userId=${userId}`
    );
    return res.data;
  } catch (error) {
    return {};
  }
};

// get specific author books
export const getAuthorBooks = async (authorId) => {
  try {
    const res = await axios(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/author-books/${authorId}`
    );
    return res.data;
  } catch (error) {
    return [];
  }
};
