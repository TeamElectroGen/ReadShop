import { authors } from "@/lib/authors";
import { connectDB } from "@/lib/connectDB";
import { NextResponse } from "next/server";

export const GET = async () => {
  const db = await connectDB();
  const authorsCollection = await db.collection("authors");
  try {
    await authorsCollection.deleteMany();
    await authorsCollection.insertMany(authors);
    return NextResponse.json({ message: "seeded successfully" });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "No Data Found!", error });
  }
};
