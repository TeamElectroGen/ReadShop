"use client";
import Label from "@/components/Label";
import React, { useEffect, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import Card from "@/components/Card";
// import books from "@/data/books.json";


const HomePage = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    // Fetching books.json from the public folder
    const fetchBooks = async () => {
      const res = await fetch("/books.json"); // public/books.json path
      const data = await res.json();
      setBooks(data);
    };

    fetchBooks();
  }, []);
  return (
    <div className="space-y-4">
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
      <section className="relative container mx-auto  bg-[#d9d9d9] p-5">
        <div className="flex items-center justify-between">
          {/* label */}
          <Label name="Popular Books" />
          {/* pagination / carousel */}
          
            <button className="absolute left-0 top-1/2 -translate-y-1/2 z-10 h-24 text-3xl bg-white p-2">
              <FaAngleLeft />
            </button>
             
            <button className="absolute right-0 top-1/2 -translate-y-1/2 z-10 h-24 text-3xl bg-white p-2">
              <FaAngleRight />
            </button>
            
         
        </div>
        {/* cards */}
        <div className="mt-5 grid grid-cols-2 gap-5 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7">
        {books.slice(0, 5).map((book, idx) => (
            <Card key={idx} book={book} />
          ))}
        </div>
      </section>

      {/*All books cards*/}
      <section className="container mx-auto  bg-[#d9d9d9] p-5">
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
        <div className="mt-5 grid grid-cols-2 gap-5 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7">
        {books.map((book, idx) => (
            <Card key={idx} book={book} />
          ))}
        </div>
      </section>

      {/* TODO: a Hero Type Section */}
      <section></section>

      {/*Another Section cards*/}
      <section className="container mx-auto  bg-[#d9d9d9] p-5">
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
        <div className="mt-5 grid grid-cols-2 gap-5 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7">
        {books.map((book, idx) => (
            <Card key={idx} book={book} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
