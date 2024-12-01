import { connectDB } from "@/lib/connectDB";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { token, email, password } = await req.json();
    const db = await connectDB();

    const user = await db.collection("users").findOne({
      email,
      resetToken: token,
      resetTokenExpires: { $gt: new Date() },
    });

    if (!user) {
      return NextResponse.json({
        status: 400,
        message: "Invalid or expired reset token",
      });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(password, 14);

    // Update password and remove reset token
    await db.collection("users").updateOne(
      { email },
      {
        $set: { password: hashedPassword },
        $unset: { resetToken: "", resetTokenExpires: "" },
      }
    );

    return NextResponse.json({
      status: 200,
      message: "Password reset successful",
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      status: 500,
      message: "Something went wrong!",
    });
  }
}
