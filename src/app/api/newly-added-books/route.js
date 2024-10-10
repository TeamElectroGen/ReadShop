import { connectDB } from "@/lib/connectDB";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export const GET = async () => {
  const db = await connectDB();
  const booksCollection = await db.collection("books");
  try {
    const books = await booksCollection
      .find()
      .sort({ PublishDate: -1 })
      .limit(10)
      .toArray();
    return NextResponse.json({ books });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "No Data Found!", error });
  }
};
