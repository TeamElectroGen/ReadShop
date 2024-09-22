import Label from "@/components/Label";
import React from "react";
import { IoIosSearch } from "react-icons/io";
import {
  FaAngleDown,
  FaAngleLeft,
  FaAngleRight,
  FaAngleUp,
} from "react-icons/fa6";
import Card from "@/components/Card";
import WideCard from "@/components/WideCard";

const HomePage = () => {
  const a = [...Array(2).keys()];
  const b = [...Array(4).keys()];
  const c = [...Array(7).keys()];
  
  return (
    <div className="space-y-5">
      {/*Search & Filter Banner*/}
      <section className="flex h-[233px] items-center justify-center bg-[#d9d9d9] px-5 lg:mx-0 lg:h-[325px] lg:bg-[#8b8585]">
        <div className="flex items-center justify-center gap-5 bg-[#d9d9d9] lg:h-[110px] lg:w-[942px]">
          <div className="relative bg-white lg:w-[708px]">
            {/* search input */}
            <input type="text" className="w-full p-5" placeholder="Search" />
            {/* search icon */}
            <IoIosSearch className="absolute right-5 top-[30%] text-3xl" />
          </div>
          {/* filter button */}
          <button className="w-[177px] bg-white p-5">Filter</button>
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
        <div className="mt-5 md:hidden grid grid-cols-2 gap-5 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7">
          {a.map((data, idx) => (
            <Card data={data} key={idx} />
          ))}
        </div>
        {/* cards for mobile */}
        <div className="mt-5 hidden lg:hidden md:grid grid-cols-2 gap-5 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7">
          {b.map((data, idx) => (
            <Card data={data} key={idx} />
          ))}
        </div>
        {/* cards for desktop */}
        <div className="mt-5 hidden lg:grid grid-cols-2 gap-5 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7">
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
        <div className="mt-5 md:hidden grid grid-cols-2 gap-5 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7">
          {a.map((data, idx) => (
            <Card data={data} key={idx} />
          ))}
        </div>
        {/* cards for tablet */}
        <div className="mt-5 hidden lg:hidden md:grid grid-cols-2 gap-5 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7">
          {b.map((data, idx) => (
            <Card data={data} key={idx} />
          ))}
        </div>
        {/* cards for lg */}
        <div className="mt-5 hidden lg:grid grid-cols-2 gap-5 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7">
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
        <div className="mt-5 md:hidden grid grid-cols-2 gap-5 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7">
          {a.map((data, idx) => (
            <Card data={data} key={idx} />
          ))}
        </div>
        {/* cards for tablet */}
        <div className="mt-5 hidden lg:hidden md:grid grid-cols-2 gap-5 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7">
          {b.map((data, idx) => (
            <Card data={data} key={idx} />
          ))}
        </div>
        {/* cards for lg */}
        <div className="mt-5 hidden lg:grid grid-cols-2 gap-5 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7">
          {c.map((data, idx) => (
            <Card data={data} key={idx} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
