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
