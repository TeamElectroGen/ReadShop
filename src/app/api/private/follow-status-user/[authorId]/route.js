import { connectDB } from "@/lib/connectDB";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export const GET = async (request, { params }) => {
  const db = await connectDB();
  const { authorId } = params;
  const userId = request.nextUrl.searchParams.get("userId");
  const authorsCollection = db.collection("authors");

  try {
    const isExist = await authorsCollection.findOne({
      _id: new ObjectId(authorId),
      followers: { $in: [userId] },
    });
    return NextResponse.json({ status: !!isExist });
  } catch (error) {
    console.log(error);
    return NextResponse.json("Failed to fetch author", { status: 500 });
  }
};
