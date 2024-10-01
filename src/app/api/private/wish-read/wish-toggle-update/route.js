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
    const book = await booksCollection.findOne({
      _id: new ObjectId(bookId),
    });
    const isExist = book?.wishList?.find((e) => e === userEmail);
    if (!isExist) {
      await booksCollection.updateOne(
        { _id: new ObjectId(bookId) },
        { $addToSet: { wishList: userEmail } }
      );
      return NextResponse.json({ message: "added to wishList " });
    } else {
      await booksCollection.updateOne(
        { _id: new ObjectId(bookId) },
        { $pull: { wishList: userEmail } }
      );
      return NextResponse.json({ message: "removed from wishList " });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "No Data Found!", error });
  }
};
