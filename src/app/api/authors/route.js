import { connectDB } from "@/lib/connectDB";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export const GET = async () => {
  const db = await connectDB();
  const authorsCollection = await db.collection("authors");
  try {
    const authors = await authorsCollection.find().toArray();
    return NextResponse.json({ authors });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "No Data Found!", error });
  }
};
