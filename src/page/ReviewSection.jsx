import React, { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa"; // Using react-icons for star symbol
import ReactPaginate from "react-paginate";
import Image from "next/image";

const ReviewSection = () => {
  const [totalRating, setTotalRating] = useState(4.5); // Example average rating
  const [totalReviews, setTotalReviews] = useState(120); // Example total reviews
  const [totalRatingCount, setTotalRatingCount] = useState(200); // Example total rating count
  const [selectedRating, setSelectedRating] = useState(0);
  const [reviews, setReviews] = useState([
    // Example reviews data
    {
      id: 1,
      user: {
        name: "John Doe",
        avatar: "https://example.com/avatar.jpg",
      },
      rating: 4,
      text: "Great product! Highly recommend.",
      createdAt: "2023-04-06",
    },
    {
      id: 1,
      user: {
        name: "John Doe",
        avatar: "https://example.com/avatar.jpg",
      },
      rating: 4,
      text: "Great product! Highly recommend.",
      createdAt: "2023-04-06",
    },
    {
      id: 1,
      user: {
        name: "John Doe",
        avatar: "https://example.com/avatar.jpg",
      },
      rating: 4,
      text: "Great product! Highly recommend.",
      createdAt: "2023-04-06",
    },
    {
      id: 1,
      user: {
        name: "John Doe",
        avatar: "https://example.com/avatar.jpg",
      },
      rating: 4,
      text: "Great product! Highly recommend.",
      createdAt: "2023-04-06",
    },
    {
      id: 1,
      user: {
        name: "John Doe",
        avatar: "https://example.com/avatar.jpg",
      },
      rating: 4,
      text: "Great product! Highly recommend.",
      createdAt: "2023-04-06",
    },
    {
      id: 1,
      user: {
        name: "John Doe",
        avatar: "https://example.com/avatar.jpg",
      },
      rating: 4,
      text: "Great product! Highly recommend.",
      createdAt: "2023-04-06",
    },
    // Add more static reviews here...
  ]);
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 5;
  const [showReviewForm, setShowReviewForm] = useState(false);

  useEffect(() => {
    // Fetch total rating, reviews, and rating count from data source
    fetchTotalRatingAndReviews()
      .then((data) => {
        setTotalRating(data.totalRating);
        setTotalReviews(data.totalReviews);
        setTotalRatingCount(data.totalRatingCount);
      })
      .catch((error) => {
        console.error("Error fetching total rating and reviews:", error);
      });
  }, []);

  const fetchTotalRatingAndReviews = async () => {
    // Replace this with your actual API call or data fetching logic
    const response = await fetch("/api/reviews");
    const data = await response.json();
    return data;
  };

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected + 1);
  };

  const handleShowReviewForm = () => {
    setShowReviewForm(!showReviewForm);
  };

  const handleSubmitReview = (event) => {
    event.preventDefault();
    const newReview = {
      id: reviews.length + 1,
      user: { name: "New User", avatar: "https://example.com/avatar-new.jpg" },
      rating: event.target.elements.rating.value,
      text: event.target.elements.reviewText.value,
      createdAt: new Date().toLocaleDateString(),
    };
    setReviews([...reviews, newReview]);
    setShowReviewForm(false);
  };

  const handleStarClick = (rating) => {
    setSelectedRating(rating);
  };

  return (
    <div className="reviews-container mx-auto mt-8 max-w-5xl rounded-lg p-6 shadow-md">
      {/* Reviews and Ratings Section */}
      <h2 className="mb-4 text-center text-2xl font-bold text-gray-800">
        Reviews and Ratings
      </h2>
      <div className="mb-6 flex items-center justify-around rounded-lg bg-white p-4 shadow-lg">
        <div className="text-center">
          {/* Average Rating with Large Stars */}
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
            {totalRating.toFixed(1)} / 5
          </p>
          <p className="text-sm text-gray-500">
            Based on {totalRatingCount} total ratings
          </p>
        </div>

        {/* Total Reviews Count */}
        <div className="text-center">
          <p className="text-gray-600">Total Reviews</p>
          <p className="text-xl font-bold text-blue-600">{totalReviews}</p>
        </div>
      </div>

      {/* Button to write a review */}
      <div className="flex justify-center">
        <button
          onClick={handleShowReviewForm}
          className="rounded-full bg-blue-600 px-6 py-2 text-white shadow-lg hover:bg-blue-500 focus:outline-none"
        >
          Write a Review
        </button>
      </div>

      {/* Review Form */}
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
                name="reviewText"
                rows="4"
                className="mt-1 w-full rounded-lg border p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Describe your experience (optional)"
                required
              ></textarea>
            </div>
            {/* rating selection */}
            {/* <div className="mb-4">
              <label
                htmlFor="rating"
                className="block font-medium text-gray-700"
              >
                Rating
              </label>
              <select
                id="rating"
                name="rating"
                className="mt-1 w-full rounded-lg border p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select Rating</option>
                <option value="5">5 Stars</option>
                <option value="4">4 Stars</option>
                <option value="3">3 Stars</option>
                <option value="2">2 Stars</option>
                <option value="1">1 Star</option>
              </select>
            </div> */}
            {/* rating stars */}
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
            </div>
            <div className="mb-4">
              <label
                htmlFor="reviewPhoto"
                className="block font-medium text-gray-700"
              >
                Upload Photo (optional)
              </label>
              <input
                type="file"
                id="reviewPhoto"
                name="reviewPhoto"
                multiple
                className="mt-1 w-full rounded-lg border p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
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

      {/* Customer Reviews Section */}
      <div className="mt-10">
        <h2 className="mb-4 text-2xl font-bold">Customer Reviews</h2>

        {/* Review List */}
        <div className="space-y-6">
          {reviews
            .slice(
              (currentPage - 1) * reviewsPerPage,
              currentPage * reviewsPerPage
            )
            .map((review) => (
              <div
                key={review.id}
                className="rounded-lg bg-white p-6 shadow-lg"
              >
                <div className="mb-4 flex items-center">
                  <Image
                    width={50}
                    height={50}
                    src={review.user.avatar}
                    alt={review.user.name}
                    className="mr-4 h-12 w-12 rounded-full"
                  />
                  <div>
                    <h3 className="text-lg font-semibold">
                      {review.user.name}
                    </h3>
                    <p className="text-sm text-gray-500">{review.createdAt}</p>
                  </div>
                </div>
                <div className="mb-4 flex items-center">
                  <div className="flex space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <span
                        key={i}
                        className={`text-xl text-yellow-500 ${
                          i < review.rating ? "filled" : "text-gray-300"
                        }`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                </div>
                <p className="text-gray-700">{review.text}</p>
              </div>
            ))}
        </div>

        {/* Pagination */}
        <div className="mt-6">
          <ReactPaginate
            pageCount={Math.ceil(reviews.length / reviewsPerPage)}
            onPageChange={handlePageChange}
            previousLabel="&laquo;"
            nextLabel="&raquo;"
            breakLabel="..."
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            containerClassName="flex justify-center space-x-2"
            pageClassName="px-4 py-2 border rounded-lg text-gray-700 hover:bg-blue-100"
            activeClassName="bg-blue-500 text-white"
            previousClassName="px-4 py-2 border rounded-lg text-gray-700 hover:bg-blue-100"
            nextClassName="px-4 py-2 border rounded-lg text-gray-700 hover:bg-blue-100"
            disabledClassName="opacity-50"
          />
        </div>
      </div>
    </div>
  );
};

export default ReviewSection;
