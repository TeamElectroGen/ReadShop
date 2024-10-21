import { connectDB } from "@/lib/connectDB";
import { NextResponse } from "next/server";

export const GET = async (request, { params }) => {
  const db = await connectDB();
  const { email } = params;
  try {
    const user = await db
      .collection("users")
      .findOne({ email }, { projection: { _id: 1, name: 1, image: 1, email:1, phone:1, address:1, dob:1 } });
    return NextResponse.json({ user });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
