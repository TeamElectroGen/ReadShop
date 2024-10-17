"use client";
import React, { useState, useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
} from "@/components/ui/pagination";
import { getBooksByPage } from "@/services/getBooksData";
import Image from "next/image";
import RatingStar from "@/components/RatingStar";
import Link from "next/link";

const AllBooks = ({ query }) => {
  const [books, setBooks] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalBooks, setTotalBooks] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBooks();
  }, [page, itemsPerPage, query]); // Add query to dependencies

  const fetchBooks = async () => {
    setLoading(true);
    try {
      // Pass query parameters to getBooksByPage
      const data = await getBooksByPage(itemsPerPage, page, query);
      setBooks(data.books);
      setTotalPages(data.totalPages);
      setTotalBooks(data.totalBooks);
    } catch (error) {
      console.error("Error fetching books:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleItemsPerPageChange = (size) => {
    setItemsPerPage(size);
    setPage(1);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold">All Books</h1>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button>{itemsPerPage} items per page</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {[4, 8, 12, 40].map((size) => (
              <DropdownMenuItem
                key={size}
                onClick={() => handleItemsPerPageChange(size)}
              >
                {size} items per page
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
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {books.length > 0 ? (
            books.map((book) => (
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
                  />
                </div>
                <div className="flex flex-col">
                  <div className="flex-1">
                    <h3 className="text-sm font-semibold">{book.BookName}</h3>
                    <p className="text-xs">by {book.AuthorName}</p>
                    <RatingStar rating={book.Rating} />
                  </div>
                  <p className="text-lg font-bold text-primary-foreground">
                    ${book.Price}
                  </p>
                </div>
              </Link>
            ))
          ) : (
            <p className="flex w-full flex-col items-center justify-center p-4 text-center md:col-span-3 lg:col-span-4">
              No books found!
            </p>
          )}
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
    </div>
  );
};

export default AllBooks;
