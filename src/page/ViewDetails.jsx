"use client";

import { useCart } from "@/app/context/CartContext";
import {
  getBookDetails,
  getBooksByIds,
  getReadWishStatusUser,
  patchRWList,
} from "@/services/getBooksData";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FaBookOpen, FaCartShopping, FaRegHeart } from "react-icons/fa6";
import { toast } from "react-hot-toast";
import ReviewSection from "./ReviewSection";
import { usePathname, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import BookLoading from "@/components/BookLoading";
import RecentlyViewBookSlider from "@/components/RecentlyViewBookSlider";
import BookSectionTitle from "@/components/BookSectionTitle";

const ViewDetails = ({ bookid }) => {
  const pathname = usePathname();
  const [update, setUpdate] = useState(false);
  const [rWStatus, setRWStatus] = useState({});
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const { data: sessionData } = useSession() || {};
  const { addToCart, cart } = useCart();
  const router = useRouter();
  const [showLoginModal, setShowLoginModal] = useState(false);

  // Fetch recent viewed books
  const { data: recentViewedBook } = useQuery({
    queryKey: ["recentViewedBook"],
    queryFn: async () => {
      const storedBooks =
        JSON.parse(localStorage.getItem("recentVisitedBooks")) || [];
      const res = await getBooksByIds(storedBooks);
      return res.books;
    },
    onError: (error) => console.error(error),
  });

  // Fetch book details
  const { data: detailsBook, isFetching } = useQuery({
    queryKey: ["bookDetails", bookid],
    queryFn: async () => {
      const { bookDetails } = await getBookDetails(bookid);
      return bookDetails;
    },
    enabled: !!bookid,
  });

  useEffect(() => {
    if (bookid) {
      const recentVisitedBooks =
        JSON.parse(localStorage.getItem("recentVisitedBooks")) || [];
      const updatedBooks = [
        bookid,
        ...recentVisitedBooks.filter((id) => id !== bookid),
      ].slice(0, 10);
      localStorage.setItem("recentVisitedBooks", JSON.stringify(updatedBooks));
    }
  }, [bookid]);

  // Fetch read/wish status
  useEffect(() => {
    const fetchReadWishStatus = async () => {
      if (sessionData?.user?.email) {
        const { readList, wishList } = await getReadWishStatusUser(
          bookid,
          sessionData.user.email
        );
        setRWStatus({ readList, wishList });
      }
    };
    fetchReadWishStatus();
  }, [bookid, sessionData?.user?.email, update]);

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
    toast.success(`${detailsBook.BookName} added to cart!`);
  };

  const handleRWList = async (action) => {
    if (sessionData?.user?.email) {
      try {
        await patchRWList(action, bookid, sessionData.user.email);
        setUpdate((prev) => !prev);
      } catch (error) {
        console.error(error);
      }
    } else {
      setShowLoginModal(true);
    }
  };

  return (
    <div className="container rounded-lg md:my-10 lg:my-20">
      {isFetching ? (
        <div className="flex h-[50vh] items-center justify-center">
          <BookLoading />
        </div>
      ) : (
        <>
          <div className="flex flex-col gap-5 md:flex-row">
            <div className="flex w-1/3 items-center bg-transparent">
              <Image
                src={detailsBook?.CoverImage}
                alt={detailsBook?.BookName}
                width={400}
                height={400}
                className="rounded-lg object-cover shadow-2xl"
              />
            </div>

            <div className="flex-1 rounded-lg bg-white p-6 shadow-md">
              <h1 className="text-2xl font-bold text-gray-800">
                {detailsBook?.BookName}
              </h1>
              <p className="mt-2 text-gray-600">by {detailsBook?.AuthorName}</p>
              <div className="mt-4 flex items-center">
                <span className="rounded bg-yellow-400 px-2.5 py-0.5 text-sm font-semibold">
                  {detailsBook?.Rating} Stars
                </span>
                <span className="ml-2 font-bold text-gray-500">
                  | {detailsBook?.ReviewCount} Reviews
                </span>
              </div>

              <p className="mt-4 text-gray-600">{detailsBook?.Description}</p>

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

              <div className="mt-6 flex items-center justify-between">
                <span className="text-2xl font-bold text-green-700">
                  $ {detailsBook?.Price}
                </span>
              </div>

              <div className="mt-4 flex flex-col gap-4 md:flex-row">
                <button
                  className={`flex flex-1 items-center justify-center rounded-lg px-5 py-2.5 text-center font-medium text-white duration-300 focus:outline-none focus:ring-4 ${isAddedToCart ? "bg-green-600 hover:bg-green-700" : "bg-blue-600 hover:bg-blue-700"}`}
                  onClick={handleAddToCartClick}
                >
                  {isAddedToCart ? (
                    `${cart.find((item) => item.id === detailsBook._id)?.quantity || 1} in Cart`
                  ) : (
                    <>
                      <FaCartShopping className="mr-2" /> Add to Cart
                    </>
                  )}
                </button>

                <button
                  onClick={() => handleRWList("wish")}
                  className={`flex flex-1 items-center justify-center rounded-lg px-5 py-2.5 text-center font-medium text-white focus:outline-none focus:ring-4 ${rWStatus.wishList ? "bg-red-600 hover:bg-red-700" : "bg-gray-600 hover:bg-gray-700"}`}
                >
                  <FaRegHeart className="mr-2" />{" "}
                  {rWStatus.wishList ? "Remove from" : "Add to"} Wishlist
                </button>
              </div>

              <div className="mt-4">
                <button
                  onClick={() => handleRWList("read")}
                  className={`flex w-full flex-1 items-center justify-center rounded-lg px-5 py-2.5 text-center font-medium text-white focus:outline-none focus:ring-4 md:w-1/2 ${rWStatus.readList ? "bg-red-600 hover:bg-red-700" : "bg-green-600 hover:bg-green-700"}`}
                >
                  <FaBookOpen className="mr-2" />
                  {rWStatus.readList ? "Remove from" : "Add to"} Read List
                </button>
              </div>
            </div>
          </div>

          {showLoginModal && (
            <LoginModal
              onCancel={() => setShowLoginModal(false)}
              onLogin={() => {
                router.push(`/login?redirect=${pathname}`);
                setShowLoginModal(false);
              }}
            />
          )}

          <div>
            <ReviewSection bookId={bookid} />
          </div>

          {recentViewedBook?.length > 0 && (
            <section className="mt-10 rounded-md bg-gradient-to-r from-purple-400 to-teal-400 p-8 shadow-md sm:mx-5 sm:rounded-xl">
              <BookSectionTitle title={"Recently Viewed"} />
              <RecentlyViewBookSlider items={recentViewedBook} />
            </section>
          )}
        </>
      )}
    </div>
  );
};

const LoginModal = ({ onCancel, onLogin }) => (
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

export default ViewDetails;
