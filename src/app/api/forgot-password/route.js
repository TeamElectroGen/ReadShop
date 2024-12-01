import { connectDB } from "@/lib/connectDB";
import { sendPasswordResetEmail } from "@/services/emailService";
import crypto from "crypto";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { email } = await req.json();
    const db = await connectDB();

    const user = await db.collection("users").findOne({ email });

    if (!user) {
      return NextResponse.json({
        status: 404,
        message: "No account found with this email",
      });
    }

    // Create reset token
    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetTokenExpires = new Date(Date.now() + 1 * 60 * 60 * 1000); // 1 hour

    await db.collection("users").updateOne(
      { email },
      {
        $set: {
          resetToken,
          resetTokenExpires,
        },
      }
    );

    // Send reset email
    await sendPasswordResetEmail(email, resetToken);

    return NextResponse.json({
      status: 200,
      message: "Password reset link sent successfully",
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      status: 500,
      message: "Something went wrong!",
    });
  }
}
