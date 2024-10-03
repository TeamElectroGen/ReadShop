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

  const { addToCart, cart } = useCart();

  const handleAddToCartClick = () => {
    setIsAddedToCart(true);

    const productToAdd = {
      id: detailsBook._id,
      name: detailsBook.BookName,
      coverImage: detailsBook.CoverImage,
      author: detailsBook.AuthorName,
      price: detailsBook.Price,
      quantity: 1,
    };

    addToCart(productToAdd);

    // Display success toast
    toast.success(`${detailsBook.BookName} added to cart!`);
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
                  <FaCartShopping className="mr-3 size-5" /> Add to Cart
                </>
              )}
            </button>

            {/* Add to Read List Button */}
            <button
              disabled={!data?.user?.email}
              onClick={() => handleRWList("read")}
              className="text-ms flex flex-1 items-center justify-center rounded-lg bg-green-600 px-2 py-2.5 text-center font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-300"
            >
              <FaBookOpen className="mr-3 size-5" />
              {rWStatus.readList ? "Remove" : "Add"} to Read List
            </button>
          </div>

          {/* Add to Wish List Button */}
          <div className="mt-4">
            <button
              disabled={!data?.user?.email}
              onClick={() => handleRWList("wish")}
              className="flex items-center justify-center rounded-lg bg-gray-600 px-5 py-2.5 text-center text-xl font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-300"
            >
              <FaRegHeart className="mr-3 size-6" />{" "}
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
