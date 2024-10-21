import { connectDB } from "@/lib/connectDB";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export const GET = async (request) => {
  const db = await connectDB();
  const booksCollection = db.collection("books");

  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page")) || 1;
  const limit = parseInt(searchParams.get("limit")) || 10;
  const skip = (page - 1) * limit;

  // Extracting filter parameters
  const search = searchParams.get("search") || "";
  const categories = searchParams.get("categories");
  const authors = searchParams.get("authors");
  const publishers = searchParams.get("publishers");
  const startDate = new Date(searchParams.get("startDate"));
  const endDate = new Date(searchParams.get("endDate"));
  const priceMin = parseFloat(searchParams.get("priceMin"));
  const priceMax = parseFloat(searchParams.get("priceMax"));
  const rating = parseFloat(searchParams.get("rating"));
  const sortBy = searchParams.get("sortBy") || "";

  try {
    // Constructing the query object
    const query = {
      ...(search && { Title: { $regex: search, $options: "i" } }),
      ...(categories && {
        Genre: {
          $in: categories.split(",").map((cat) => new RegExp(cat.trim(), "i")),
        },
      }),
      ...(authors && {
        AuthorName: {
          $in: authors
            .split(",")
            .map((author) => new RegExp(author.trim(), "i")),
        },
      }),
      ...(publishers && {
        PublicationName: {
          $in: publishers.split(",").map((pub) => new RegExp(pub.trim(), "i")),
        },
      }),
      ...(startDate &&
        !isNaN(startDate.getTime()) &&
        endDate &&
        !isNaN(endDate.getTime()) && {
          PublishDate: { $gte: startDate, $lte: endDate },
        }),
      ...(priceMin !== undefined &&
        priceMax !== undefined && {
          Price: { $gte: priceMin, $lte: priceMax },
        }),
      ...(priceMin !== undefined && !priceMax && { Price: { $gte: priceMin } }),
      ...(!priceMin && priceMax !== undefined && { Price: { $lte: priceMax } }),
      ...(rating !== undefined && { Rating: { $gte: rating } }),
    };

    // Sorting options
    let sortOptions = {};
    if (sortBy === "priceAsc") {
      sortOptions = { Price: 1 };
    } else if (sortBy === "priceDesc") {
      sortOptions = { Price: -1 };
    } else if (sortBy === "dateAsc") {
      sortOptions = { PublishDate: 1 };
    } else if (sortBy === "dateDesc") {
      sortOptions = { PublishDate: -1 };
    }

    // Fetching filtered books with pagination and sorting
    const books = await booksCollection
      .find(query)
      .sort(sortOptions)
      .skip(skip)
      .limit(limit)
      .toArray();

    const totalBooks = await booksCollection.countDocuments(query);
    const totalPages = Math.ceil(totalBooks / limit);

    return NextResponse.json({
      books,
      page,
      totalPages,
      totalBooks,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Error fetching books!", error });
  }
};
