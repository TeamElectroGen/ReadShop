"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import React, { useState, useEffect } from "react";

const AuthorDetails = () => {
  const [following, setFollowing] = useState(false);
  const [showFullText, setShowFullText] = useState(false);

  // Toggle follow/unfollow:
  const toggleFollow = () => {
    setFollowing(!following);
  };

  //Show full text:
  const textToggle = () => {
    setShowFullText(!showFullText);
  };



  return (
    <div>
      <div className="container mx-auto">
        <div className="lg:flex h-80 w-full lg:gap-6 rounded-md">
          <div>
            <Image
              className="mt-20 h-40 w-40 rounded-full border-8 border-gray-200 bg-red-300 shadow-2xl shadow-blue-400"
              src="/assets/cover.jpg"
              alt="Author Photo"
              width={150}
              height={150}
            />
          </div>
          <div className="lg:mt-24 lg:w-4/5 mr-4">
            <h1 className="text-xl font-bold">Eran Ben-Joseph</h1>
            <p className="text-justify">
              Eran Ben-Joseph is the Class of 1922 Professor of Landscape
              Architecture and Urban Planning in the Department of Urban Studies
              and Planning at the Massachusetts Institute of Technology. Eran
              served as Head of the Department of Urban Studies and Planning at.
              {showFullText && (
                <>
                  <p>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Eum, laboriosam!
                  </p>
                </>
              )}
              <button onClick={textToggle} className="font-bold text-sky-600">
                {showFullText ? "See Less" : "Read full bio"}
              </button>
            </p>
            <button
              onClick={toggleFollow}
              className="border-2 border-black px-2"
            >
              {following ? "Unfollow" : "+ Follow"}
            </button>
          </div>
        </div>
      </div>

      {/*Famous Work of Author Card*/}
      <div className="container mx-auto mt-32">
      <hr className="my-4 border-gray-300" />
        <h1 className="text-center text-2xl font-bold">Top Eran Ben-Joseph titles</h1>
        <div className="mb-12 mt-8 grid grid-cols-6">
          <div className="h-32 w-24 rounded-md bg-green-200">Book Card</div>
          <div className="h-32 w-24 rounded-md bg-green-200">Book Card</div>
          <div className="h-32 w-24 rounded-md bg-green-200">Book Card</div>
          <div className="h-32 w-24 rounded-md bg-green-200">Book Card</div>
          <div className="h-32 w-24 rounded-md bg-green-200">Book Card</div>
          <div className="h-32 w-24 rounded-md bg-green-200">Book Card</div>
        </div>
      </div>

      {/*Filtering Author's Book*/}
      <div className="container mx-auto">

      </div>

      {/*Author*/}
      <div className="container mx-auto">
        <hr className="my-4 border-gray-300" />
        <select name="" id="" className="p-2">
          <option value="#">Sort by: Popularity</option>
          <option value="#">Price: Low to High</option>
          <option value="#">Price: High to Low</option>
          <option value="#">Avg: Customer Review</option>
          <option value="#">Sort by: Best Sellers</option>
        </select>
        <hr className="my-4 border-gray-300" />
        <div className="flex justify-center">
          <Image
            className="h-28 w-28 rounded-full border-8 border-gray-200 bg-red-300 shadow-2xl shadow-blue-400"
            src="/assets/cover.jpg"
            alt="Author Photo"
            width={150}
            height={150}
          />
        </div>
        <h1 className="mt-4 text-center text-xl font-bold">Eran Ben-Joseph</h1>
        <button
          onClick={toggleFollow}
          className="mx-auto mb-4 mt-4 block border-2 border-black px-28"
        >
          {following ? "Following" : "+ Follow"}
        </button>
        <p className="mx-auto mb-12 w-72 text-center">
          Follow to get new release updates, special offers (including
          promotional offers) and improved recommendations.
        </p>
        <hr className="my-4 border-gray-300" />
      </div>
    </div>
  );
};

export default AuthorDetails;
