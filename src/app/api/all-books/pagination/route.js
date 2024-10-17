import { connectDB } from "@/lib/connectDB";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export const GET = async (request) => {
  const db = await connectDB();
  const booksCollection = await db.collection("books");

  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page")) || 1;
  const limit = parseInt(searchParams.get("limit")) || 10;
  const skip = (page - 1) * limit;
  try {
    const books = await booksCollection
      .find()
      .skip(skip)
      .limit(limit)
      .toArray();
    const totalBooks = await booksCollection.countDocuments();
    const totalPages = Math.ceil(totalBooks / limit);
    return NextResponse.json({
      books,
      page,
      totalPages,
      totalBooks,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "No Data Found!", error });
  }
};
