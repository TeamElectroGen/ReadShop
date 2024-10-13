"use client";
import PagesHeader from "@/components/PagesHeader";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { getBooksByCategory, getCategoryCount } from "@/services/getBooksData";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import RatingStar from "@/components/RatingStar";
import Image from "next/image";
import { FaArrowDown, FaSadCry } from "react-icons/fa";
import { FaArrowUp } from "react-icons/fa6";
import Link from "next/link";

const BookOfCategory = ({ genre }) => {
  const categoryName = genre.genre;
  const decodeText = decodeURIComponent(categoryName);
  const [booksByCategory, setBooksByCategory] = useState([]);
  const [totalBooks, setTotalBooks] = useState(0);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(4);
  const [buttonIcon, setButtonIcon] = useState(true);
  const [loading, setLoading] = useState(true);

  const fetchCategoryCount = async (categoryName) => {
    try {
      const { count } = await getCategoryCount(categoryName);
      setTotalBooks(count);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchBooksByCategory = async (category, size, page) => {
    try {
      const { books } = await getBooksByCategory(category, size, page);
      setBooksByCategory(books || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (categoryName) {
      setLoading(true);
      fetchCategoryCount(categoryName);
      fetchBooksByCategory(categoryName, size, page);
    }
  }, [categoryName, size, page]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleItemsPerPageChange = (newSize) => {
    setSize(newSize);
    setPage(1);
    setButtonIcon(!buttonIcon);
  };

  const totalPages = Math.ceil(totalBooks / size);

  return (
    <section className="container">
      <PagesHeader
        title={decodeText}
        subtitle={`Find all the ${decodeText} Books here!`}
        path={`Category`}
        path2={`${decodeText}`}
      />

      <div className="mt-10 flex items-center justify-end">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="flex items-center justify-center gap-2">
              <span>{size} items/page</span>
              {buttonIcon ? <FaArrowDown /> : <FaArrowUp />}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {[4, 8, 12, 40].map((sizeOption) => (
              <DropdownMenuItem
                key={sizeOption}
                onClick={() => handleItemsPerPageChange(sizeOption)}
              >
                {sizeOption} items per page
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {loading ? (
        <div className="my-10 flex justify-center">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-t-primary"></div>
        </div>
      ) : (
        <div className="flex items-center justify-center">
          <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {booksByCategory.length > 0 ? (
              booksByCategory.map((book) => (
                <Link
                  href={`/view-details/${book._id}`}
                  key={book._id}
                  className="flex gap-4 rounded border p-4 shadow-sm"
                >
                  <div>
                    <Image
                      src={book?.CoverImage}
                      width={70}
                      height={100}
                      className="h-full min-w-16 object-cover"
                      alt={book?.BookName}
                    ></Image>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold">{book.BookName}</h3>
                    <p className="text-xs">by {book.AuthorName}</p>
                    <RatingStar rating={book.Rating} />
                    <p className="pt-3 text-sm font-bold text-primary-foreground">
                      ${book.Price}
                    </p>
                  </div>
                </Link>
              ))
            ) : (
              <p className="flex w-full flex-col items-center justify-center p-4 text-center md:col-span-3 lg:col-span-4">
                <FaSadCry className="text-7xl text-primary/50" />
                <br />
                Sorry! I Don&apos;t find any data!
              </p>
            )}
          </div>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 0 && (
        <Pagination
          total={totalPages}
          current={page}
          onChange={handlePageChange}
          className="mb-20 mt-8"
        >
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                className={"hover:cursor-pointer"}
                onClick={() => handlePageChange(page > 1 ? page - 1 : 1)}
              />
            </PaginationItem>
            {[...Array(totalPages)].map((_, index) => (
              <PaginationItem key={index}>
                <PaginationLink
                  onClick={() => handlePageChange(index + 1)}
                  isActive={page === index + 1}
                  className={"hover:cursor-pointer"}
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                className={"hover:cursor-pointer"}
                onClick={() =>
                  handlePageChange(page < totalPages ? page + 1 : totalPages)
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </section>
  );
};

export default BookOfCategory;
