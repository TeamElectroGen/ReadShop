import { connectDB } from "@/lib/connectDB";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export const POST = async (request) => {
  const { ids } = await request.json();

  const db = await connectDB();
  const booksCollection = await db.collection("books");
  try {
    if (!ids) {
      return NextResponse.json({ error: "Ids are required!" });
    }
    const books = await booksCollection
      .find({ _id: { $in: ids.map((id) => new ObjectId(id)) } })
      .toArray();
    console.log(books);
    return NextResponse.json({ books });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Something went wrong!" });
  }
};
