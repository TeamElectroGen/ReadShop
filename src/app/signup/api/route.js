import { connectDB } from "@/lib/connectDB";
import { sendVerificationEmail } from "@/services/emailService";
import bcrypt from "bcrypt";
import crypto from "crypto";
import { NextResponse } from "next/server";

export const POST = async (request) => {
  const newUser = await request.json();
  try {
    const db = await connectDB();
    const userCollection = db.collection("users");

    // Check if user exists
    const exist = await userCollection.findOne({
      $or: [{ email: newUser.email }, { phone: newUser.phone }],
    });

    if (exist) {
      return NextResponse.json({
        message: "User already exists",
        status: 304,
      });
    }

    // Create verification token
    const verificationToken = crypto.randomBytes(32).toString("hex");
    const verificationTokenExpires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

    // Hash password
    const hashedPassword = bcrypt.hashSync(newUser.password, 14);

    // Create user with verification fields
    await userCollection.insertOne({
      ...newUser,
      password: hashedPassword,
      role: "user",
      isActive: true,
      createdAt: new Date(),
      lastLogin: null,
      verificationToken,
      verificationTokenExpires,
    });

    // Send verification email
    await sendVerificationEmail(newUser.email, verificationToken);

    return NextResponse.json({
      message: "Registration successful. Please check your email to verify your account.",
      status: 200,
    });
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json({
      message: "Something went wrong!",
      status: 500,
      error,
    });
  }
};
