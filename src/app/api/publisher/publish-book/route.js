import { connectDB } from "@/lib/connectDB";
import { NextResponse } from "next/server";

export const POST = async (request) => {
  const db = await connectDB();
  const bookData = await request.json();
  try {
    const response = await db.collection("books").insertOne(bookData);
    return NextResponse.json({
      success: true,
      message: "Book published successfully",
      response,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: "Error publishing book",
      error: error.message,
    });
  }
};
