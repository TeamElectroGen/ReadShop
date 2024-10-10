"use client";
import Card from "@/components/Card";
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
import React, { useEffect, useState } from "react";

const BookOfCategory = ({ genre }) => {
  const categoryName = genre.genre;
  const decodeText = decodeURIComponent(categoryName);
  const [booksByCategory, setBooksByCategory] = useState([]);

  const [totalBooks, setTotalBooks] = useState(0);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(5);

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
    }
  };

  useEffect(() => {
    if (categoryName) {
      fetchCategoryCount(categoryName);
      fetchBooksByCategory(categoryName, size, page);
      setLoading(false);
    }
  }, [categoryName, size, page]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleSizeChange = (event) => {
    setSize(Number(event.target.value));
    setPage(1);
  };

  const totalPages = Math.ceil(totalBooks / size);

  if (loading) {
    return <div className="my-10 h-20 w-full animate-ping">Loading...</div>;
  }

  return (
    <section className="container">
      <PagesHeader
        title={decodeText}
        subtitle={`Find all the ${decodeText} Books here!`}
        path={`Category`}
        path2={`${decodeText}`}
      />

      <div className="mt-10 flex items-center justify-end">
        <label htmlFor="pageSize" className="mr-2">
          Items per page:
        </label>
        <select
          id="pageSize"
          value={size}
          onChange={handleSizeChange}
          className="rounded border border-gray-300 px-2 py-1"
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
        </select>
      </div>

      <div className="flex items-center justify-center">
        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {booksByCategory.length > 0 ? (
            booksByCategory.map((book) => <Card key={book._id} book={book} />)
          ) : (
            <p>No books available for this category.</p>
          )}
        </div>
      </div>

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
