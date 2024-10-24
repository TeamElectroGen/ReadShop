import { getAllBooks, getCategories } from "@/services/getBooksData"; // Service to get books and categories
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { Button } from "./ui/button";

const CategorySection = ({ categoriesName, books: allBooks }) => {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredBooks =
    selectedCategory === "all"
      ? allBooks
      : allBooks?.filter((book) =>
          book.Genre.split(", ").includes(selectedCategory)
        );

  // Handle category selection
  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  // Get unique categories from books data
  const uniqueCategories = [
    ...new Set(
      allBooks?.flatMap((book) => book.Genre.split(", ").map((genre) => genre))
    ),
  ];

  return (
    <>
      {/* Category buttons */}
      <div className="grid grid-cols-2 gap-2 text-center text-xs sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-6 xl:grid-cols-8">
        {/* Button for 'All Books' */}
        <Button
          onClick={() => handleCategorySelect("all")}
          className={`rounded-sm border border-primary py-1 text-xs ${
            selectedCategory === "all"
              ? "bg-primary text-white"
              : "bg-secondary"
          } hover:bg-primary hover:duration-300 hover:ease-linear`}
        >
          All Books
        </Button>

        {/* Buttons for each unique category */}
        {uniqueCategories?.map((category, idx) => (
          <Button
            key={idx}
            onClick={() => handleCategorySelect(category)}
            className={`rounded-sm border border-primary py-1 text-xs ${
              selectedCategory === category
                ? "bg-primary text-white"
                : "bg-secondary"
            } hover:bg-primary hover:duration-300 hover:ease-linear`}
          >
            {category}
          </Button>
        ))}
      </div>

      {/* Display filtered books */}
      <div className="mt-10 flex items-center justify-center">
        <div className="flex gap-2 overflow-y-auto">
          {filteredBooks?.slice(0, 10).map((book) => (
            <Link
              href={`/view-details/${book._id}`}
              key={book._id}
              className="relative h-52 min-w-32"
            >
              <Image
                src={book.CoverImage}
                alt={book.BookName}
                width={150}
                height={220}
                className="h-52 min-w-32 rounded-sm object-cover"
              />
              <div className="absolute bottom-0 z-10 flex h-14 w-full flex-col rounded-b-sm bg-primary pb-3 shadow-sm">
                <h2 className="flex-1 truncate px-2 pt-2 text-sm font-bold">
                  {book.BookName}
                </h2>
                <p className="text-xs">{book.AuthorName}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="mt-5 flex">
        <Link
          href={
            selectedCategory === "all"
              ? `/all-books`
              : `/category/${selectedCategory}`
          }
          className="w-full rounded-sm border border-primary py-2 text-center font-bold hover:shadow-sm"
        >
          View All From{" "}
          {selectedCategory === "all" ? "All Books" : selectedCategory}
        </Link>
      </div>
    </>
  );
};

export default CategorySection;
