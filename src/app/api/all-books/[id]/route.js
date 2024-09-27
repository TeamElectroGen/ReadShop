import { connectDB } from "@/lib/connectDB";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export const GET = async (request, { params }) => {
  const db = await connectDB();
  const booksCollection = await db.collection("books");
  try {
    const bookDetails = await booksCollection.findOne({
      _id: new ObjectId(params.id),
    });
    console.log(bookDetails);
    return NextResponse.json({ bookDetails });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "No Data Found!", error });
  }
};