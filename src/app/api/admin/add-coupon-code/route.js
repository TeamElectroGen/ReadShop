import { connectDB } from "@/lib/connectDB";
import { NextResponse } from "next/server";

export const POST = async (request) => {
  const db = await connectDB();
  const data = await request.json();
  const couponCollection = db.collection("couponCode");
  if (!data) {
    return NextResponse.json(
      { message: "Promo code and total amount are required." },
      { status: 400 }
    );
  }

  try {
    const res = await couponCollection.insertOne({ ...data });
    return NextResponse.json({
      message: "Coupon code added successfully.",
      ...res,
    });
  } catch (error) {
    console.error("Error validating promo code:", error);
    return NextResponse.json(
      { message: "Server error, please try again later." },
      { status: 500 }
    );
  }
};
