"use client";
import { useQuery, useMutation } from "@tanstack/react-query";
import defaultImage from "../../public/assets/profile.png";
import React, { useState } from "react";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import InfiniteScroll from "react-infinite-scroll-component";
import ReactLoading from "react-loading";
import toast from "react-hot-toast";
import {
  getBookReviewAndRating,
  postReviewAndRating,
  patchUpdateReviewAndRating,
  getUserReviewAndRating,
} from "@/services/reviewAndRating";
import { queryClient } from "@/services/Providers";
import { usePathname } from "next/navigation";

const ReviewSection = ({ bookId }) => {
  const [showReviewForm, setShowReviewForm] = useState(false);
  const pathname = usePathname();
  const { data: session } = useSession() || {};
  const [reviewText, setReviewText] = useState(5);
  const [hasMore, setHasMore] = useState(true);
  const [newReviewText, setNewReviewText] = useState("");
  const [selectedRating, setSelectedRating] = useState(0);
  const [ratingError, setRatingError] = useState("");

  const { data: reviewData = [] } = useQuery({
    queryKey: ["reviews", bookId],
    queryFn: async () => {
      const { reviewAndRatingData } = await getBookReviewAndRating(bookId);
      return reviewAndRatingData;
    },
    enabled: !!bookId,
  });

  const { data: userReview = {} } = useQuery({
    queryKey: ["myReviews"],
    queryFn: async () => {
      const { reviewAndRatingData } = await getUserReviewAndRating(
        session?.user?.email,
        bookId
      );
      return reviewAndRatingData;
    },
    enabled: !!session?.user?.email && !!bookId,
  });

  const totalRating = reviewData.length;
  const totalReviews = reviewData.length;
  const totalRatingCount = reviewData.reduce(
    (acc, review) => acc + review.rating,
    0
  );

  const { mutate } = useMutation({
    mutationFn: (newReview) =>
      userReview
        ? patchUpdateReviewAndRating(session?.user?.email, bookId, newReview)
        : postReviewAndRating(session?.user?.email, bookId, newReview),
    onSuccess: () => {
      queryClient.invalidateQueries(["reviews"]);
      toast.success(
        userReview
          ? "Review updated successfully!"
          : "Review submitted successfully!"
      );
      setShowReviewForm(false);
    },
    onError: () => {
      toast.error("Failed to submit review. Please try again.");
    },
  });

  // ... rest of the component code remains the same(yes)
  const loadReviews = () => {
    if (reviewData?.length <= reviewText) {
      setHasMore(false);
      return;
    }
    setTimeout(() => {
      setReviewText((prevVisible) => prevVisible + 5);
    }, 1000);
  };

  const handleSubmitReview = async (event) => {
    event.preventDefault();

    if (selectedRating === 0) {
      setRatingError("Please select a rating.");
      return;
    }

    const newReview = {
      rating: selectedRating,
      reviewText: newReviewText,
      bookId: bookId,
      createdAt: new Date(),
      user: {
        name: session?.user?.name,
        avatar: session?.user?.image,
      },
    };

    mutate(newReview);
  };

  // ... rest of the component code remains the same
  const handleStarClick = (rating) => {
    setSelectedRating(rating);
    setRatingError("");
  };

  return (
    <div className="reviews-container container mt-8 rounded-lg p-6 md:mx-auto">
      <h2 className="mb-4 text-center text-2xl font-bold text-gray-800">
        Reviews and Ratings
      </h2>
      <div className="mb-6 flex flex-wrap items-center justify-around gap-5 rounded-lg bg-white p-4 md:gap-0">
        <div className="text-center">
          <div className="mb-2 flex justify-center">
            {[...Array(5)].map((_, i) => {
              const ratingValue = totalRatingCount / totalRating;
              const roundedValue = ratingValue - i;
              if (roundedValue >= 1) {
                return (
                  <FaStar key={i} className="text-yellow-400 md:text-3xl" />
                );
              } else if (roundedValue > 0) {
                return (
                  <FaStarHalfAlt
                    key={i}
                    className="text-yellow-400 md:text-3xl"
                  />
                );
              } else {
                return <FaStar key={i} className="text-gray-300 md:text-3xl" />;
              }
            })}
          </div>
          <p className="text-2xl font-semibold text-gray-800">
            {(totalRatingCount / totalRating).toFixed(1) || 0}
          </p>
          <p className="text-sm text-gray-500">Average Rating</p>
        </div>
        <div className="text-center">
          <p className="text-gray-600">Total Reviews</p>
          <p className="text-xl font-bold text-blue-600">{totalReviews}</p>
        </div>
      </div>

      <div className="flex justify-center">
        {session?.user?.email ? (
          <button
            onClick={() => {
              setShowReviewForm(!showReviewForm);
              setNewReviewText(userReview?.reviewText || "");
              setSelectedRating(userReview?.rating || 0);
            }}
            className="rounded-full bg-blue-600 px-6 py-2 text-white shadow-lg hover:bg-blue-500 focus:outline-none"
          >
            {userReview ? "Update Review" : "Write a Review"}
          </button>
        ) : (
          <div className="font-semibold md:text-xl">
            Please login to write a review
            <Link href={`/login?redirect=${pathname}`}>
              <Button className="ghost ml-2 p-5 hover:bg-blue-600 hover:text-white md:ml-10">
                Login
              </Button>
            </Link>
          </div>
        )}
      </div>

      {showReviewForm && (
        <div className="mt-6 rounded-lg bg-white p-6 shadow-lg">
          <h3 className="mb-4 text-xl font-semibold">
            {userReview ? "Update Your Review" : "Write a Review"}
          </h3>
          <form onSubmit={handleSubmitReview}>
            <div className="mb-4">
              <label
                htmlFor="reviewText"
                className="block font-medium text-gray-700"
              >
                Your Review
              </label>
              <textarea
                id="reviewText"
                rows="4"
                className="mt-1 w-full rounded-lg border p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Describe your experience"
                required
                value={newReviewText}
                onChange={(e) => setNewReviewText(e.target.value)}
              ></textarea>
            </div>

            <div className="mb-4">
              <label className="block font-medium text-gray-700">Rating</label>
              <div className="mt-1 flex space-x-1">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <FaStar
                    key={rating}
                    className={`cursor-pointer text-3xl ${
                      rating <= selectedRating
                        ? "text-yellow-400"
                        : "text-gray-300"
                    }`}
                    onClick={() => handleStarClick(rating)}
                  />
                ))}
              </div>
              {ratingError && <p className="text-red-500">{ratingError}</p>}
            </div>

            <Button
              type="submit"
              className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-white shadow hover:bg-blue-500"
            >
              {userReview ? "Update Review" : "Submit Review"}
            </Button>
          </form>
        </div>
      )}

      <div className="reviews mt-8 overflow-x-hidden">
        <InfiniteScroll
          dataLength={reviewText}
          next={loadReviews}
          hasMore={hasMore}
          loader={
            <div className="mt-10 flex justify-center">
              <ReactLoading type="bars" color="blue" height={100} width={50} />
            </div>
          }
        >
          {reviewData?.slice(0, reviewText)?.map((review, index) => (
            <div
              key={index}
              className="mb-4 max-w-full rounded-lg bg-white p-4 md:shadow-md"
            >
              <div className="mb-4 items-center justify-between md:flex">
                <div className="items-center justify-center md:flex">
                  <Image
                    src={
                      review?.user?.avatar || review.user.image || defaultImage
                    }
                    alt="Profile Avatar"
                    className="rounded-full"
                    width={50}
                    height={50}
                  />
                  <div className="md:ml-3">
                    <p className="font-semibold text-gray-800">
                      {review.user.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      {new Date(review.createdAt).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </div>
                <div className="flex">
                  {[...Array(review.rating)].map((_, i) => (
                    <FaStar key={i} className="text-lg text-yellow-400" />
                  ))}
                  {[...Array(5 - review.rating)].map((_, i) => (
                    <FaStar key={i} className="text-lg text-gray-300" />
                  ))}
                </div>
              </div>
              <p className="text-gray-700">{review.reviewText}</p>
            </div>
          ))}
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default ReviewSection;
