import axios from "axios";

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
