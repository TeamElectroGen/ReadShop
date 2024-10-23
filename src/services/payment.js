import axios from "axios";

// post payment data to the database
export const postPaymentData = async (paymentInfo) => {
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/checkout/api/post-payment`,
      paymentInfo
    );
    return res.data;
  } catch (error) {
    return error;
  }
};

// get order history for user
export const getOrderHistoryOfUser = async (email) => {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/private/get-order-history/${email}`
    );
    return res.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

// get order history for admin
export const getAllOrders = async () => {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/order-history`
    );
    return res.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};
