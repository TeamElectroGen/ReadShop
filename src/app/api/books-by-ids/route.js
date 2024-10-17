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
    const booksFromDB = await booksCollection
      .find({ _id: { $in: ids.map((id) => new ObjectId(id)) } })
      .toArray();

    // Create a map of books using their IDs as keys
    const booksMap = booksFromDB.reduce((acc, book) => {
      acc[book._id.toString()] = book;
      return acc;
    }, {});

    // Construct the result array in the order of the original ids
    const orderedBooks = ids.map((id) => booksMap[id]).filter(Boolean);

    return NextResponse.json({ books: orderedBooks });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Something went wrong!" });
  }
};
