import { connectDB } from "@/lib/connectDB";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export const GET = async (request) => {
  const db = await connectDB();
  const booksCollection = await db.collection("books");

  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page")) || 1;
  const limit = parseInt(searchParams.get("limit")) || 10;
  const skip = (page - 1) * limit;

  // Initialize filters
  const filters = {};

  // Extract and set search parameters
  const categories = searchParams.get("categories")?.split(",") || [];
  const authors = searchParams.get("authors")?.split(",") || [];
  const publishers = searchParams.get("publishers")?.split(",") || [];
  const rating = parseInt(searchParams.get("rating")) || null;
  const minPrice = parseFloat(searchParams.get("priceMin")) || 0;
  const maxPrice = parseFloat(searchParams.get("priceMax")) || 1000;
  const startDate = searchParams.get("startDate") || null;
  const endDate = searchParams.get("endDate") || null;

  // Apply filters based on search parameters
  if (categories.length) filters.Genre = { $in: categories };
  if (authors.length) filters.AuthorName = { $in: authors };
  if (publishers.length) filters.Publisher = { $in: publishers };
  if (rating) filters.Rating = { $gte: rating }; // Adjust rating filter
  filters.Price = { $gte: minPrice, $lte: maxPrice }; // Price range
  if (startDate && endDate) {
    filters.publishDate = {
      $gte: new Date(startDate),
      $lte: new Date(endDate),
    };
  }

  try {
    let books, totalBooks;

    // Check if any filters are applied
    if (Object.keys(filters).length > 0) {
      books = await booksCollection
        .find(filters)
        .skip(skip)
        .limit(limit)
        .toArray();
      totalBooks = await booksCollection.countDocuments(filters);
    } else {
      // No filters applied, get all books
      books = await booksCollection.find().skip(skip).limit(limit).toArray();
      totalBooks = await booksCollection.countDocuments();
    }

    const totalPages = Math.ceil(totalBooks / limit);

    return NextResponse.json({
      books,
      page,
      totalPages,
      totalBooks,
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json({ message: "No Data Found!", error });
  }
};
