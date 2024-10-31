import { connectDB } from "@/lib/connectDB";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export const DELETE = async (request) => {
  const db = await connectDB();
  const booksCollection = await db.collection("books");
  const params = request.nextUrl.searchParams;
  const bookId = params.get("bookId");

  try {
    await booksCollection.deleteOne({ _id: new ObjectId(bookId) });
    return NextResponse.json({ message: "Removed from inventory " });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Error deleting book!", error });
  }
};
