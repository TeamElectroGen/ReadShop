import { connectDB } from "@/lib/connectDB";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export const GET = async (request, { params }) => {
  const db = await connectDB();
  const { authorId } = params;
  const booksCollection = db.collection("books");

  try {
    const authorBooks = await booksCollection.find({ authorId }).toArray();

    return NextResponse.json({ authorBooks });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "No Data Found!", error });
  }
};
