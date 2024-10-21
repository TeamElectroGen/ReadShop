import { connectDB } from "@/lib/connectDB";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export const GET = async () => {
  try {
    const db = await connectDB();
    const authorsCollection = db.collection("authors");
    // Fetch only the 'name' field and ensure _id is not part of the result
    const authors = await authorsCollection
      .find({}, { projection: { name: 1, _id: 0 } })
      .toArray();

    if (!authors.length) {
      return NextResponse.json(
        { message: "No authors found!" },
        { status: 404 }
      );
    }

    // Extract only the author names directly
    const authorNames = authors.map((author) => author.name);

    return NextResponse.json({ authorNames }, { status: 200 });
  } catch (error) {
    console.error("Error fetching author names:", error);
    return NextResponse.json(
      {
        message: "An error occurred while fetching author names.",
        error: error.message,
      },
      { status: 500 }
    );
  }
};
