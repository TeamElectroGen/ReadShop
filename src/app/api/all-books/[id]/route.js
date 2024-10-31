import { connectDB } from "@/lib/connectDB";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export const GET = async (request, { params }) => {
  const db = await connectDB();
  const booksCollection = await db.collection("books");
  const reviewAndRatingCollection = await db.collection("reviewAndRating");
  const id = params.id;

  try {
    const bookDetails = await booksCollection.findOne({
      _id: new ObjectId(id),
    });

    const authorDetails = await db.collection("authors").findOne({
      _id: new ObjectId(bookDetails.authorId),
    });

    // Get review count
    const ReviewCount = await reviewAndRatingCollection.countDocuments({
      bookId: id,
    });

    // Get sum of ratings
    const ratingSum = await reviewAndRatingCollection
      .aggregate([
        { $match: { bookId: id } },
        { $group: { _id: null, totalRating: { $sum: "$rating" } } },
      ])
      .toArray();

    // Calculate average rating
    const averageRating =
      ReviewCount > 0 ? ratingSum[0]?.totalRating / ReviewCount : 0;

    await db
      .collection("books")
      .updateOne(
        { _id: new ObjectId(id) },
        { $set: { Rating: parseFloat(averageRating.toFixed(1)) } }
      );

    // Add reviewCount and rating to bookDetails
    const modifiedBookDetails = {
      ...bookDetails,
      AuthorName: authorDetails.name,
      ReviewCount,
      Rating: parseFloat(averageRating.toFixed(1)),
    };
    // console.log(bookDetails);
    return NextResponse.json({ bookDetails: modifiedBookDetails });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "No Data Found!", error });
  }
};
