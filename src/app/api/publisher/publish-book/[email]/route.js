import { connectDB } from "@/lib/connectDB";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export const POST = async (request, { params }) => {
  const db = await connectDB();
  const bookData = await request.json();
  const authorCollection = db.collection("authors");
  const bookCollection = db.collection("books");
  const userCollection = db.collection("users");
  const { email } = params;
  const publisher = await userCollection.findOne({ email });

  if (!publisher) {
    return NextResponse.json({
      success: false,
      message: "Publisher not found",
    });
  }

  const { name: AuthorName } = await authorCollection.findOne({
    _id: new ObjectId(bookData.authorId),
  });
  const PublicationId = publisher._id.toString();

  try {
    const response = await bookCollection.insertOne({
      ...bookData,
      AuthorName,
      PublicationId,
      isApproved: false,
      Price: parseFloat(bookData.Price),
      PublishDate: new Date(),
      Rating: 0,
    });
    return NextResponse.json({
      success: true,
      message: "Book published successfully",
      response,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: "Error publishing book",
      error: error.message,
    });
  }
};
