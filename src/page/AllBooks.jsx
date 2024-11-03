"use client";
import CircleLoading from "@/components/CircleLoading";
import FilterSidebar from "@/components/FilterSidebar";
import RatingStar from "@/components/RatingStar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { authorName } from "@/services/authorsCRUD";
import { FilterContext } from "@/services/FilterProvider";
import {
  getBooksByPage,
  getCategories,
  getPublicationName,
} from "@/services/getBooksData";
import { queryClient } from "@/services/Providers";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { useContext, useState } from "react";

const AllBooks = () => {
  // const [books, setBooks] = useState([]);
  const [page, setPage] = useState(1);
  // const [totalPages, setTotalPages] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(9);
  // const [loading, setLoading] = useState(true);
  //
  const {
    dateRange,
    setDateRange,
    priceRange,
    setPriceRange,
    selectedRating,
    setSelectedRating,
    selectedCategories,
    setSelectedCategories,
    selectedAuthors,
    setSelectedAuthors,
    selectedPublishers,
    setSelectedPublishers,
  } = useContext(FilterContext);

  // const searchParams = useSearchParams();
  // eslint-disable-next-line no-unused-vars
  // const [filteredBooks, setFilteredBooks] = useState([]);

  // console.log("SearchParam From AllBooks", selectedRating);

  // useEffect(() => {
  //   const fetchBooks = async () => {
  //     setLoading(true);
  //     try {
  //       const hasFilters =
  //         searchParams.toString() ||
  //         selectedCategories.length ||
  //         selectedAuthors.length ||
  //         selectedPublishers.length ||
  //         selectedRating ||
  //         dateRange[0] ||
  //         dateRange[1] ||
  //         priceRange[0] !== 0 ||
  //         priceRange[1] !== 1000;

  //       const data = await getBooksByPage(
  //         itemsPerPage,
  //         page,
  //         hasFilters ? searchParams : ""
  //       );

  //       setBooks(data.books);
  //       setTotalPages(data.totalPages);
  //     } catch (error) {
  //       console.error("Error fetching books:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   fetchBooks();
  // }, [
  //   dateRange,
  //   itemsPerPage,
  //   page,
  //   priceRange,
  //   searchParams,
  //   selectedAuthors.length,
  //   selectedCategories.length,
  //   selectedPublishers.length,
  //   selectedRating,
  //   setBooks,
  // ]);

  const {
    // eslint-disable-next-line no-unused-vars
    data: { books = [], totalPages },
    isFetching: loading,
  } = useQuery({
    queryKey: ["all-books", page, itemsPerPage],
    queryFn: async () => {
      const hasFilters = {
        selectedCategories,
        selectedAuthors,
        selectedPublishers,
        selectedRating,
        dateRange,
        priceRange,
      };
      const res = await getBooksByPage(itemsPerPage, page, hasFilters);
      return res;
    },
    initialData: { books: [], totalPages: 0, totalBooks: 0 },
  });

  const handleApplyFilters = () => {
    queryClient.invalidateQueries(["all-books", page, itemsPerPage]);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  //For Filter SideBar Data
  const { data: categoriesName, error: categoryError } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const { categories } = await getCategories();
      return categories;
    },
  });

  const { data: AuthorData, error: authorError } = useQuery({
    queryKey: ["authorData"],
    queryFn: async () => {
      const { authorNames } = await authorName();
      return authorNames;
    },
  });

  const { data: publicationName } = useQuery({
    queryKey: ["publicationName"],
    queryFn: async () => {
      const data = await getPublicationName();
      return data;
    },
  });

  //For Filter SideBar Data Input
  const handleAuthorChange = (authorName) => {
    setSelectedAuthors((prev) =>
      prev.includes(authorName)
        ? prev.filter((author) => author !== authorName)
        : [...prev, authorName]
    );
  };

  const handleCategoryChange = (genre) => {
    setSelectedCategories((prev) =>
      prev.includes(genre)
        ? prev.filter((category) => category !== genre)
        : [...prev, genre]
    );
  };

  const handlePublisherChange = (publisherName) => {
    setSelectedPublishers((prev) =>
      prev.includes(publisherName)
        ? prev.filter((publisher) => publisher !== publisherName)
        : [...prev, publisherName]
    );
  };

  //Loading Or Error
  // if (isFetching) {
  //   return (
  //     <div className="my-10 flex justify-center">
  //       <div className="h-10 w-10 animate-spin rounded-full border-4 border-t-primary"></div>
  //     </div>
  //   );
  // }
  // if (publicationError) {
  //   return (
  //     <div className="text-red-500">Error: {publicationError.message}</div>
  //   );
  // }

  return (
    <div className="container mx-auto mb-10 mt-5 flex flex-col-reverse items-center justify-between gap-3 md:flex-row md:items-start">
      <FilterSidebar
        AuthorData={AuthorData}
        categoriesName={categoriesName}
        publicationName={publicationName}
        authorError={authorError}
        categoryError={categoryError}
        handleAuthorChange={handleAuthorChange}
        selectedAuthors={selectedAuthors}
        // searchParams={searchParams}
        handleApplyFilters={handleApplyFilters}
        handleCategoryChange={handleCategoryChange}
        handlePublisherChange={handlePublisherChange}
        setDateRange={setDateRange}
        setPriceRange={setPriceRange}
        setSelectedRating={setSelectedRating}
        setSelectedCategories={setSelectedCategories}
        setSelectedPublishers={setSelectedPublishers}
        setSelectedAuthors={setSelectedAuthors}
        selectedCategories={selectedCategories}
        selectedPublishers={selectedPublishers}
        priceRange={priceRange}
        dateRange={dateRange}
        selectedRating={selectedRating}
      />
      <section className="flex min-h-[calc(100vh-80px)] flex-1 flex-col gap-4">
        {/* Item Dropdown */}
        <div className="mb-4 flex items-center justify-between gap-4">
          <h1 className="text-2xl font-bold">All Books</h1>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button>{itemsPerPage} items/page</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {[6, 9, 12, 36].map((size) => (
                <DropdownMenuItem
                  key={size}
                  onClick={() => {
                    setItemsPerPage(size);
                    setPage(1);
                  }}
                >
                  {size} items per page
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="flex-1">
          {loading ? (
            <CircleLoading className={"my-20"} />
          ) : (
            <div className="mb-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {books?.length > 0 ? (
                books?.map((book) => (
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
                        className="h-full min-w-16 rounded-sm object-cover"
                        alt={book?.BookName}
                      />
                    </div>
                    <div className="flex flex-col">
                      <div className="flex-1">
                        <h3 className="text-sm font-semibold">
                          {book.BookName}
                        </h3>
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
                <p>No books found.</p>
              )}
            </div>
          )}
        </div>

        <div>
          <Pagination>
            <PaginationContent>
              <PaginationPrevious
                className={`hover:cursor-pointer ${page === 1 && "text-gray-500"}`}
                onClick={() => {
                  if (page !== 1) {
                    handlePageChange(page - 1);
                  }
                }}
              />
              {Array.from({ length: totalPages }).map((_, index) => (
                <PaginationItem key={index} className="hover:cursor-pointer">
                  <PaginationLink
                    // active={true}
                    className={`${page === index + 1 && "bg-yellow-300"}`}
                    onClick={() => handlePageChange(index + 1)}
                  >
                    {index + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationNext
                className={`hover:cursor-pointer disabled:${page === totalPages && "text-gray-500"} `}
                onClick={() => {
                  if (page !== totalPages) {
                    handlePageChange(page + 1);
                  }
                }}
              />
            </PaginationContent>
          </Pagination>
        </div>
      </section>
    </div>
  );
};

export default AllBooks;
