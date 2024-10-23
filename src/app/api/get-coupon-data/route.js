// import { connectDB } from "@/lib/connectDB";
// import { NextResponse } from "next/server";

// export const GET = async (request) => {
//   const db = await connectDB();
//   const couponCollection = db.collection("couponCode");
//   const coupon = request.nextUrl.searchParams.get("Readbook");

//   // const data = await couponCollection.find({}).toArray();
//   // return NextResponse.json({ data });

//   try{
//     const couponCode = await couponCollection.findOne({ couponCode: coupon });
//     return NextResponse.json({ couponCode });
//   }catch(error){
//     console.log(error);
//     return NextResponse.json({ message: "No Data Found!", error });
//   }
//   // try {
//   //   const coupon = await couponCollection.find({}).toArray();
//   //   return NextResponse.json({ coupon });
//   // } catch (error) {
//   //   console.log(error);
//   //   return NextResponse.json({ message: "No Data Found!", error });
//   // }
// };

import { connectDB } from "@/lib/connectDB";
import { NextResponse } from "next/server";

export const GET = async (request) => {
  const db = await connectDB();
  const couponCollection = db.collection("couponCode");

  // Get couponCode from query parameters
  const couponCode = request.nextUrl.searchParams.get("couponCode");
  // const couponCode = request.nextUrl.searchParams.get("ReaDbook");
  // const { searchParams } = new URL(request.url);
  // const couponCode = searchParams.get("couponCode");

  // Check if couponCode is provided
  if (!couponCode) {
    return NextResponse.json(
      { message: "Coupon code is required." },
      { status: 400 }
    );
  }

  try {
    // Find coupon code in the database
    const coupon = await couponCollection.findOne({ couponCode });

    // If coupon is not found, return 404 error
    if (!coupon) {
      return NextResponse.json(
        { message: "Invalid or expired coupon code." },
        { status: 404 }
      );
    }

    // Return the coupon code details if found
    return NextResponse.json({ coupon });

    // return NextResponse.json({
    //   message: "Coupon code found.",
    //   couponCode: coupon.couponCode,
    //   discount: coupon.discount,
    //   addedDate: coupon.addedDate,
    // });
  } catch (error) {
    console.error("Error fetching coupon code:", error);
    return NextResponse.json(
      { message: "Server error, please try again later." },
      { status: 500 }
    );
  }
};
