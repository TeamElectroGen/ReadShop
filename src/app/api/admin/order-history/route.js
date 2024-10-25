import { connectDB } from "@/lib/connectDB";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export const GET = async () => {
  const db = await connectDB();
  const paymentCollection = db.collection("payments");

  try {
    const orders = await paymentCollection.find().toArray();

    return NextResponse.json({ orders });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "No Data Found!", error });
  }
};
