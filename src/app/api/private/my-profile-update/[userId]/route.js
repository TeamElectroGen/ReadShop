import { connectDB } from "@/lib/connectDB";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export const PATCH = async (request, { params }) => {
  const db = await connectDB();
  const { userId } = params;
  const userInfo = await request.json();
  const userCollection = await db.collection("users");

  try {
    const res = await userCollection.updateOne(
      { _id: new ObjectId(userId) },
      { $set: { ...userInfo } },
      { upsert: true }
    );
    if (res.modifiedCount > 0) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ success: false });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({ success: false, error: error.message });
  }
};
