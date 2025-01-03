"use client";

import { useCart } from "@/app/context/CartContext";
import BookLoading from "@/components/BookLoading";
import BookSectionTitle from "@/components/BookSectionTitle";
import RecentlyViewBookSlider from "@/components/RecentlyViewBookSlider";
import {
  getBookDetails,
  getBooksByIds,
  getReadWishStatusUser,
  patchRWList,
} from "@/services/getBooksData";
import { queryClient } from "@/services/Providers";
import { useMutation, useQuery } from "@tanstack/react-query";
import { BookOpenCheck } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast"; // Import toast
import { FaCartShopping, FaRegHeart } from "react-icons/fa6";
import ReviewSection from "./ReviewSection";

const ViewDetails = ({ bookid }) => {
  const pathname = usePathname();
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
  const { data: detailsBook, isLoading } = useQuery({
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

  // ... rest of the component
  const { data: rWStatus = {} } = useQuery({
    queryKey: ["readWishStatus", bookid, sessionData?.user?.email],
    queryFn: async () => {
      const { readList, wishList } = await getReadWishStatusUser(
        bookid,
        sessionData?.user?.email
      );
      toast.dismiss();
      return { readList, wishList };
    },
    enabled: !!bookid && !!sessionData?.user?.email,
  });

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

  const { mutate: handleRWList } = useMutation({
    mutationFn: async (param) => {
      toast.loading("Updating...");
      await patchRWList(param, bookid, sessionData?.user?.email);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["readWishStatus"]);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const handleRWListClick = (param) => {
    if (sessionData?.user?.email) {
      handleRWList(param);
    } else {
      setShowLoginModal(true);
    }
  };
  return (
    <div className="container my-5 rounded-lg md:my-10 lg:my-20">
      {isLoading ? (
        <div className="flex h-screen items-center justify-center">
          <BookLoading />
        </div>
      ) : (
        <>
          <div className="flex flex-col gap-5 md:flex-row">
            {/* Left Side - Book Image */}
            <div className="mx-auto flex w-1/2 items-center justify-center bg-transparent md:w-1/4 lg:w-1/5">
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
              <p className="mt-2 text-gray-600">
                by{" "}
                <Link
                  href={`/author/${detailsBook?.authorId}`}
                  className="text-blue-500 hover:underline"
                >
                  {detailsBook?.AuthorName}
                </Link>
              </p>
              <div className="mt-4 flex items-center">
                <span className="rounded bg-yellow-400 px-2.5 py-0.5 text-sm font-semibold">
                  {detailsBook?.Rating} Rating
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

              <div className="mt-4 flex flex-col gap-4 lg:flex-row">
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
                  onClick={() => handleRWListClick("wish")}
                  className={`flex flex-1 items-center justify-center rounded-lg px-5 py-2.5 text-center font-medium text-white focus:outline-none focus:ring-4 ${rWStatus.wishList ? "bg-red-600 hover:bg-red-700 focus:ring-red-300" : "bg-gray-600 hover:bg-gray-700 focus:ring-gray-300"}`}
                >
                  <FaRegHeart className="mr-1 md:mr-2" />{" "}
                  {rWStatus.wishList ? "Remove from" : "Add to"} Wishlist
                </button>
              </div>

              <div className="mt-4">
                <button
                  onClick={() => handleRWListClick("read")}
                  className={`flex w-full flex-1 items-center justify-center rounded-lg px-1 py-2.5 text-center font-medium text-white focus:outline-none focus:ring-4 md:px-5 lg:w-1/2 ${rWStatus?.readList ? "bg-red-600 hover:bg-red-700 focus:ring-red-300" : "bg-green-600 hover:bg-green-700 focus:ring-green-300"}`}
                >
                  <BookOpenCheck className="mr-1 size-5 md:mr-2" />
                  {rWStatus?.readList ? "Remove from" : "Add to"} Read List
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

          <ReviewSection
            bookId={bookid}
            rating={detailsBook?.Rating}
            reviewCount={detailsBook?.ReviewCount}
          />

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
