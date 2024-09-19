import Label from "@/components/Label";
import React from "react";
import { IoIosSearch } from "react-icons/io";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import Card from "@/components/Card";

const HomePage = () => {
  const a = [...Array(7).keys()];
  return (
    <div className="space-y-4">
      {/*Search & Filter Banner*/}
      <section className="flex h-[335px] items-center justify-center bg-[#8b8585]">
        <div className="flex h-[110px] w-[942px] items-center justify-center gap-5 bg-[#d9d9d9]">
          <div className="relative w-[708px] bg-white">
            {/* search input */}
            <input type="text" className="p-5" placeholder="Search" />
            {/* search icon */}
            <IoIosSearch className="absolute right-5 top-[30%] text-3xl" />
          </div>
          {/* filter button */}
          <button className="w-[177px] bg-white p-5">Filter</button>
        </div>
      </section>

      {/*Popular books cards*/}
      <section className="mx-4 h-[391px] bg-[#d9d9d9] p-5">
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
        <div className="mt-5 flex items-center justify-center gap-5">
          {a.map((data, idx) => (
            <Card data={data} key={idx} />
          ))}
        </div>
      </section>

      {/*All books cards*/}
      <section className="mx-4 h-[391px] bg-[#d9d9d9] p-5">
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
        {/* cards */}
        <div className="mt-5 flex items-center justify-center gap-5">
          {a.map((data, idx) => (
            <Card data={data} key={idx} />
          ))}
        </div>
      </section>

      {/* TODO: a Hero Type Section */}

      {/*Another Section cards*/}
      <section className="mx-4 h-[391px] bg-[#d9d9d9] p-5">
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
        {/* cards */}
        <div className="mt-5 flex items-center justify-center gap-5">
          {a.map((data, idx) => (
            <Card data={data} key={idx} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
