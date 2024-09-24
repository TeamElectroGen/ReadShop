import Label from "@/components/Label";
import React from "react";
// import { IoIosSearch } from "react-icons/io";
import {
  FaAngleDown,
  FaAngleLeft,
  FaAngleRight,
  FaAngleUp,
} from "react-icons/fa6";
import Card from "@/components/Card";
import WideCard from "@/components/WideCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { IoMdSearch } from "react-icons/io";
import { IoFilter } from "react-icons/io5";

const HomePage = () => {
  const a = [...Array(2).keys()];
  const b = [...Array(4).keys()];
  const c = [...Array(7).keys()];

  return (
    <section>
      <div className="space-y-5">
        {/*Search & Filter Banner*/}
        <section className="container mt-16 flex flex-col items-center justify-center text-center">
          <h1 className="font-sans scroll-m-20 text-4xl font-extrabold tracking-tight sm:text-6xl">
            Discover & Explore <br />{" "}
            <span className="yellow_gradient">A world of books</span>
          </h1>
          <p className="text-md mt-5 max-w-2xl text-muted-foreground sm:text-xl">
            Discover a diverse collection of books to suit every reader.
            Explore, shop, and enjoy stories that inspire and entertain.
          </p>
          {/* Search and filter */}
          <div className="mt-8 flex w-full max-w-lg items-center justify-center gap-2 bg-background/50 backdrop-blur-md py-4 px-5 rounded-xl">
            <div className="relative ml-auto flex-1 md:grow-0">
              <IoMdSearch className="absolute left-2.5 top-3.5 size-6 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search by name, author.."
                className="w-full rounded-lg bg-background p-6 pl-9 md:w-[370px] lg:w-[360px]"
              />
            </div>
            <Button variant="secondary" size="lg" className="p-6">
              <IoFilter className="mr-2 size-4" />
              Filter
            </Button>
          </div>
        </section>

        {/*Popular books cards*/}
        <section className="container mx-auto h-[391px] bg-[#d9d9d9] p-5">
          <div className="flex items-center justify-between">
            {/* label */}
            <Label name="Popular Books" />
            {/* pagination / carousel */}
            <div className="flex items-center gap-2 *:bg-white *:p-2">
              <button>
                <FaAngleLeft />
              </button>
              <button>
                <FaAngleRight />
              </button>
            </div>
          </div>
          {/* cards */}
          <div className="mt-5 grid grid-cols-2 gap-5 md:hidden md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7">
            {a.map((data, idx) => (
              <Card data={data} key={idx} />
            ))}
          </div>
          {/* cards for mobile */}
          <div className="mt-5 hidden grid-cols-2 gap-5 md:grid md:grid-cols-4 lg:hidden lg:grid-cols-5 xl:grid-cols-7">
            {b.map((data, idx) => (
              <Card data={data} key={idx} />
            ))}
          </div>
          {/* cards for desktop */}
          <div className="mt-5 hidden grid-cols-2 gap-5 md:grid-cols-4 lg:grid lg:grid-cols-5 xl:grid-cols-7">
            {c.map((data, idx) => (
              <Card data={data} key={idx} />
            ))}
          </div>
        </section>

        {/*All books cards*/}
        <section className="container mx-auto h-[391px] bg-[#d9d9d9] p-5">
          <div className="flex items-center justify-between">
            {/* label */}
            <Label name="Books" />
            {/* pagination / carousel */}
            <div className="flex items-center gap-2 *:bg-white *:p-2">
              <button>
                <FaAngleLeft />
              </button>
              <button>
                <FaAngleRight />
              </button>
            </div>
          </div>
          {/* cards for mobile */}
          <div className="mt-5 grid grid-cols-2 gap-5 md:hidden md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7">
            {a.map((data, idx) => (
              <Card data={data} key={idx} />
            ))}
          </div>
          {/* cards for tablet */}
          <div className="mt-5 hidden grid-cols-2 gap-5 md:grid md:grid-cols-4 lg:hidden lg:grid-cols-5 xl:grid-cols-7">
            {b.map((data, idx) => (
              <Card data={data} key={idx} />
            ))}
          </div>
          {/* cards for lg */}
          <div className="mt-5 hidden grid-cols-2 gap-5 md:grid-cols-4 lg:grid lg:grid-cols-5 xl:grid-cols-7">
            {c.map((data, idx) => (
              <Card data={data} key={idx} />
            ))}
          </div>
        </section>

        {/* TODO: a Hero Type Section */}
        <section className="container mx-auto flex flex-col items-center justify-between gap-5 lg:flex-row">
          <div className="relative h-[348px] w-[394px] bg-[#d9d9d9] p-3 lg:h-[911px] lg:w-[582px] lg:p-6">
            <div className="space-y-4">
              <Label name="Most"></Label>
              <div className="hidden flex-col gap-4 lg:flex">
                {[...Array(6).keys()].map((data, idx) => (
                  <WideCard data={data} key={idx} />
                ))}
              </div>
            </div>
            <div className="flex items-center gap-2 *:bg-white *:p-2 lg:hidden">
              <button>
                <FaAngleLeft />
              </button>
              <button>
                <FaAngleRight />
              </button>
            </div>
            {/* large devices */}
            <div className="absolute right-5 top-5 flex h-[880px] flex-col items-center justify-between gap-2 *:bg-white *:p-2">
              <button>
                <FaAngleUp />
              </button>
              <button>
                <FaAngleDown />
              </button>
            </div>
          </div>
          <div className="flex justify-between gap-4 *:w-[123px] *:bg-[#d9d9d9] lg:flex-col lg:gap-5 *:lg:w-[573px]">
            <div className="h-[124px] lg:h-[265px]"></div>
            <div className="h-[124px] lg:h-[298px]"></div>
            <div className="h-[124px] lg:h-[306px]"></div>
          </div>
          <div className="h-[141px] w-[394px] bg-[#d9d9d9] lg:h-[911px] lg:w-[265px]"></div>
        </section>

        {/*Another Section cards*/}
        <section className="container mx-auto h-[391px] bg-[#d9d9d9] p-5">
          <div className="flex items-center justify-between">
            {/* label */}
            <Label name="Books" />
            {/* pagination / carousel */}
            <div className="flex items-center gap-2 *:bg-white *:p-2">
              <button>
                <FaAngleLeft />
              </button>
              <button>
                <FaAngleRight />
              </button>
            </div>
          </div>
          {/* cards for mobile */}
          <div className="mt-5 grid grid-cols-2 gap-5 md:hidden md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7">
            {a.map((data, idx) => (
              <Card data={data} key={idx} />
            ))}
          </div>
          {/* cards for tablet */}
          <div className="mt-5 hidden grid-cols-2 gap-5 md:grid md:grid-cols-4 lg:hidden lg:grid-cols-5 xl:grid-cols-7">
            {b.map((data, idx) => (
              <Card data={data} key={idx} />
            ))}
          </div>
          {/* cards for lg */}
          <div className="mt-5 hidden grid-cols-2 gap-5 md:grid-cols-4 lg:grid lg:grid-cols-5 xl:grid-cols-7">
            {c.map((data, idx) => (
              <Card data={data} key={idx} />
            ))}
          </div>
        </section>
      </div>
    </section>
  );
};

export default HomePage;
