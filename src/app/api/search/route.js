import { connectDB } from "@/lib/connectDB";
import { NextResponse } from "next/server";

export const GET = async (request) => {
  const db = await connectDB();
  const booksCollection = await db.collection("books");
  try {
    const searchParams = request.nextUrl.searchParams;
    const search = searchParams.get("q");
    console.log(search);
    let query = {};
    if (search) {
      query = {
        $or: [
          { BookName: { $regex: search, $options: "i" } },
          { AuthorName: { $regex: search, $options: "i" } },
        ],
      };
    }
    const books = await booksCollection.find(query).toArray();
    return NextResponse.json({ books });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "No Data Found!", error });
  }
};
