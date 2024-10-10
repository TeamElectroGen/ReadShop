import axios from "axios";

// get user role
export const getUserRole = async (email) => {
  try {
    const res = await axios(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/get-user-role/${email}`
    );
    return res.data;
  } catch (error) {
    console.log(error);
    return {};
  }
};
