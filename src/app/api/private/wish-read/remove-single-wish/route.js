import { connectDB } from "@/lib/connectDB";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export const PATCH = async (request) => {
  const db = await connectDB();
  const booksCollection = await db.collection("books");
  const params = request.nextUrl.searchParams;
  const bookId = params.get("bookId");
  const userEmail = params.get("email");

  try {
    await booksCollection.updateOne(
      { _id: new ObjectId(bookId) },
      { $pull: { wishList: userEmail } }
    );
    return NextResponse.json({ message: "removed from wishList " });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "No Data Found!", error });
  }
};
