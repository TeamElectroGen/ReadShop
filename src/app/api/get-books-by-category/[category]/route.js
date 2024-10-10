import { connectDB } from "@/lib/connectDB";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export const GET = async (request, { params }) => {
  const db = await connectDB();
  const booksCollection = await db.collection("books");
  const size = parseInt(request.nextUrl.searchParams.get("size"));
  const page = parseInt(request.nextUrl.searchParams.get("page") - 1);
  const category = params.category;

  try {
    const books = await booksCollection
      .find({ Genre: { $regex: category, $options: "i" } })
      .limit(size)
      .skip(size * page)
      .toArray();

    return NextResponse.json({ books });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "No Data Found!", error });
  }
};
