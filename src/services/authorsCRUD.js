import axios from "axios";

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