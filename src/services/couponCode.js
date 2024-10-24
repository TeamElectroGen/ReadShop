import axios from "axios";

// post API for promo code validation
export const postCouponCode = async (data) => {
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/add-coupon-code`,
      data
    );
    return res.data;
  } catch (error) {
    console.log(error);
    return {};
  }
};

// get coupon data
export const getCouponCode = async (coupon) => {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/private/get-coupon-data?couponCode=${coupon}`
    );
    return res.data;
  } catch (error) {
    console.log("Error fetching coupon code:", error);
    return {};
  }
};
