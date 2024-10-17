"use client";
import React, { useEffect, useState, useRef } from "react";
import { IoMdSearch } from "react-icons/io";
import {
  getAllBooks,
  getAuthors,
  // getBookDetails,
  getBooksByIds,
  getCategories,
  getNewlyAddedBooks,
  getNewlyAddedBooks,
  getSearchBooks,
} from "@/services/getBooksData";
import Image from "next/image";
import Link from "next/link";
import BookSectionSlider from "@/components/BookSectionSlider";
import Card from "@/components/Card";
import { Input } from "@/components/ui/input";
import BookSectionTitle from "@/components/BookSectionTitle";
import RatingStar from "@/components/RatingStar";
import HomePageCategoryGrid from "@/components/HomePageCategoryGrid";
import AuthorSectionSlide from "@/components/AuthorSectionSlide";
import AuthorSectionTitle from "@/components/AuthorSectionTitle";
import { useQuery } from "@tanstack/react-query";
import { CgSpinnerTwo } from "react-icons/cg";
import RecentlyViewBookSlider from "@/components/RecentlyViewBookSlider";
import FilterModal from "@/components/FilterModal";

const HomePage = () => {
  const [search, setSearch] = useState("");
  const [showSearchResults, setShowSearchResults] = useState(false);
  const dropdownRef = useRef(null); // Reference for dropdown

  // recent viewed books
  const { data: recentViewedBooks } = useQuery({
    queryKey: ["recentViewedBooks"],
    queryFn: async () => {
      const storedBooks =
        JSON.parse(localStorage.getItem("recentVisitedBooks")) || [];
      const res = await getBooksByIds(storedBooks);
      return res.books;
    },
    onError: (error) => {
      console.log(error);
    },
  });

  // all books
  const { data: books } = useQuery({
    queryKey: ["books"],
    queryFn: async () => {
      const { books } = await getAllBooks();
      return books;
    },
  });

  const {
    data: newBooks,
    isFetching,
    error,
  } = useQuery({
    queryKey: ["newBooks"],
    queryFn: async () => {
      const { books } = await getNewlyAddedBooks();
      return books;
    },
  });

  //fetch  all authors
  const { data: authors } = useQuery({
    queryKey: ["authors"],
    queryFn: async () => {
      const { authors } = await getAuthors();
      return authors;
    },
  });

  // search books
  const { data: searchItems, isFetching } = useQuery({
    queryKey: ["searchBooks", search],
    queryFn: async () => {
      if (search) {
        const { books } = await getSearchBooks(search);
        return books;
      }
      return [];
    },
    enabled: !!search,
  });

  // Close dropdown when clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowSearchResults(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  const { data: categoriesName } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const { categories } = await getCategories();
      return categories;
    },
  });

  console.log(newlyAddedBooks);

  return (
    <div className="my-6 md:container">
      {/* Search & Filter Banner */}
      <section className="z-50 mt-16 flex flex-col items-center justify-center text-center">
        <h1 className="scroll-m-20 font-sans text-4xl font-extrabold leading-[1.15] tracking-tight sm:text-6xl">
          Discover & Explore <br />{" "}
          <span className="yellow_gradient">A world of books</span>
        </h1>
        <p className="text-md mt-5 max-w-2xl px-4 text-muted-foreground sm:text-xl">
          Discover a diverse collection of books to suit every reader. Explore,
          shop, and enjoy stories that inspire and entertain.
        </p>
        {/* Search and filter */}
        <div
          className="relative z-40 mt-8 flex w-full max-w-lg items-center justify-center gap-2 rounded-xl border-2 border-white/50 bg-background/50 px-5 py-4 backdrop-blur-md"
          ref={dropdownRef}
        >
          <div className="relative ml-auto flex-1 md:grow-0">
            <IoMdSearch className="absolute left-2.5 top-3.5 size-6 text-muted-foreground" />
            <Input
              type="search"
              name="search"
              value={search}
              onFocus={() => setShowSearchResults(true)}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, author.."
              className="w-full rounded-lg bg-background p-6 pl-9 md:w-[370px] lg:w-[360px]"
            />
          </div>

          <FilterModal
            categoryName={categoriesName}
            AuthorData={authors}
            booksData={books}
          />

          {/* Show search results dropdown */}
          {showSearchResults && (
            <div className="absolute left-0 top-[4.2rem] z-50 mt-5 max-h-96 w-full overflow-scroll rounded-sm bg-white shadow-lg">
              {isFetching ? (
                <div className="my-12 flex items-center justify-center p-4">
                  <CgSpinnerTwo className="animate-spin text-2xl" />
                </div>
              ) : (
                searchItems?.map((item, idx) => (
                  <Link
                    href={`/view-details/${item._id}`}
                    key={idx}
                    className="flex justify-between border-b p-2 hover:bg-gray-100"
                  >
                    <div className="flex gap-2">
                      <Image
                        src={item.CoverImage}
                        alt={item.BookName}
                        width={40}
                        height={50}
                      />
                      <div className="flex flex-col items-start">
                        <p className="font-semibold">{item.BookName}</p>
                        <p className="text-sm text-gray-500">
                          {item.AuthorName}
                        </p>
                        <RatingStar rating={`${item?.Rating || 0}`} />
                      </div>
                    </div>
                  </Link>
                ))
              )}
            </div>
          )}
        </div>
      </section>

      {/* New Arrival Book Slider  (Albab updated this section) */}
      <section className="z-10 mt-10 rounded-xl border-b-4 border-primary bg-white/20 p-8 shadow-[inset_10px_-50px_94px_0_rgb(199,199,199,0.2)] backdrop-blur">
        <BookSectionTitle title={"New Arrival"} />
        {isFetching ? (
          <div className="my-10 flex justify-center">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-t-primary"></div>
          </div>
        ) : error ? (
          <p className="text-center">Error loading new books</p>
        ) : (
          <BookSectionSlider
            items={newBooks?.slice(0, 10)}
            viewAllLink="/all-books"
          />
        )}
      </section>

      {/* Category Grid */}
      <section>
        <HomePageCategoryGrid books={books} />
      </section>

      {/* Recently Viewed Section */}
      {recentViewedBooks?.length > 0 && (
        <section className="z-10 mt-10 rounded-xl bg-gradient-to-r from-purple-400 to-teal-400 p-8 shadow-md sm:mx-5">
          <BookSectionTitle title={"Recently Viewed"} />
          <RecentlyViewBookSlider
            items={recentViewedBooks} // Pass the recently viewed books
          />
        </section>
      )}

      <section className="mt-10 flex flex-col p-8 text-center">
        <BookSectionTitle title={"All Category"} />
        <div className="flex flex-wrap justify-center gap-3 text-center">
          {categoriesName?.map((categories, idx) => (
            <Link
              href={`/category/${categories.Genre}`}
              className="rounded-sm border border-primary bg-secondary px-10 py-4 hover:bg-primary hover:duration-300 hover:ease-linear"
              key={idx}
            >
              {categories.Genre}
            </Link>
          ))}
        </div>
      </section>

      {/* New Best Sellers Books Slider */}
      <section className="z-10 mt-10 rounded-xl border-b-4 border-primary bg-white/20 p-8 shadow-[inset_10px_-50px_94px_0_rgb(199,199,199,0.2)] backdrop-blur">
        <BookSectionTitle title={"Best Sellers"} />
        <BookSectionSlider
          items={books?.slice(0, 10)}
          viewAllLink={"/all-books"}
        />
      </section>

      {/* Top of the month Books Slider */}
      <section className="z-10 mb-10 mt-10 rounded-xl border-b-4 border-primary bg-white/20 p-8 shadow-[inset_10px_-50px_94px_0_rgb(199,199,199,0.2)] backdrop-blur">
        <BookSectionTitle title={"Top of Month"} />
        <BookSectionSlider
          viewAllLink={"/all-books"}
          items={books?.slice(0, 10)} // Show 10 books
          renderCard={(book) => <Card book={book} />} // Pass how you want to render the card
        />
      </section>
      <section className="z-10 mt-10 rounded-xl border-b-4 border-primary bg-white/20 p-8 shadow-[inset_10px_-50px_94px_0_rgb(199,199,199,0.2)] backdrop-blur">
        <AuthorSectionTitle title={"Author"} />
        <AuthorSectionSlide items={authors?.slice(0, 10)} />
      </section>
    </div>
  );
};

export default HomePage;
