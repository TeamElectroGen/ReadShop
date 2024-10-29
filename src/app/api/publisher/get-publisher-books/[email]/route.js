import { connectDB } from "@/lib/connectDB";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
  const db = await connectDB();
  const { email } = params;
  const publisherCollection = db.collection("users");
  const bookCollection = db.collection("books");
  const publisher = await publisherCollection.findOne({ email });
  if (!publisher) {
    return NextResponse.json({
      success: false,
      message: "Publisher not found",
    });
  }
  const publisherId = publisher._id.toString();
  try {
    const books = await bookCollection
      .find({ PublicationId: publisherId })
      .toArray();
    return NextResponse.json({
      success: true,
      message: "Books fetched successfully",
      books,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Error fetching books",
      error,
    });
  }
};
