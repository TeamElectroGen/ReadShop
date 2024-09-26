import { connectDB } from "@/lib/connectDB";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export const GET = async (request) => {
  const db = await connectDB();
  const booksCollection = await db.collection("books");
  const params = request.nextUrl.searchParams;
  const bookId = params.get("bookId");
  const userEmail = params.get("email");

  try {
    const book = await booksCollection.findOne({ _id: new ObjectId(bookId) });
    if (book) {
      const wishList = book?.wishList?.find((e) => e === userEmail);
      const readList = book?.readList?.find((e) => e === userEmail);

      return NextResponse.json({ readList: !!readList, wishList: !!wishList });
    }
    return NextResponse.json({ message: "No Data Found!" });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "No Data Found!", error });
  }
};
