"use client";
import { getBookDetails } from "@/services/getBooksData";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FaBookOpen } from "react-icons/fa";
import { FaCartShopping, FaRegHeart } from "react-icons/fa6";
// import { FaShoppingCart } from "react-icons/fa";


const ViewDetails = ({ bookid }) => {
  const [detailsBook, setDetailsBook] = useState({}); // Initialize as an empty object

  useEffect(() => {
    const fetch = async () => {
      const { bookDetails } = await getBookDetails(bookid);
      setDetailsBook(bookDetails);
    };
    fetch();
  }, [bookid]);

  return (
    <div className="max-w-5xl mx-auto p-6 bg-gray-100 rounded-lg shadow-lg">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 ">
        {/* Left Side - Book Image */}
        <div className="flex justify-center items-center">
          <Image
            src={detailsBook.CoverImage}
            alt={detailsBook.BookName}
            width={400}
            height={550}
            className="rounded-lg shadow-md"
          />
        </div>

        {/* Right Side - Book Details */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold text-gray-800">{detailsBook.BookName}</h1>
          <p className="text-gray-600 mt-2">by {detailsBook.AuthorName}</p>
          <div className="flex items-center mt-4">
            <span className="bg-yellow-400 text-sm font-semibold px-2.5 py-0.5 rounded">
              {detailsBook.Rating} Stars
            </span>
            <span className="text-gray-500 ml-2 font-bold">| 3 Reviews</span>
          </div>

          {/* Book Description */}
          <p className="mt-4 text-gray-600">{detailsBook.Description}</p>

          {/* Additional Details */}
          <div className="mt-4">
            <p className="text-sm text-gray-500">
              <span className="font-semibold">Published by:</span> {detailsBook.PublicationName}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              <span className="font-semibold">Publish Date:</span> {new Date(detailsBook.PublishDate).toDateString()}
            </p>
          </div>

          {/* Price & Add to Cart Buttons */}
          <div className="flex items-center justify-between mt-6">
            <span className="text-2xl font-bold text-green-700">৳{detailsBook.Price}</span>
          </div>

          <div className="mt-4 flex space-x-4">
           {/* Add to Cart Button */}
           <button className="flex-1 flex items-center justify-center text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-lg  px-5 py-2.5 text-center text-xl">
           <FaCartShopping className="mr-3 size-6" /> Add to Cart
        </button>

            {/* Add to Read List Button */}
            <button className="flex-1 flex items-center justify-center text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-ms px-2 py-2.5 text-center">
            <FaBookOpen className="mr-3 size-5" />Add to Read List
            </button>
          </div>
          {/* Add to Wish List Button */}
          <div className="mt-4">
        <button className=" flex items-center justify-center text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-xl px-5 py-2.5 text-center">
        <FaRegHeart className="mr-3 size-6" /> Add to Wishlist
        </button>
      </div>
        </div>
      </div>

      {/* Additional Section Below (if needed) */}
      <div className="mt-6 p-4 bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-gray-800">More Details</h2>
        <p className="text-gray-600 mt-2">Explore more information about the book, author, and publication here.</p>
      </div>
    </div>
  );
};

export default ViewDetails;
