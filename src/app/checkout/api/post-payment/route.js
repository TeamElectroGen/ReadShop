import { connectDB } from "@/lib/connectDB";
import { NextResponse } from "next/server";

export const POST = async (request) => {
  const db = await connectDB();
  const paymentData = await request.json();
  const paymentCollection = db.collection("payments");
  if (!paymentData) {
    return NextResponse.json({ error: "Payment data is required" });
  }
  try {
    const result = await paymentCollection.insertOne(paymentData);
    return NextResponse.json({
      message: "Payment created successfully",
      ...result,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Failed to create payment" });
  }
};
