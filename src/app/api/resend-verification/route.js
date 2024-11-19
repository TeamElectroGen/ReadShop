import { connectDB } from "@/lib/connectDB";
import { sendVerificationEmail } from "@/services/emailService";
import crypto from "crypto";

export async function POST(req) {
  try {
    const { email } = await req.json();
    const db = await connectDB();

    const user = await db.collection("users").findOne({ email });

    if (!user) {
      return Response.json({
        status: 404,
        message: "User not found",
      });
    }

    if (user.emailVerified) {
      return Response.json({
        status: 400,
        message: "Email is already verified",
      });
    }

    // Create new verification token
    const verificationToken = crypto.randomBytes(32).toString("hex");
    const verificationTokenExpires = new Date(Date.now() + 24 * 60 * 60 * 1000);

    await db.collection("users").updateOne(
      { email },
      {
        $set: {
          verificationToken,
          verificationTokenExpires,
        },
      }
    );

    // Send new verification email
    await sendVerificationEmail(email, verificationToken);

    return Response.json({
      status: 200,
      message: "Verification email sent successfully",
    });
  } catch (error) {
    console.error(error);
    return Response.json({
      status: 500,
      message: "Something went wrong!",
    });
  }
}
