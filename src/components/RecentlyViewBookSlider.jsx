import React from "react";
import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { Button } from "./ui/button";
import Card from "./Card";

const RecentlyViewBookSlider = ({ items }) => {
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
          className="size-7 hover:bg-primary/60 md:size-9"
        >
          <FaArrowLeft />
        </Button>
        <Button
          onClick={handleNext}
          variant="outline"
          size="icon"
          className="size-7 hover:bg-primary/60 md:size-9"
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
        {items?.map((item) => (
          <SwiperSlide key={item._id}>
            <div className="mx-auto w-fit">
              <Card key={item._id} book={item} />
            </div>
          </SwiperSlide>
        ))}
        {/* Add a "View All" button as the last card */}
      </Swiper>
    </div>
  );
};

export default RecentlyViewBookSlider;
