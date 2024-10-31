import Link from "next/link";
import { useRef } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Card from "./Card";
import { Button } from "./ui/button";

const BookSectionSlider = ({ items, viewAllLink, specialClass }) => {
  const swiperRef = useRef(null);

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
        spaceBetween={16}
        slidesPerView={1}
        navigation={false}
        modules={[Navigation, Autoplay]}
        breakpoints={{
          320: { slidesPerView: 1, spaceBetween: 16 },
          400: { slidesPerView: 2, spaceBetween: 16 },
          768: { slidesPerView: 3, spaceBetween: 16 },
          1024: { slidesPerView: 4, spaceBetween: 16 },
          1280: { slidesPerView: 5, spaceBetween: 16 },
        }}
      >
        {/* Render all the book items */}
        {items?.slice(0, 10)?.map((item) => (
          <SwiperSlide key={item._id}>
            <div className="mx-auto w-fit">
              <Card key={item._id} book={item} />
            </div>
          </SwiperSlide>
        ))}
        {/* Add a "View All" button as the last card */}
        <SwiperSlide
          className={`rounded-md border bg-secondary ${specialClass}`}
        >
          <div className="flex h-[25rem] items-center justify-center lg:h-[25.1rem]">
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
