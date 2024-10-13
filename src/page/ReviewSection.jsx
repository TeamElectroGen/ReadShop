
"use client";
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
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
  patchUpdateReviewAndRating
} from "@/services/reviewAndRating";


const ReviewSection = ({ bookId }) => {
  const [showReviewForm, setShowReviewForm] = useState(false);
  const { data: session } = useSession() || {}; 
  const [reviewText, setReviewText] = useState(5);
  const [hasMore, setHasMore] = useState(true);
  const [newReviewText, setNewReviewText] = useState("");
  const [selectedRating, setSelectedRating] = useState(0);
  const [ratingError, setRatingError] = useState("");
  
  

  const queryClient = useQueryClient();

  const { data: reviewData, isLoading, isError } = useQuery({
    queryKey: ['reviews', bookId],
    queryFn: () => getBookReviewAndRating(bookId),
    onSuccess: (data) => {
      const userExistingReview = data.reviewAndRatingData?.find(
        (review) => review.user.email === session?.user?.email
      );
      if (userExistingReview) {
        
        setNewReviewText(userExistingReview.reviewText);
        setSelectedRating(userExistingReview.rating);
      }
    }
  });
  

  const reviews = reviewData?.reviewAndRatingData || [];
  const totalRating = reviews.length;
  const totalReviews = reviews.length;
  const totalRatingCount = reviews.reduce((acc, review) => acc + review.rating, 0);

  const userReview = reviews.find((review) => review.user.email === session?.user?.email);

  const mutation = useMutation({
    mutationFn: (newReview) => 
      userReview
        ? patchUpdateReviewAndRating(session?.user?.email, bookId, newReview)
        : postReviewAndRating(session?.user?.email, bookId, newReview),
    onSuccess: () => {
      queryClient.invalidateQueries(['reviews', bookId]);
      toast.success(userReview ? "Review updated successfully!" : "Review submitted successfully!");
      setShowReviewForm(false);
    },
    onError: () => {
      toast.error("Failed to submit review. Please try again.");
    }
  });
  

  // ... rest of the component code remains the same(yes)
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
    // if (userReview) {
    //   setNewReviewText(userReview.reviewText);
    //   setSelectedRating(userReview.rating);
    // }
    setShowReviewForm(!showReviewForm);
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
      createdAt: new Date().toLocaleDateString(),
      user: {
        name: session?.user?.name,
        avatar: session?.user?.image,
      },
    };

    mutation.mutate(newReview);
  };

  // ... rest of the component code remains the same
  const handleStarClick = (rating) => {
    setSelectedRating(rating);
    setRatingError("");
  };

  if (isLoading) {
    return <div>Loading reviews...</div>;
  }
  
  if (isError) {
    return <div>Error loading reviews. Please try again later.</div>;
  }
  return (
    <div className="reviews-container container mx-auto mt-8 rounded-lg p-6">
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
                return <FaStar key={i} className="text-3xl text-yellow-400" />;
              } else if (roundedValue > 0) {
                return <FaStarHalfAlt key={i} className="text-3xl text-yellow-400" />;
              } else {
                return <FaStar key={i} className="text-3xl text-gray-300" />;
              }
            })}
          </div>
          <p className="text-2xl font-semibold text-gray-800">
            {(totalRatingCount / totalRating).toFixed(2) || 0}
          </p>
          <p className="text-sm text-gray-500">
            Based on {totalRating} total ratings
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
            {userReview ? "Update Review" : "Write a Review"}
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
          <h3 className="mb-4 text-xl font-semibold">{userReview ? "Update Your Review" : "Write a Review"}</h3>
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
                      rating <= selectedRating ? "text-yellow-400" : "text-gray-300"
                    }`}
                    onClick={() => handleStarClick(rating)}
                  />
                ))}
              </div>
              {ratingError && (
                <p className="text-red-500">{ratingError}</p>
              )}
            </div>

            <Button
              type="submit"
              className="mt-4 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg shadow"
            >
              {userReview ? "Update Review" : "Submit Review"}
            </Button>
          </form>
        </div>
      )}

      <div className="reviews mt-8">
        <InfiniteScroll
          dataLength={reviewText}
          next={loadReviews}
          hasMore={hasMore}
          loader={
            <div className="mt-10 flex justify-center">
              <ReactLoading
                type="bars"
                color="blue"
                height={100}
                width={50}
              />
            </div>
          }
        >
          {reviews?.slice(0, reviewText)?.map((review, index) => (
            <div key={index} className="rounded-lg bg-white p-4 shadow-md mb-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <Image
                    src={review.user.avatar || defaultImage}
                    alt="Profile Avatar"
                    className="rounded-full"
                    width={50}
                    height={50}
                  />
                  <div className="ml-3">
                    <p className="font-semibold text-gray-800">
                      {review.user.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      {review.createdAt}
                    </p>
                  </div>
                </div>
                <div className="flex">
                  {[...Array(review.rating)].map((_, i) => (
                    <FaStar
                      key={i}
                      className="text-yellow-400 text-lg"
                    />
                  ))}
                  {[...Array(5 - review.rating)].map((_, i) => (
                    <FaStar
                      key={i}
                      className="text-gray-300 text-lg"
                    />
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
