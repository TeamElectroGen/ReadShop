import { connectDB } from "@/lib/connectDB";
import { NextResponse } from "next/server";

export const GET = async (request, { params }) => {
  const db = await connectDB();
  const usersCollection = await db.collection("users");
  const email = params.email;

  try {
    const user = await usersCollection.findOne({ email });
    return NextResponse.json({ role: user.role });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "No Data Found!", error });
  }
};
