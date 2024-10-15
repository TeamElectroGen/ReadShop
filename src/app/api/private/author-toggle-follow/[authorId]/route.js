import { connectDB } from "@/lib/connectDB";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export const PATCH = async (request, { params }) => {
  const db = await connectDB();
  const { authorId } = params;
  const { userId } = await request.json();
  const authorsCollection = db.collection("authors");

  try {
    const isExist = await authorsCollection.findOne({
      _id: new ObjectId(authorId),
      followers: { $in: [userId] },
    });

    if (isExist) {
      await authorsCollection.updateOne(
        { _id: new ObjectId(authorId) },
        { $pull: { followers: userId } }
      );
      return NextResponse.json({ message: "Unfollowed" });
    } else {
      await authorsCollection.updateOne(
        { _id: new ObjectId(authorId) },
        { $push: { followers: userId } }
      );
      return NextResponse.json({ message: "Followed" });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Failed to update" });
  }
};
