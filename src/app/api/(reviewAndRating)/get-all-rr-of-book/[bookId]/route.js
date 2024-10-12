import { connectDB } from "@/lib/connectDB";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export const GET = async (request, { params }) => {
  const db = await connectDB();
  const { bookId } = params;
  const reviewAndRatingCollection = db.collection("reviewAndRating");
  if (!bookId) {
    return NextResponse.json({ message: "forbidden access!" });
  }
    // TODO: get single user data and insert it in the reviewAndRatingData for dynamic user info.
  try {
    const reviewAndRatingData = await reviewAndRatingCollection
      .find({ bookId })
      .toArray();
    return NextResponse.json({ reviewAndRatingData });
  } catch (error) {
    return NextResponse.json({ message: "Failed to get" });
  }
};
