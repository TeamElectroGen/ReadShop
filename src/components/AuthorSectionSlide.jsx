import { useRef } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Button } from "./ui/button";

import AuthorCard from "./AuthorCard";

const AuthorSectionSlide = ({ items }) => {
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
        {items?.slice(0, 10)?.map((author) => (
          <SwiperSlide key={author._id}>
            <AuthorCard key={author._id} author={author} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default AuthorSectionSlide;
