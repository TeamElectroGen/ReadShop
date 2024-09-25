"use client";
import Label from "@/components/Label";
import React, { useEffect, useState } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { FaTimes } from "react-icons/fa";
import Card from "@/components/Card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { IoMdSearch } from "react-icons/io";
import { IoFilter } from "react-icons/io5";

const HomePage = () => {
  const [books, setBooks] = useState([]);
  // const [currentIndex,setCurrentIndex]= useState(0)
  const [popularIndex,setPopularIndex]=useState(0)
  const [allBooksIndex,setAllBooksIndex]=useState(0)
  const [bestSellersIndex,setBestSellersIndex]=useState(0)
  const [newPublishedIndex,setNewPublishedIndex]=useState(0)

  useEffect(() => {
    // Fetching books.json from the public folder
    const fetchBooks = async () => {
      const res = await fetch("/books.json"); // public/books.json path
      const data = await res.json();
      setBooks(data);
    };

    fetchBooks();
  }, []);
  // const handlePrev= ()=>{
  //   setCurrentIndex((prevIndex)=>(prevIndex > 0 ? prevIndex - 1 : 0));
  // }
  // const handleNext=()=>{
  //   setCurrentIndex((prevIndex)=>(prevIndex < books.length - 6 ? prevIndex + 1 : prevIndex));
  // }
  const handlePrev=(section)=>{
    if(section==="popular"){
      setPopularIndex((prevIndex)=>prevIndex>0?prevIndex-1:0)
    }else if(section==="allBooks"){
      setAllBooksIndex((prevIndex)=>prevIndex>0?prevIndex-1:0)
    }else if(section==="bestSellers"){
      setBestSellersIndex((prevIndex)=>prevIndex>0?prevIndex-1:0)
    }else if(section==="newPublished"){
      setNewPublishedIndex((prevIndex)=>prevIndex>0?prevIndex-1:0)
    }
  }
  const handleNext=(section,length)=>{
    if(section==="popular"){
      setPopularIndex((prevIndex)=>prevIndex<length-6?prevIndex+1:prevIndex)
    }else if(section==="allBooks"){
      setAllBooksIndex((prevIndex) =>
        prevIndex < length - 7 ? prevIndex + 1 : prevIndex
      );
    }else if (section === "bestSellers") {
      setBestSellersIndex((prevIndex) =>
        prevIndex < length - 7 ? prevIndex + 1 : prevIndex
      );
    } else if (section === "newPublished") {
      setNewPublishedIndex((prevIndex) =>
        prevIndex < length - 7 ? prevIndex + 1 : prevIndex
      );
    }
  }
  return (
      <div className="space-y-5">
        {/*Search & Filter Banner*/}
        <section className="container mt-16 flex flex-col items-center justify-center text-center">
          <h1 className="scroll-m-20 font-sans text-4xl font-extrabold leading-[1.15] tracking-tight sm:text-6xl">
            Discover & Explore <br />{" "}
            <span className="yellow_gradient">A world of books</span>
          </h1>
          <p className="text-md mt-5 max-w-2xl text-muted-foreground sm:text-xl">
            Discover a diverse collection of books to suit every reader.
            Explore, shop, and enjoy stories that inspire and entertain.
          </p>
          {/* Search and filter */}
          <div className="mt-8 flex border-2 border-white/50 w-full max-w-lg items-center justify-center gap-2 rounded-xl bg-background/50 px-5 py-4 backdrop-blur-md">
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
      <section className="relative container mx-auto bg-[#d9d9d9] p-5">
        <div className="flex items-center justify-center">
          {/* label */}
          <Label name="Popular Books" />
          {/* pagination / carousel */}
          
            <button onClick={()=>handlePrev('popular')} disabled={popularIndex === 0}  className="absolute left-0 top-1/2 -translate-y-1/2 z-10 h-24 text-3xl bg-white p-2">
            {popularIndex === 0 ? <FaTimes /> : <FaAngleLeft />}
            </button>
             
            <button onClick={()=>handleNext("popular",books.length)} disabled={popularIndex >= books.length-6} className="absolute right-0 top-1/2 -translate-y-1/2 z-10 h-24 text-3xl bg-white p-2">
            {popularIndex >= books.length - 6 ? <FaTimes /> : <FaAngleRight />}
            </button>
            
         
        </div>
        {/* cards */}
        <div className="mt-5 grid justify-center items-center grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {books.slice(popularIndex,popularIndex+6).map((book, idx) => (
            <Card key={idx} book={book} />
          ))}
        </div>
      </section>

      {/*All books cards*/}
      <section className="relative container mx-auto  bg-[#d9d9d9] p-5">
        <div className="flex items-center justify-center">
          {/* label */}
          <Label name="Books" />
          {/* pagination / carousel */}
          
            <button onClick={()=>handlePrev("allBooks")} disabled={allBooksIndex === 0} className="absolute left-0 top-1/2 -translate-y-1/2 z-10 h-24 text-3xl bg-white p-2">
            {allBooksIndex === 0 ? <FaTimes /> : <FaAngleLeft />}
            </button>
            <button onClick={() => handleNext("allBooks", books.length)}
            disabled={allBooksIndex >= books.length - 7} className="absolute right-0 top-1/2 -translate-y-1/2 z-10 h-24 text-3xl bg-white p-2">
            {allBooksIndex >= books.length - 7 ? <FaTimes /> : <FaAngleRight />}
            </button>
          
        </div>
        {/* cards */}
        <div className="mt-5 grid grid-cols-2 gap-5 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7">
        {books.slice(allBooksIndex,allBooksIndex+7).map((book, idx) => (
            <Card key={idx} book={book} />
          ))}
        </div>
      </section>

      {/* TODO: a Hero Type Section */}
      <section></section>

      {/*Best sellers Books Section cards*/}
      <section className="relative container mx-auto  bg-[#d9d9d9] p-5">
        <div className="flex items-center justify-center">
          {/* label */}
          <Label name="Best sellers Books" />
          {/* pagination / carousel */}
          
            <button onClick={() => handlePrev("bestSellers")}
            disabled={bestSellersIndex === 0} className="absolute left-0 top-1/2 h-24 text-3xl bg-white p-2">
            {bestSellersIndex === 0 ? <FaTimes /> : <FaAngleLeft />}
            </button>
            <button  onClick={() => handleNext("bestSellers", books.length)}
            disabled={bestSellersIndex >= books.length - 7} className="absolute right-0 top-1/2 h-24 text-3xl bg-white p-2">
            {bestSellersIndex >= books.length - 7 ? <FaTimes /> : <FaAngleRight />}
            </button>
          
        </div>
        {/* cards */}
        <div className="mt-5 grid grid-cols-2 gap-5 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7">
        {books.slice(bestSellersIndex,bestSellersIndex+7).map((book, idx) => (
            <Card key={idx} book={book} />
          ))}
        </div>
      </section>

      {/*New published books Section*/}
      <div className="relative container mx-auto  bg-[#d9d9d9] p-5">
        <div className="flex items-center justify-center">
          {/* label */}
          <Label name="New published books" />
          {/* pagination / carousel */}
          
            <button onClick={() => handlePrev("newPublished")}
            disabled={newPublishedIndex === 0} className="absolute left-0 top-1/2 h-24 text-3xl bg-white p-2">
            {newPublishedIndex === 0 ? <FaTimes /> : <FaAngleLeft />}
            </button>
            <button  onClick={() => handleNext("newPublished", books.length)}
            disabled={newPublishedIndex >= books.length - 7} className="absolute right-0 top-1/2 h-24 text-3xl bg-white p-2">
            {newPublishedIndex >= books.length - 7 ? <FaTimes /> : <FaAngleRight />}
            </button>
          
        </div>
        {/* cards */}
        <div className="mt-5 grid grid-cols-2 gap-5 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7">
        {books.slice(newPublishedIndex,newPublishedIndex+7).map((book, idx) => (
            <Card key={idx} book={book} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;