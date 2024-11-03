import { connectDB } from "@/lib/connectDB";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export const GET = async (request) => {
  const db = await connectDB();
  const booksCollection = db.collection("books");

  const { searchParams } = new URL(request.url);

  // Pagination
  const page = parseInt(searchParams.get("page")) || 1;
  const limit = parseInt(searchParams.get("limit")) || 10;
  const skip = (page - 1) * limit;

  // Extract search parameters
  const categories = searchParams.get("categories")?.split(",").filter(Boolean) || [];
  const authors = searchParams.get("authors")?.split(",").filter(Boolean) || [];
  const publishers = searchParams.get("publishers")?.split(",").filter(Boolean) || [];
  const rating = searchParams.get("rating") ? parseInt(searchParams.get("rating")) : null;
  const minPrice = parseFloat(searchParams.get("priceMin")) || 0;
  const maxPrice = parseFloat(searchParams.get("priceMax")) || 1000;
  const startDate = searchParams.get("startDate") ? new Date(searchParams.get("startDate")) : null;
  const endDate = searchParams.get("endDate") ? new Date(searchParams.get("endDate")) : null;

  // Build the filters object with conditions that exist
  const filters = {};
  
  if (categories.length > 0) {
    filters.Genre = { $in: categories.map(cat => new RegExp(cat, "i")) };
  }
  if (authors.length > 0) {
    filters.AuthorName = { $in: authors };
  }
  if (publishers.length > 0) {
    filters.PublicationName = { $in: publishers };
  }
  if (typeof rating === "number" && !isNaN(rating)) {  // Check for a valid rating value
    filters.Rating = { $gte: rating };
  }
  if (minPrice >= 0 && maxPrice >= minPrice) {
    filters.Price = { $gte: minPrice, $lte: maxPrice };
  }
  if (startDate && endDate) {
    filters.PublishDate = { $gte: startDate, $lte: endDate };
  }

  // Log filters to debug
  console.log("Constructed Filters:", filters);

  // Sorting options
  const sortBy = searchParams.get("sortBy") || "";
  let sortOptions = {};
  if (sortBy === "priceAsc") sortOptions = { Price: 1 };
  else if (sortBy === "priceDesc") sortOptions = { Price: -1 };
  else if (sortBy === "dateAsc") sortOptions = { PublishDate: 1 };
  else if (sortBy === "dateDesc") sortOptions = { PublishDate: -1 };

  try {
    const books = await booksCollection
      .find(filters)
      .sort(sortOptions)
      .skip(skip)
      .limit(limit)
      .toArray();

    const totalBooks = await booksCollection.countDocuments(filters);
    const totalPages = Math.ceil(totalBooks / limit);

    return NextResponse.json({
      books,
      page,
      totalPages,
      totalBooks,
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json({
      message: "No Data Found!",
      error: error.message,
    });
  }
};
