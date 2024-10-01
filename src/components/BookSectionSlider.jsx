import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Link from "next/link";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";

const BookSectionSlider = ({ items, renderCard, viewAllLink }) => {
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
      <div className="absolute -right-2 z-10 -mt-14 flex gap-2 p-2 md:-top-2 md:right-0">
        <button
          onClick={handlePrev}
          className="rounded bg-primary px-2 py-1 text-sm font-bold text-black hover:shadow-md md:px-4 md:py-2"
        >
          <FaArrowLeft />
        </button>
        <button
          onClick={handleNext}
          className="bg-pri rounded bg-primary px-2 py-1 text-sm font-bold text-black hover:shadow-md md:px-4 md:py-2"
        >
          <FaArrowRight />
        </button>
      </div>

      {/* Swiper Slider */}
      <Swiper
        ref={swiperRef}
        spaceBetween={20}
        slidesPerView={2}
        navigation={false}
        modules={[Navigation]}
        breakpoints={{
          640: { slidesPerView: 2, spaceBetween: 10 },
          768: { slidesPerView: 3, spaceBetween: 20 },
          1024: { slidesPerView: 5, spaceBetween: 30 },
          1280: { slidesPerView: 5, spaceBetween: 20 },
        }}
      >
        {/* Render all the book items */}
        {items?.map((item, idx) => (
          <SwiperSlide key={idx}>{renderCard(item)}</SwiperSlide>
        ))}
        {/* Add a "View All" button as the last card */}
        <SwiperSlide className="rounded-md bg-secondary">
          <div className="flex h-96 items-center justify-center">
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

export default BookSectionSlider;
