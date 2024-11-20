import { connectDB } from "@/lib/connectDB";

export async function GET(req) {
  try {
    const token = req.nextUrl.searchParams.get("token");
    const db = await connectDB();

    const user = await db.collection("users").findOne({
      verificationToken: token,
      verificationTokenExpires: { $gt: new Date() }
    });

    if (!user) {
      return Response.json({
        status: 400,
        message: "Invalid or expired verification token"
      });
    }

    await db.collection("users").updateOne(
      { _id: user._id },
      {
        $set: { emailVerified: true },
        $unset: { verificationToken: "", verificationTokenExpires: "" }
      }
    );

    return Response.json({
      status: 200,
      message: "Email verified successfully"
    });
  } catch (error) {
    console.error(error);
    return Response.json({
      status: 500,
      message: "Something went wrong!"
    });
  }
} 