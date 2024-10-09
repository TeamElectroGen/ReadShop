import { connectDB } from "@/lib/connectDB";
import { NextResponse } from "next/server";

export const POST = async (request, { params }) => {
  const db = await connectDB();
  const { email } = params;
  const reviewAndRatingCollection = db.collection("reviewAndRating");
  const reviewAndRatingData = await request.json();
  const user = await db.collection("users").findOne({ email });

  if (!email) {
    return NextResponse.json({ message: "forbidden access!" });
  }
  try {
    await reviewAndRatingCollection.insertOne({
      ...reviewAndRatingData,
      userId: user._id,
    });
    return NextResponse.json({
      message: "Review and Rating successfully added!",
    });
  } catch (error) {
    return NextResponse.json({ message: "Failed to add" });
  }
};
