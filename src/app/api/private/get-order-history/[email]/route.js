import { connectDB } from "@/lib/connectDB";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export const GET = async (request, { params }) => {
  const db = await connectDB();
  const { email } = params;
  const paymentCollection = db.collection("payments");
  const user = await db.collection("users").findOne({ email });

  if (!email) {
    return NextResponse.json({ message: "forbidden access!" });
  }

  const userId = user._id.toString();
  try {
    const orders = await paymentCollection.find({ userId }).toArray();

    return NextResponse.json({ orders });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "No Data Found!", error });
  }
};
