import { connectDB } from "@/lib/connectDB";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export const GET = async () => {
  const db = await connectDB();
  const booksCollection = db.collection("books");

  try {
    const books = await booksCollection.find().sort({ Price: 1 }).toArray();
    if (!books) {
      return NextResponse.json({ message: "No books found" }, { status: 404 });
    }
    return NextResponse.json({ books });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch books" },
      { status: 500 }
    );
  }
};
