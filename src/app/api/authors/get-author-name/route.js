import { connectDB } from "@/lib/connectDB";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export const GET = async () => {
  const db = await connectDB();

  try {
    const authorsCollection = db.collection("authors");
    const authors = await authorsCollection
      .find({}, { projection: { name: 1, _id: 1 } })
      .toArray();

    if (!authors) {
      return NextResponse.json(
        { message: "No authors found!" },
        { status: 404 }
      );
    }

    return NextResponse.json({ authorNames: authors });
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
