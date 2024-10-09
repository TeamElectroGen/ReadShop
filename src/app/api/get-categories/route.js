import { connectDB } from "@/lib/connectDB";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export const GET = async () => {
  try {
    const db = await connectDB();
    const booksCollection = await db.collection("books");

    const categories = await booksCollection
      .aggregate([
        { $project: { Genre: { $split: ["$Genre", ", "] } } },
        { $unwind: "$Genre" },
        { $group: { _id: "$Genre" } },
        { $project: { _id: 0, Genre: "$_id" } },
        { $sort: { Genre: 1 } },
      ])
      .toArray();

    return NextResponse.json({ categories });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "No Data Found!", error });
  }
};
