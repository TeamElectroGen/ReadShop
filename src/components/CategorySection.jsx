import Image from "next/image";
import Link from "next/link";
import React, { useRef, useState } from "react";
import { Button } from "./ui/button";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import { Navigation } from "swiper/modules";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";

const CategorySection = ({ books: allBooks }) => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const swiperRef = useRef(null);

  const filteredBooks =
    selectedCategory === "all"
      ? allBooks
      : allBooks?.filter((book) =>
          book.Genre.split(", ").includes(selectedCategory)
        );

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const uniqueCategories = [
    ...new Set(
      allBooks?.flatMap((book) => book.Genre.split(", ").map((genre) => genre))
    ),
  ];

  const handlePrev = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      const swiper = swiperRef.current.swiper;
      const slidesToMove = swiper.params.slidesPerView;
      swiper.slideTo(Math.max(swiper.activeIndex - slidesToMove, 0));
    }
  };

  const handleNext = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      const swiper = swiperRef.current.swiper;
      const slidesToMove = swiper.params.slidesPerView;
      swiper.slideTo(
        Math.min(swiper.activeIndex + slidesToMove, swiper.slides.length - 1)
      );
    }
  };

  return (
    <>
      <div className="grid grid-cols-2 gap-2 text-center text-xs sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-6 xl:grid-cols-8">
        {/* Button for 'All Books' */}
        <Button
          onClick={() => handleCategorySelect("all")}
          className={`rounded-sm border border-primary py-1 text-xs ${
            selectedCategory === "all" ? "bg-primary" : "bg-secondary"
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
              selectedCategory === category ? "bg-primary" : "bg-secondary"
            } hover:bg-primary hover:duration-300 hover:ease-linear`}
          >
            {category}
          </Button>
        ))}
      </div>

      <div className="relative mt-5">
        <Swiper
          ref={swiperRef}
          spaceBetween={16}
          slidesPerView={1}
          navigation={false}
          modules={[Navigation]}
          breakpoints={{
            320: { slidesPerView: 2, spaceBetween: 16 },
            400: { slidesPerView: 3, spaceBetween: 16 },
            768: { slidesPerView: 5, spaceBetween: 16 },
            1024: { slidesPerView: 6, spaceBetween: 16 },
            1280: { slidesPerView: 8, spaceBetween: 16 },
          }}
        >
          {filteredBooks?.map((book) => (
            <SwiperSlide key={book._id}>
              <div>
                <Link
                  href={`/view-details/${book?._id}`}
                  className="relative h-60 hover:cursor-pointer"
                >
                  <Image
                    src={book.CoverImage}
                    alt={book.BookName}
                    width={150}
                    height={220}
                    className="h-60 w-full rounded-sm object-cover"
                  />
                  <div className="absolute bottom-0 z-10 flex h-14 w-full flex-col rounded-b-sm bg-primary pb-3 text-center shadow-sm">
                    <h2 className="flex-1 truncate px-2 pt-2 text-sm font-bold">
                      {book.BookName}
                    </h2>
                    <p className="text-xs">{book.AuthorName}</p>
                  </div>
                </Link>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="absolute top-[42%] z-10 flex h-fit w-fit items-center justify-between">
          <Button
            onClick={handlePrev}
            className="h-10 w-10 rounded-l-none bg-secondary p-0 shadow-lg"
          >
            <FaAngleLeft />
          </Button>
        </div>
        <div className="absolute right-0 top-[42%] z-10 flex h-fit w-fit items-center justify-between">
          <Button
            onClick={handleNext}
            className="h-10 w-10 rounded-r-none bg-secondary p-0 shadow-lg"
          >
            <FaAngleRight />
          </Button>
        </div>
      </div>

      <div className="mt-5 flex">
        <Link
          href={
            selectedCategory === "all"
              ? `/all-books`
              : `/category/${selectedCategory}`
          }
          className="w-full rounded-sm border border-primary py-2 text-center font-bold transition-all duration-300 hover:bg-yellow-400 hover:shadow-sm"
        >
          View All From{" "}
          {selectedCategory === "all" ? "All Books" : selectedCategory}
        </Link>
      </div>
    </>
  );
};

export default CategorySection;
