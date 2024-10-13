import { connectDB } from "@/lib/connectDB";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export const GET = async (request, { params }) => {
  const db = await connectDB();
  const { bookId } = params;
  const reviewAndRatingCollection = db.collection("reviewAndRating");
  const usersCollection = db.collection("users");
  if (!bookId) {
    return NextResponse.json({ message: "forbidden access!" });
  }

  try {
    let reviewAndRatingData = await reviewAndRatingCollection
      .find({ bookId })
      .toArray();

    // Add user information to each review
    reviewAndRatingData = await Promise.all(
      reviewAndRatingData.map(async (review) => {
        const user = await usersCollection.findOne({
          _id: new ObjectId(review.userId),
        });
        return {
          ...review,
          user: {
            name: user.name,
            email: user.email,
            image: user.image,
          },
        };
      })
    );
    return NextResponse.json({ reviewAndRatingData });
  } catch (error) {
    return NextResponse.json({ message: "Failed to get" });
  }
};
