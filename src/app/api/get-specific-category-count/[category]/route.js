import { connectDB } from "@/lib/connectDB";
import { NextResponse } from "next/server";

export const GET = async (request, { params }) => {
  const db = await connectDB();
  const booksCollection = await db.collection("books");
  const category = params.category;

  try {
    const categoryCount = await booksCollection.countDocuments({
      Genre: { $regex: category, $options: "i" },
    });
    return NextResponse.json({ count: categoryCount });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "No Data Found!", error, count: 0 });
  }
};
