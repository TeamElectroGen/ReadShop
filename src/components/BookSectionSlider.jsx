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
        <div className="relative slider-container">
            {/* Navigation Buttons */}
            <div className="absolute -mt-14 md:-top-2 gap-2 -right-2 md:right-0 z-10 flex p-2">
                <button
                    onClick={handlePrev}
                    className="bg-primary hover:shadow-md text-black font-bold text-sm px-2 py-1 md:py-2 md:px-4 rounded"
                >
                    <FaArrowLeft />
                </button>
                <button
                    onClick={handleNext}
                    className="bg-primary bg-pri hover:shadow-md text-black font-bold text-sm px-2 py-1 md:py-2 md:px-4 rounded"
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
                {items.map((item, idx) => (
                    <SwiperSlide key={idx}>{renderCard(item)}</SwiperSlide>
                ))}
                {/* Add a "View All" button as the last card */}
                <SwiperSlide className="bg-secondary rounded-md">
                    <div className="flex items-center justify-center h-96">
                        <Link href={`${viewAllLink}`} className="bg-primary-foreground/80 px-5 py-2 rounded-md text-white hover:bg-primary-foreground">
                            View All
                        </Link>
                    </div>
                </SwiperSlide>
            </Swiper>
        </div>
    );
};

export default BookSectionSlider;
