import { connectDB } from "@/lib/connectDB";
import { NextResponse } from "next/server";

export const PATCH = async (request, { params }) => {
  const db = await connectDB();
  const reviewAndRatingCollection = db.collection("reviewAndRating");
  const { email } = params;
  const bookId = request.nextUrl.searchParams.get("bookId");
  const updateReviewAndRating = await request.json();
  const user = await db.collection("users").findOne({ email });
  if (!user) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }

  try {
    const updateReviewAndRatingResult =
      await reviewAndRatingCollection.updateOne(
        { userId: user._id, bookId: bookId },
        { $set: updateReviewAndRating }
      );
    return NextResponse.json({
      message: "Review and Rating updated successfully",
      status: 200,
      updateReviewAndRatingResult,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
};
