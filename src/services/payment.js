import axios from "axios";

// post payment data to the database
export const postPaymentData = async (paymentInfo) => {
  try {
    const res = axios.post(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/checkout/api/post-payment`,
      paymentInfo
    );
    return res.data;
  } catch (error) {
    return error;
  }
};
