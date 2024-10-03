import { useCart } from "@/app/context/CartContext";
import {
  getBookDetails,
  getReadWishStatusUser,
  patchRWList,
} from "@/services/getBooksData";
import { useSession } from "next-auth/react";
import Image from "next/image";

import React, { useEffect, useState } from "react";
import { FaBookOpen, FaCartShopping, FaRegHeart } from "react-icons/fa6";
import { toast } from "react-hot-toast"; // Import toast

const ViewDetails = ({ bookid }) => {
  const [detailsBook, setDetailsBook] = useState({});
  const [update, setUpdate] = useState(false);
  const [rWStatus, setRWStatus] = useState({});
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const { data } = useSession() || {};
  const [showLoginModal, setShowLoginModal] = useState(false);

  const { addToCart, cart } = useCart();

  const handleAddToCartClick = () => {
    setIsAddedToCart(true);
  };
  console.log(rWStatus);
  const handleRWList = async (param) => {
    if (data?.user?.email) {
      try {
        const res = await patchRWList(param, bookid, data?.user?.email);
        setUpdate(!update);
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    } else {
      setShowLoginModal(true);
    }
  };
  // console.log(rWStatus);

  // Function to handle storing the book id in local storage
  const handleLastVisitedBook = (id) => {
    let recentVisitedBooks;
    try {
      recentVisitedBooks =
        JSON.parse(localStorage.getItem("recentVisitedBooks")) || [];
      if (!Array.isArray(recentVisitedBooks)) {
        recentVisitedBooks = [];
      }
    } catch (error) {
      recentVisitedBooks = [];
    }

    // Remove the book ID if it already exists
    recentVisitedBooks = recentVisitedBooks.filter((bookId) => bookId !== id);

    // Add the book ID to the beginning of the array
    recentVisitedBooks.unshift(id);

    // Limit the array to a maximum of 10 items
    recentVisitedBooks = recentVisitedBooks.slice(0, 10);

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
            src={detailsBook?.CoverImage}
            alt={detailsBook?.BookName}
            width={300}
            height={500}
            className="rounded-lg shadow-md"
          />
        </div>

        {/* Right Side - Book Details */}
        <div className="rounded-lg bg-white p-6 shadow-md">
          <h1 className="text-2xl font-bold text-gray-800">
            {detailsBook?.BookName}
          </h1>
          <p className="mt-2 text-gray-600">by {detailsBook?.AuthorName}</p>
          <div className="mt-4 flex items-center">
            <span className="rounded bg-yellow-400 px-2.5 py-0.5 text-sm font-semibold">
              {detailsBook?.Rating} Stars
            </span>
            <span className="ml-2 font-bold text-gray-500">| 3 Reviews</span>
          </div>

          {/* Book Description */}
          <p className="mt-4 text-gray-600">{detailsBook?.Description}</p>

          {/* Additional Details */}
          <div className="mt-4">
            <p className="text-sm text-gray-500">
              <span className="font-semibold">Published by:</span>{" "}
              {detailsBook?.PublicationName}
            </p>
            <p className="mt-1 text-sm text-gray-500">
              <span className="font-semibold">Publish Date:</span>{" "}
              {new Date(detailsBook?.PublishDate).toDateString()}
            </p>
          </div>

          {/* Price & Add to Cart Buttons */}
          <div className="mt-6 flex items-center justify-between">
            <span className="text-2xl font-bold text-green-700">
              $ {detailsBook?.Price}
            </span>
          </div>

          <div className="mt-4 flex space-x-4">
            {/* Add to Cart Button */}
            <button
              className={`flex flex-1 items-center justify-center rounded-lg px-5 py-2.5 text-center text-xl font-medium text-white duration-300 focus:outline-none focus:ring-4 ${isAddedToCart ? "bg-green-600 hover:bg-green-700" : "bg-blue-600 hover:bg-blue-700"}`}
              onClick={handleAddToCartClick}
            >
              {isAddedToCart ? (
                <>
                  {cart.find((item) => item.id === detailsBook._id)?.quantity ||
                    1}{" "}
                  in Cart
                </>
              ) : (
                <>
                  <FaCartShopping className="mr-1 size-4" /> Add to Cart
                </>
              )}
            </button>

            {/* Add to WishList Button */}
            <button
              onClick={() => handleRWList("wish")}
              className={`flex items-center justify-center rounded-lg px-5 py-2.5 text-center text-sm font-medium text-white focus:outline-none focus:ring-4 ${rWStatus.wishList ? "bg-red-600 hover:bg-red-700 focus:ring-red-300" : "bg-gray-600 hover:bg-gray-700 focus:ring-gray-300"}`}
            >
              <FaRegHeart className="mr-1 size-4" />{" "}
              {rWStatus.wishList ? "Remove from" : "Add to"} Wishlist
            </button>
          </div>

          {/* Add to Read List Button */}
          <div className="mt-4">
            <button
              onClick={() => handleRWList("read")}
              className={`flex flex-1 items-center justify-center rounded-lg px-5 py-2.5 text-center text-sm font-medium text-white focus:outline-none focus:ring-4 ${rWStatus.readList ? "bg-red-600 hover:bg-red-700 focus:ring-red-300" : "bg-green-600 hover:bg-green-700 focus:ring-green-300"}`}
            >
              <FaBookOpen className="mr-1 lg:size-4" />
              {rWStatus.readList ? "Remove from" : "Add to"} Read List
            </button>
          </div>
        </div>
      </div>

      {/* Login Modal */}
      {showLoginModal && (
        <LoginModal
          onCancel={() => setShowLoginModal(false)}
          onLogin={() => {
            // Redirect to login page or trigger login process
            setShowLoginModal(false);
          }}
        />
      )}

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

const LoginModal = ({ onCancel, onLogin }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
      <div className="rounded-lg bg-white p-6 shadow-lg">
        <h2 className="text-xl font-semibold text-gray-800">Please Login</h2>
        <p className="mt-2 text-gray-600">You need to login to continue.</p>
        <div className="mt-4 flex justify-end space-x-4">
          <button
            className="rounded-lg bg-gray-600 px-4 py-2 text-white hover:bg-gray-700"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            onClick={onLogin}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewDetails;
