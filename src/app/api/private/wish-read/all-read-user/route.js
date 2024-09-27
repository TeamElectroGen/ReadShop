import { connectDB } from "@/lib/connectDB";
import { NextResponse } from "next/server";

export const GET = async (request) => {
  const db = await connectDB();
  const booksCollection = await db.collection("books");
  const params = request.nextUrl.searchParams;
  const userEmail = params.get("email");
  try {
    const books = await booksCollection
      .find({ readList: { $in: [userEmail] } })
      .toArray();
    return NextResponse.json({ books });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "No Data Found!", error });
  }
};
