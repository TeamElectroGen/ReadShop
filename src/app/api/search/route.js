import { connectDB } from "@/lib/connectDB";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request) {
  const { searchParams } = request.nextUrl;
  const db = await connectDB();
  const booksCollection = await db.collection("books");
  try {
    const search = searchParams.get("q");
    let query = {};
    if (search) {
      query = {
        $or: [
          { BookName: { $regex: search, $options: "i" } },
          { AuthorName: { $regex: search, $options: "i" } },
        ],
      };
    }
    const books = await booksCollection.find(query).toArray();
    return NextResponse.json({ books });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "No Data Found!", error });
  }
}
