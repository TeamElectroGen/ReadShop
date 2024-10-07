import React from 'react';
import { useState } from "react";

// import ReactStars from "react-rating-stars-component";
const ReviewsAndRatings = () => {
    // eslint-disable-next-line no-unused-vars
    const [isLoggedIn, setIsLoggedIn] = useState(true); // Assume user is logged in or not

    return (
      <section className="max-w-2xl mx-auto p-4">
        {/* Reviews and Ratings Header */}
        {/* <div className="flex items-center space-x-4">
          <div className="text-4xl font-bold">4.78</div>
          <div>
            <div className="flex items-center">
              Static stars showing average rating
              {[...Array(5)].map((_, i) => (
                <span key={i} className={`text-yellow-500 text-xl ${i < 4 ? 'filled' : 'empty'}`}>
                  ★
                </span>
              ))}
            </div>
            <p>431 Ratings and 265 Reviews</p>
          </div>
        </div> */}
  
        {/* Write a review Section */}
        {isLoggedIn ? (
          <div className="mt-6 border p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Write a Review</h3>
  
            {/* Star Rating Input */}
            <div className="flex items-center space-x-2 mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className="cursor-pointer text-gray-300 text-2xl"
                  // Replace with your functionality later
                >
                  ★
                </span>
              ))}
            </div>
  
            {/* Review Input */}
            <textarea
              className="w-full p-2 border rounded mb-4"
              placeholder="Describe your experience (optional)"
              rows="4"
            />
  
            {/* Photo Upload Section */}
            <div className="flex items-center space-x-2 mb-4">
              <input type="file" className="border p-2 rounded" />
            </div>
  
            {/* Submit and Cancel Buttons */}
            <div className="flex space-x-2">
              <button className="bg-blue-500 text-white px-4 py-2 rounded">Submit</button>
              <button className="border border-gray-300 px-4 py-2 rounded">Cancel</button>
            </div>
          </div>
        ) : (
          <div className="mt-6 p-4 border rounded-lg">
            <p>Please <a href="/login" className="text-blue-500 underline">login</a> to write a review.</p>
          </div>
        )}
  
       
      </section>
    );
  };

export default ReviewsAndRatings;
