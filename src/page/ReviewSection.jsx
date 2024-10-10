"use client";
import defaultImage from "../../public/assets/profile.png";
import React, { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import InfiniteScroll from "react-infinite-scroll-component";
import ReactLoading from "react-loading";
// import axios from "axios"; // Ensure axios is imported
import toast from "react-hot-toast"; // If you are using a toast library
import {
  getBookReviewAndRating,
  postReviewAndRating,
} from "@/services/reviewAndRating";

const ReviewSection = ({ bookId }) => {
  const [totalRating, setTotalRating] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);
  const [totalRatingCount, setTotalRatingCount] = useState(0);
  const [selectedRating, setSelectedRating] = useState(0);
  const [ratingError, setRatingError] = useState("");
  const [reviews, setReviews] = useState([]);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const { data: session } = useSession(); // session to check if user is logged in
  const [reviewText, setReviewText] = useState(5);
  const [hasMore, setHasMore] = useState(true);
  const [newReviewText, setNewReviewText] = useState("");
  // Fetch dynamic reviews and ratings data (you need to implement this API)
  useEffect(() => {
    const fetchReviewsAndRatings = async () => {
      const { reviewAndRatingData } = await getBookReviewAndRating(bookId);
      console.log(reviewAndRatingData);
      setReviews(reviewAndRatingData);
      setTotalRating(reviewAndRatingData?.length);
      setTotalReviews(reviewAndRatingData?.length);
      // setTotalRatingCount(reviewAndRatingData.length);
      setTotalRatingCount(
        reviewAndRatingData.reduce((acc, review) => acc + review.rating, 0)
      );
      // if (data) {
      //   setReviews(data.reviews || []);
      //   setTotalRating(data.totalRating || 0);
      //   setTotalReviews(data.totalReviews || 0);
      //   setReviews(data); // Assume API returns an array of reviews
      //   const totalRating = data.reduce((acc, review) => acc + review.rating, 0) / data.length;
      //   setTotalRating(totalRating);
      //   setTotalReviews(data.length);
      // }
    };
    fetchReviewsAndRatings();
  }, [bookId]);
  const loadReviews = () => {
    if (reviews?.length <= reviewText) {
      setHasMore(false);
      return;
    }
    setTimeout(() => {
      setReviewText((prevVisible) => prevVisible + 5);
    }, 1000);
  };

  const handleShowReviewForm = () => {
    setShowReviewForm(!showReviewForm);
  };

  // Function to handle review and rating submission
  const handleSubmitReview = async (event) => {
    event.preventDefault();

    // Ensure rating is selected
    if (selectedRating === 0) {
      setRatingError("Please select a rating.");
      return;
    }

    // Create new review object
    const newReview = {
      rating: selectedRating,
      reviewText: newReviewText,
      bookId: bookId,
      createdAt: new Date().toLocaleDateString(),
      user: {
        name: session?.user?.name,
        avatar: session?.user?.image,
      },
    };

    // Post the review to the API
    const result = await postReviewAndRating(
      session?.user?.email,
      bookId,
      newReview
    );
    console.log("result", result);

    // Check if the post was successful
    if (result.message === "Review and Rating successfully added!") {
      toast.success("Review submitted successfully!");
      setReviews((prevReviews) => [
        ...(prevReviews || []),
        {
          user: { name: session?.user?.name, avatar: session?.user?.image },
          rating: selectedRating,
          text: newReviewText,
          createdAt: new Date().toLocaleDateString(),
        },
      ]);
      setShowReviewForm(false);
    } else {
      toast.error("Failed to submit review. Please try again.");
    }
  };

  const handleStarClick = (rating) => {
    setSelectedRating(rating);
    setRatingError("");
  };

  return (
    <div className="reviews-container container mx-auto mt-8 rounded-lg p-6">
      <h2 className="mb-4 text-center text-2xl font-bold text-gray-800">
        Reviews and Ratings
      </h2>
      <div className="mb-6 flex items-center justify-around rounded-lg bg-white p-4">
        <div className="text-center">
          <div className="mb-2 flex justify-center">
            {[...Array(5)].map((_, i) => (
              <FaStar
                key={i}
                className={`text-3xl ${
                  i < Math.floor(totalRating)
                    ? "text-yellow-400"
                    : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <p className="text-2xl font-semibold text-gray-800">
            {totalRating?.toFixed(1) || 0} / 5
          </p>
          <p className="text-sm text-gray-500">
            Based on {totalRatingCount} total ratings
          </p>
        </div>
        <div className="text-center">
          <p className="text-gray-600">Total Reviews</p>
          <p className="text-xl font-bold text-blue-600">{totalReviews}</p>
        </div>
      </div>

      <div className="flex justify-center">
        {session?.user?.email ? (
          <button
            onClick={handleShowReviewForm}
            className="rounded-full bg-blue-600 px-6 py-2 text-white shadow-lg hover:bg-blue-500 focus:outline-none"
          >
            Write a Review
          </button>
        ) : (
          <div className="text-xl font-semibold">
            Please login to write a review
            <Link href="/login">
              <Button className="ghost ml-10 p-5 hover:bg-blue-600 hover:text-white">
                Login
              </Button>
            </Link>
          </div>
        )}
      </div>

      {showReviewForm && (
        <div className="mt-6 rounded-lg bg-white p-6 shadow-lg">
          <h3 className="mb-4 text-xl font-semibold">Write a Review</h3>
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

            <div className="flex space-x-4">
              <button
                type="submit"
                className="rounded-lg bg-blue-600 px-6 py-3 text-white"
              >
                Submit
              </button>
              <button
                type="button"
                onClick={handleShowReviewForm}
                className="rounded-lg bg-gray-300 px-6 py-3 text-gray-700"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
      {reviews?.length === 0 ? (
        <p className="text-center mt-6">
          No reviews yet. Be the first to leave a review!
        </p>
      ) : (
        <div className="mt-10">
          <h2 className="mb-4 text-2xl font-bold">Customer Reviews</h2>

          <InfiniteScroll
            dataLength={reviewText}
            next={loadReviews}
            hasMore={hasMore}
            loader={
              <ReactLoading type="spin" color="#3498db" className="mx-auto" />
            }
          >
            <div className="space-y-6">
              {reviews?.slice(0, reviewText).map((review, index) => (
                <div key={index} className="rounded-lg bg-white p-6 shadow-lg">
                  <div className="mb-4 flex items-center">
                    <Image
                      width={50}
                      height={50}
                      src={review?.user?.avatar || defaultImage}
                      alt={review?.user?.name}
                      className="mr-4 h-12 w-12 rounded-full"
                    />
                    <div>
                      <h3 className="text-lg font-semibold">
                        {review?.user?.name}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {review?.createdAt}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-1">
                    {[...Array(review.rating)].map((_, i) => (
                      <FaStar key={i} className="text-yellow-400" />
                    ))}
                    {[...Array(5 - review.rating)].map((_, i) => (
                      <FaStar key={i} className="text-gray-300" />
                    ))}
                  </div>
                  <p className="mt-4 text-gray-800">{review?.reviewText}</p>
                </div>
              ))}
            </div>
          </InfiniteScroll>
        </div>
      )}
    </div>
  );
};

export default ReviewSection;
