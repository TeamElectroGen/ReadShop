import { connectDB } from "@/lib/connectDB";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export const GET = async (request, { params }) => {
  const db = await connectDB();
  const authorsCollection = await db.collection("authors");
  const authorId = params.authorId;

  try {
    const author = await authorsCollection.findOne({
      _id: new ObjectId(authorId),
    });
    return NextResponse.json({ author });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "No Data Found!", error });
  }
};
