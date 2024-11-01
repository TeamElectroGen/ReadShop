import { connectDB } from "@/lib/connectDB";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export const DELETE = async (request, { params }) => {
  const db = await connectDB();
  // const booksCollection = await db.collection("books");
  const { bookId } = params;
  console.log(bookId);
  const query = { _id: new ObjectId(bookId) };

  try {
    const deleteResult = await db.collection("books").deleteOne(query);
    console.log(deleteResult);

    if (deleteResult.deletedCount !== 0) {
      return NextResponse.json({
        message: "Review and Rating deleted successfully",
        status: 200,
      });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Error deleting book!", error });
  }
};
