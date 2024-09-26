"use client";
import { getBookDetails } from "@/services/getBooksData";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const ViewDetails = ({ bookid }) => {
  const [detailsBook, setDetailsBook] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const { bookDetails } = await getBookDetails(bookid);
      setDetailsBook(bookDetails);
    };
    fetch();
  }, [bookid]);
  console.log(detailsBook);
  return (
    <div>
      <div className="max-w-sm mx-auto bg-white rounded-lg shadow-md overflow-hidden">
      <div className="flex justify-center bg-green-100">
        <Image src={detailsBook.CoverImage} alt={detailsBook.BookName} width={200} height={300} />
      </div>
      <div className="p-5">
        <div className="flex justify-between items-center">
          <span className="text-green-600 text-xs font-semibold">{detailsBook.category}</span>
          <span className="bg-red-200 text-red-800 text-xs px-2 inline-block rounded-full">{detailsBook.discount}% OFF</span>
        </div>
        <h3 className="mt-2 text-lg font-bold">{detailsBook.title} ({detailsBook.language})</h3>
        <div className="flex items-center mt-2">
          <div className="bg-yellow-400 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded">
            {detailsBook.rating} Stars ({detailsBook.reviews} Reviews)
          </div>
          <div className="text-sm text-gray-500">by {detailsBook.author}</div>
        </div>
        <div className="flex justify-between items-center mt-3">
          <span className="text-xl font-bold text-green-800">৳{detailsBook.price}</span>
          <span className="text-xs text-gray-500">You Save ৳{detailsBook.discountAmount} ({detailsBook.discount}%)</span>
        </div>
        <div className="mt-3">
          <button className="text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
            Add to Cart
          </button>
          <button className="text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2">
            Add to Booklist
          </button>
        </div>
      </div>
    </div>
    </div>
  );
};

export default ViewDetails;
