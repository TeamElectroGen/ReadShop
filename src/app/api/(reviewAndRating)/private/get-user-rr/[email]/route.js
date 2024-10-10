import { connectDB } from "@/lib/connectDB";
import { NextResponse } from "next/server";

export const GET = async (request, { params }) => {
  const db = await connectDB();
  const { email } = params;
  const bookId = request.nextUrl.searchParams.get("bookId");
  const reviewAndRatingCollection = db.collection("reviewAndRating");
  const user = await db.collection("users").findOne({ email });
  console.log(user._id, bookId);
  if (!email) {
    return NextResponse.json({ message: "forbidden access!" });
  }
  try {
    const reviewAndRatingData = await reviewAndRatingCollection.findOne({
      userId: user._id,
      bookId: bookId,
    });
    return NextResponse.json({ reviewAndRatingData });
  } catch (error) {
    return NextResponse.json({ message: "Failed to get" });
  }
};
