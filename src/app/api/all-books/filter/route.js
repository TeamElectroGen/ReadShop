import { connectDB } from "@/lib/connectDB";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export const GET = async (req) => {
  try {
    const db = await connectDB();
    const booksCollection = await db.collection("books");

    const { searchParams } = new URL(req.url);
    const categories = searchParams.get("categories")?.split(",") || [];
    const authors = searchParams.get("authors")?.split(",") || [];
    const publishers = searchParams.get("publishers")?.split(",") || [];
    const rating = parseInt(searchParams.get("rating")) || null;
    const minPrice = parseFloat(searchParams.get("priceMin")) || 0; // Use priceMin
    const maxPrice = parseFloat(searchParams.get("priceMax")) || 1000; // Use priceMax
    const startDate = searchParams.get("startDate") || null;
    const endDate = searchParams.get("endDate") || null;
    const itemsPerPage = parseInt(searchParams.get("itemsPerPage")) || 8;
    const page = parseInt(searchParams.get("page")) || 1;

    const filters = {};

    // Apply filters
    if (categories.length) filters.Genre = { $in: categories };
    if (authors.length) filters.AuthorName = { $in: authors };
    if (publishers.length) filters.Publisher = { $in: publishers };

    // Adjust rating filter to include higher ratings
    if (rating) filters.Rating = { $gte: rating }; // Books with rating >= specified rating

    // Price range filter
    filters.Price = { $gte: minPrice, $lte: maxPrice }; // Combine price filters

    // Date range filter
    if (startDate && endDate) {
      filters.publishDate = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      };
    }

    // Log the filters for debugging
    console.log("Applied Filters:", filters);

    const totalBooks = await booksCollection.countDocuments(filters);
    const books = await booksCollection
      .find(filters)
      .skip((page - 1) * itemsPerPage)
      .limit(itemsPerPage)
      .toArray();

    return NextResponse.json({
      books,
      totalPages: Math.ceil(totalBooks / itemsPerPage),
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json({ message: "Error fetching data", error });
  }
};
