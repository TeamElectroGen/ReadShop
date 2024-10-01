import {
  getBookDetails,
  getReadWishStatusUser,
  patchRWList,
} from "@/services/getBooksData";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FaBookOpen, FaLongArrowAltRight } from "react-icons/fa";
import { FaCartShopping, FaRegHeart } from "react-icons/fa6";
// import { FaShoppingCart } from "react-icons/fa";

const ViewDetails = ({ bookid }) => {
  const [detailsBook, setDetailsBook] = useState({}); // Initialize as an empty object
  const [update, setUpdate] = useState(false);
  const [rWStatus, setRWStatus] = useState({});
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const { data } = useSession() || {};

  const handleAddToCartClick = () => {
    setIsAddedToCart(true);
  };

  const handleRWList = async (param) => {
    try {
      const res = await patchRWList(param, bookid, data?.user?.email);
      setUpdate(!update);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(rWStatus);

  // Function to handle storing the book id in local storage
  const handleLastVisitedBook = (id) => {
    let recentVisitedBooks =
      JSON.parse(localStorage.getItem("recentVisitedBooks")) || [];

    // Check if the book id is already existing
    if (recentVisitedBooks.includes(id)) {
      // Remove the existing book ID from the array
      recentVisitedBooks = recentVisitedBooks.filter((bookId) => bookId !== id);
    }

    // Add the book id to the start of the array
    recentVisitedBooks.unshift(id);

    // Save the updated array to local storage
    localStorage.setItem(
      "recentVisitedBooks",
      JSON.stringify(recentVisitedBooks)
    );
  };

  useEffect(() => {
    const fetch = async () => {
      const { readList, wishList } = await getReadWishStatusUser(
        bookid,
        data?.user?.email
      );
      setRWStatus({ readList, wishList });
    };
    fetch();
  }, [bookid, data?.user?.email, update]);

  useEffect(() => {
    const fetch = async () => {
      const { bookDetails } = await getBookDetails(bookid);
      setDetailsBook(bookDetails);
      const { readList, wishList } = await getReadWishStatusUser(
        bookid,
        data?.user?.email
      );
      setRWStatus({ readList, wishList });
    };
    fetch();
    handleLastVisitedBook(bookid);
  }, [bookid, data?.user?.email]);

  return (
    <div className="mx-auto max-w-5xl rounded-lg p-6 md:my-10 lg:my-20">
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {/* Left Side - Book Image */}
        <div className="flex items-center justify-center">
          <Image
            src={detailsBook.CoverImage}
            alt={detailsBook.BookName}
            width={300}
            height={500}
            className="rounded-lg shadow-md"
          />
        </div>

        {/* Right Side - Book Details */}
        <div className="rounded-lg bg-white p-6 shadow-md">
          <h1 className="text-2xl font-bold text-gray-800">
            {detailsBook.BookName}
          </h1>
          <p className="mt-2 text-gray-600">by {detailsBook.AuthorName}</p>
          <div className="mt-4 flex items-center">
            <span className="rounded bg-yellow-400 px-2.5 py-0.5 text-sm font-semibold">
              {detailsBook.Rating} Stars
            </span>
            <span className="ml-2 font-bold text-gray-500">| 3 Reviews</span>
          </div>

          {/* Book Description */}
          <p className="mt-4 text-gray-600">{detailsBook.Description}</p>

          {/* Additional Details */}
          <div className="mt-4">
            <p className="text-sm text-gray-500">
              <span className="font-semibold">Published by:</span>{" "}
              {detailsBook.PublicationName}
            </p>
            <p className="mt-1 text-sm text-gray-500">
              <span className="font-semibold">Publish Date:</span>{" "}
              {new Date(detailsBook.PublishDate).toDateString()}
            </p>
          </div>

          {/* Price & Add to Cart Buttons */}
          <div className="mt-6 flex items-center justify-between">
            <span className="text-2xl font-bold text-green-700">
              $ {detailsBook.Price}
            </span>
          </div>

          <div className="mt-4 flex space-x-4">
            {/* Add to Cart Button */}

            <button
              disabled={!data?.user?.email}
              className={`flex flex-1 items-center justify-center rounded-lg bg-blue-600 px-5 py-2.5 text-center text-sm font-medium text-white duration-300 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 ${isAddedToCart ? "bg-green-600 hover:bg-green-700" : "bg-blue-600 hover:bg-blue-700"}`}
              onClick={handleAddToCartClick}
            >
              {isAddedToCart ? (
                <>
                  <FaCartShopping className="mr-1 size-4" /> Go to Cart{" "}
                  <FaLongArrowAltRight className="ml-3 size-5" />
                </>
              ) : (
                <>
                  <FaCartShopping className="mr-1 size-4" /> Add to Cart
                </>
              )}
            </button>

            {/* Add to Read List Button */}
            <button
              disabled={!data?.user?.email}
              onClick={() => handleRWList("read")}
              className={`flex flex-1 items-center justify-center rounded-lg px-1 py-1 text-center text-sm font-medium text-white focus:outline-none focus:ring-4 lg:px-2 lg:py-2.5 ${rWStatus.readList ? "bg-red-600 hover:bg-red-700 focus:ring-red-300" : "bg-green-600 hover:bg-green-700 focus:ring-green-300"}`}
            >
              <FaBookOpen className="lg:mr-1 lg:size-4" />
              {rWStatus.readList ? "Remove" : "Add"} to Read List
            </button>
          </div>
          {/* Add to Wish List Button */}
          <div className="mt-4">
            <button
              disabled={!data?.user?.email}
              onClick={() => handleRWList("wish")}
              className={`flex items-center justify-center rounded-lg px-5 py-2.5 text-center text-sm font-medium text-white focus:outline-none focus:ring-4 ${rWStatus.wishList ? "bg-red-600 hover:bg-red-700 focus:ring-red-300" : "bg-gray-600 hover:bg-gray-700 focus:ring-gray-300"}`}
            >
              <FaRegHeart className="mr-1 size-4" />{" "}
              {rWStatus.wishList ? "Remove" : "Add"} to Wishlist
            </button>
          </div>
        </div>
      </div>

      {/* Additional Section Below (if needed) */}
      <div className="mt-6 rounded-lg bg-white p-4 shadow-md">
        <h2 className="text-xl font-semibold text-gray-800">More Details</h2>
        <p className="mt-2 text-gray-600">
          Explore more information about the book, author, and publication here.
        </p>
      </div>
    </div>
  );
};

export default ViewDetails;
