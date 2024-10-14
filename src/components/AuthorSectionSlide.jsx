import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Link from "next/link";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { Button } from "./ui/button";

import AuthorCard from "./AuthorCard";

const AuthorSectionSlide = ({ items, viewAllLink }) => {
  // console.log(items);
  const swiperRef = useRef(null);

  const handlePrev = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slidePrev();
    }
  };

  const handleNext = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideNext();
    }
  };

  return (
    <div className="slider-container relative">
      {/* Navigation Buttons */}
      <div className="absolute -right-2 z-10 -mt-14 flex gap-2 md:-top-3 md:right-0">
        <Button
          onClick={handlePrev}
          variant="outline"
          size="icon"
          className="hover:bg-primary/60"
        >
          <FaArrowLeft />
        </Button>
        <Button
          onClick={handleNext}
          variant="outline"
          size="icon"
          className="hover:bg-primary/60"
        >
          <FaArrowRight />
        </Button>
      </div>

      {/* Swiper Slider */}
      <Swiper
        ref={swiperRef}
        spaceBetween={20}
        slidesPerView={1}
        navigation={false}
        modules={[Navigation]}
        breakpoints={{
          320: { slidesPerView: 1, spaceBetween: 10 },
          425: { slidesPerView: 2, spaceBetween: 10 },
          768: { slidesPerView: 3, spaceBetween: 20 },
          1024: { slidesPerView: 4, spaceBetween: 30 },
          1280: { slidesPerView: 5, spaceBetween: 20 },
        }}
      >
        {/* Render all the book items */}
        {items?.map((author) => (
          <SwiperSlide key={author._id}>
            <AuthorCard key={author._id} author={author} />
          </SwiperSlide>
        ))}
        {/* Add a "View All" button as the last card */}
        <SwiperSlide className="rounded-md bg-secondary">
          <div className="flex h-[190px] items-center justify-center">
            <Link
              href={`${viewAllLink}`}
              className="rounded-md bg-primary-foreground/80 px-5 py-2 text-white hover:bg-primary-foreground"
            >
              View All
            </Link>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default AuthorSectionSlide;
