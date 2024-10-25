import { connectDB } from "@/lib/connectDB";
import { NextResponse } from "next/server";

export const GET = async (request) => {
  const db = await connectDB();
  const couponCollection = db.collection("couponCode");

  const couponCode = request.nextUrl.searchParams.get("couponCode");

  if (!couponCode) {
    return NextResponse.json(
      { message: "Coupon code is required." },
      { status: 400 }
    );
  }

  try {
    const coupon = await couponCollection.findOne({ couponCode });

    if (!coupon) {
      return NextResponse.json(
        { message: "Invalid or expired coupon code." },
        { status: 404 }
      );
    }

    return NextResponse.json({ coupon });
  } catch (error) {
    console.error("Error fetching coupon code:", error);
    return NextResponse.json(
      { message: "Server error, please try again later." },
      { status: 500 }
    );
  }
};
