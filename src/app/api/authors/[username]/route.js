import { connectDB } from "@/lib/connectDB";
import { NextResponse } from "next/server";

export const GET = async (request, { params }) => {
  const db = await connectDB();
  const authorsCollection = await db.collection("authors");
  const username = params.username;

  try {
    const author = await authorsCollection.findOne({
      username,
    });
    return NextResponse.json({ author });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "No Data Found!", error });
  }
};
