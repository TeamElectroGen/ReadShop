import axios from "axios";

// get all users
export const getUsers = async () => {
  try {
    const res = await axios(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/users`
    );
    return res.data;
  } catch (error) {
    console.log(error);
    return {};
  }
};

// get user role
export const getUserRole = async (email) => {
  try {
    const res = await axios(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/private/get-user-role/${email}`
    );
    return res.data;
  } catch (error) {
    console.log(error);
    return {};
  }
};

// get user data
export const getUser = async (email) => {
  try {
    const res = await axios(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/private/user/${email}`
    );
    return res.data;
  } catch (error) {
    console.log(error);
    return {};
  }
};

// update user info
export const updateProfile = async (userId, data) => {
  try {
    const res = await axios.patch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/private/my-profile-update/${userId}`,
      data
    );
    return res.data;
  } catch (error) {
    return error;
  }
};
