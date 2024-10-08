"use client";
import React, { useEffect, useState, useRef } from "react";
import { IoMdSearch } from "react-icons/io";
import { IoFilter } from "react-icons/io5";
import {
  getAllBooks,
  getAuthors,
  // getBookDetails,
  getBooksByIds,
  getCategories,
  getSearchBooks,
} from "@/services/getBooksData";
import Image from "next/image";
import Link from "next/link";
import BookSectionSlider from "@/components/BookSectionSlider";
import Card from "@/components/Card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import BookSectionTitle from "@/components/BookSectionTitle";
import RatingStar from "@/components/RatingStar";
import HomePageCategoryGrid from "@/components/HomePageCategoryGrid";
import AuthorSectionSlide from "@/components/AuthorSectionSlide";
import AuthorSectionTitle from "@/components/AuthorSectionTitle";

const HomePage = () => {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [searchItems, setSearchItems] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const dropdownRef = useRef(null); // Reference for dropdown
  const [recentViewedBooks, setRecentViewedBooks] = useState([]);
  const [authors, setAuthors] = useState([]);

  const [categoriesName, setCategoriesName] = useState([]);

  // recent viewed books
  useEffect(() => {
    const storedBooks =
      JSON.parse(localStorage.getItem("recentVisitedBooks")) || [];
    // console.log("storedBooks", storedBooks);
    const fetchRecentViewedBooks = async () => {
      try {
        const res = await getBooksByIds(storedBooks);
        setRecentViewedBooks(res.books);
        // console.log("res", res.books);
      } catch (error) {
        console.log(error);
      }
    };
    fetchRecentViewedBooks();
  }, []);

  // all books
  const fetchBooks = async () => {
    const { books } = await getAllBooks(); // public/books.json path
    setBooks(books);
    // console.log("books", books);
  };

  //fetch  all authors
  const fetchAllAuthors = async () => {
    const { authors } = await getAuthors();
    setAuthors(authors);
  };

  useEffect(() => {
    fetchBooks();
    fetchAllAuthors();
  }, []);
  // search books
  useEffect(() => {
    const handleSearch = async () => {
      if (search) {
        try {
          const { books } = await getSearchBooks(search);
          setSearchItems(books);
          setShowSearchResults(true);
        } catch (error) {
          console.log(error);
        }
      } else {
        setSearchItems([]);
        setShowSearchResults(false);
      }
    };
    handleSearch();
  }, [search]);

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

  useEffect(() => {
    const fetchCategory = async () => {
      const { categories } = await getCategories();
      setCategoriesName(categories);
    };

    fetchCategory();
  }, []);

  // console.log("categoriesName", categoriesName);

  return (
    <div className="md:container my-6">
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
          <Button variant="secondary" size="lg" className="p-6">
            <IoFilter className="mr-2 size-4" />
            Filter
          </Button>

          {/* Show search results dropdown */}
          {searchItems && showSearchResults && (
            <div className="absolute left-0 top-[4.2rem] z-50 mt-5 max-h-96 w-full overflow-scroll rounded-sm bg-white shadow-lg">
              {searchItems?.map((item, idx) => (
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
                      <p className="text-sm text-gray-500">{item.AuthorName}</p>
                      <RatingStar rating={`${item.Rating}`} />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* New Arrival Book Slider  (Albab updated this section) */}
      <section className="z-10 mt-10 rounded-xl border-b-4 border-primary bg-white/20 p-8 shadow-[inset_10px_-50px_94px_0_rgb(199,199,199,0.2)] backdrop-blur">
        <BookSectionTitle title={"New Arrival"} />
        <BookSectionSlider items={books?.slice(0, 10)} />
      </section>

      {/* Category Grid */}
      <section>
        <HomePageCategoryGrid books={books} />
      </section>

      {/* Recently Viewed Section */}
      {recentViewedBooks?.length > 0 && (
        <section className="z-10 mt-10 rounded-xl bg-gradient-to-r from-purple-400 to-teal-400 p-8 shadow-md">
          <BookSectionTitle title={"Recently Viewed"} />
          <BookSectionSlider
            items={recentViewedBooks} // Pass the recently viewed books
          />
        </section>
      )}

      <section className="mt-10 flex flex-col p-8 text-center">
        <BookSectionTitle title={"All Category"} />
        <div className="flex flex-wrap justify-center gap-3 text-center">
          {categoriesName.map((categories, idx) => (
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
        <BookSectionSlider items={books?.slice(0, 10)} />
      </section>

      {/* Top of the month Books Slider */}
      <section className="z-10 mb-10 mt-10 rounded-xl border-b-4 border-primary bg-white/20 p-8 shadow-[inset_10px_-50px_94px_0_rgb(199,199,199,0.2)] backdrop-blur">
        <BookSectionTitle title={"Top of Month"} />
        <BookSectionSlider
          viewAllLink={"/category/Fiction"}
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
