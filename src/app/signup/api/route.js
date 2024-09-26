import { connectDB } from "@/lib/connectDB";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export const POST = async (request) => {
  const newUser = await request.json();
  try {
    const db = await connectDB();
    const userCollection = db.collection("users");
    const exist = await userCollection.findOne({
      $or: [{ email: newUser.email }, { phone: newUser.phone }],
    });
    console.log(exist);
    if (exist)
      return NextResponse.json({ message: "User already exists", status: 304 });
    const hashedPassword = bcrypt.hashSync(newUser.password, 14);
    await userCollection.insertOne({ ...newUser, password: hashedPassword });
    return NextResponse.json({
      message: "user created successfully",
      status: 200,
    });
  } catch (error) {
    return NextResponse.json({
      message: "Something went wrong!",
      status: 500,
      error,
    });
  }
};
