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
import {
  // getAllBooks,
  getBooksByPage,
  getCategories,
  getPublicationName,
} from "@/services/getBooksData";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const AllBooks = () => {
  const [books, setBooks] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState([null, null]);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [selectedRating, setSelectedRating] = useState(null);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedPublishers, setSelectedPublishers] = useState([]);
  const [selectedAuthors, setSelectedAuthors] = useState([]);
  const searchParams = useSearchParams();
  // eslint-disable-next-line no-unused-vars
  const [filteredBooks, setFilteredBooks] = useState([]);

  //For Apply Filter From Filter Sidebar
  const handleApplyFilters = () => {
    const filteredBooks = books?.filter((book) => {
      const matchesPrice =
        book.price >= priceRange[0] && book.price <= priceRange[1];
      const matchesRating = selectedRating
        ? book.rating === selectedRating
        : true;
      const matchesDate =
        dateRange[0] && dateRange[1]
          ? new Date(book.publishDate) >= dateRange[0] &&
            new Date(book.publishDate) <= dateRange[1]
          : true;
      const matchesCategory = selectedCategories.length
        ? selectedCategories.includes(book.category)
        : true;
      const matchesAuthor = selectedAuthors.length
        ? selectedAuthors.includes(book.author)
        : true;
      const matchesPublisher = selectedPublishers.length
        ? selectedPublishers.includes(book.publisher)
        : true;

      return (
        matchesPrice &&
        matchesRating &&
        matchesDate &&
        matchesCategory &&
        matchesAuthor &&
        matchesPublisher
      );
    });

    setFilteredBooks(filteredBooks);
  };

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      try {
        // Check if there are any search parameters or filters applied
        if (
          searchParams.toString() ||
          selectedCategories.length ||
          selectedAuthors.length ||
          selectedPublishers.length ||
          selectedRating ||
          dateRange[0] ||
          dateRange[1] ||
          priceRange[0] !== 0 ||
          priceRange[1] !== 1000
        ) {
          // Fetch filtered books when there are filters or searchParams
          const data = await getBooksByPage(itemsPerPage, page, searchParams);
          setBooks(data.books);
          setTotalPages(data.totalPages);
        } else {
          // Fetch all books when no filters or searchParams are applied
          const data = await getBooksByPage(itemsPerPage, page);
          setBooks(data.books);
          setTotalPages(data.totalPages);
        }
      } catch (error) {
        console.error("Error fetching books:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, [
    dateRange,
    itemsPerPage,
    page,
    priceRange,
    searchParams,
    selectedAuthors.length,
    selectedCategories.length,
    selectedPublishers.length,
    selectedRating,
    setBooks,
  ]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  //For Filter SideBar Data Show
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

  const {
    data: publicationName,
    error: publicationError,
    isLoading,
  } = useQuery({
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

  if (isLoading) {
    return (
      <div className="my-10 flex justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-t-primary"></div>
      </div>
    );
  }

  if (publicationError) {
    return (
      <div className="text-red-500">Error: {publicationError.message}</div>
    );
  }

  return (
    <div className="container mx-auto flex flex-col-reverse items-center justify-between gap-3 md:flex-row md:items-start">
      <FilterSidebar
        AuthorData={AuthorData}
        categoriesName={categoriesName}
        publicationName={publicationName}
        authorError={authorError}
        categoryError={categoryError}
        handleAuthorChange={handleAuthorChange}
        selectedAuthors={selectedAuthors}
        searchParams={searchParams}
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
      <section className="flex-1">
        <div className="mb-4 flex items-center justify-between gap-4">
          <h1 className="text-2xl font-bold">All Books</h1>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button>{itemsPerPage} items/page</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {[4, 8, 12, 40].map((size) => (
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

        {loading ? (
          <CircleLoading className={"my-20"} />
        ) : (
          <div className="mb-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
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
                      className="h-full min-w-16 rounded-sm object-cover"
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
              <p>No books found.</p>
            )}
          </div>
        )}

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
              className={`hover:cursor-pointer ${page === totalPages && "text-gray-500"}`}
              onClick={() => {
                if (page !== totalPages) {
                  handlePageChange(page + 1);
                }
              }}
            />
          </PaginationContent>
        </Pagination>
      </section>
    </div>
  );
};

export default AllBooks;
