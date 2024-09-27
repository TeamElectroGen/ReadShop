import { books } from "@/lib/books";
import { connectDB } from "@/lib/connectDB";
import { NextResponse } from "next/server";

export const GET = async () => {
  const db = await connectDB();
  const booksCollection = await db.collection("books");
  try {
    await booksCollection.deleteMany();
    await booksCollection.insertMany(books);
    return NextResponse.json({ message: "seeded successfully" });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "No Data Found!", error });
  }
};
