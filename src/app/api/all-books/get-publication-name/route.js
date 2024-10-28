import { connectDB } from "@/lib/connectDB"; // Adjust the import path if necessary
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic"; // This allows for dynamic rendering

// Handle GET requests
export const GET = async () => {
  try {
    const db = await connectDB(); // Connect to the database
    const booksCollection = await db.collection("books"); // Get the 'books' collection
    const publishers = await booksCollection
      .find({}, { projection: { PublicationName: 1 } }) // Fetch only the 'publisher' field
      .toArray();

    // Extracting publisher names into an array
    const PublicationName = publishers.map((book) => book.PublicationName);

    return NextResponse.json({ PublicationName: PublicationName }); // Return only the publisher names as JSON
  } catch (error) {
    console.log(error); // Log the error for debugging
    return NextResponse.json({ message: "No Data Found!", error }); // Return error message
  }
};
