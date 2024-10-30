import { connectDB } from "@/lib/connectDB";
import { NextResponse } from "next/server";

export const DELETE = async (request, { params }) => {
  const db = await connectDB();
  const { email } = params;
  const bookId = request.nextUrl.searchParams.get("bookId");

  const user = await db.collection("users").findOne({ email });
  if (!user) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }

  try {
    const deleteResult = await db.collection("reviewAndRating").deleteOne({
      userId: user._id,
      bookId: bookId,
    });

    if (deleteResult.deletedCount === 0) {
      return NextResponse.json(
        { message: "Review and Rating not found for this book" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "Review and Rating deleted successfully",
      status: 200,
    });
  } catch (error) {
    console.error("Error deleting review and rating:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
};
