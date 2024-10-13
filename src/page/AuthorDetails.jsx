"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";



const AuthorDetails = ({ authorId }) => {
  const [following, setFollowing] = useState(false);

  const [author, setAuthor] = useState({});
  const {
    name,
    // username,
    image,
    biography,
    // birthDate,
    // birthPlace,
    // nationality,
    // famousWork,
    // awards,
    // booksWrittenIds,
    // bestAuthor,
    // socialLinks,
    // totalBooksSold,
    // followers,
    // isFeatured,
    // authorQuotes,
  } = author;
  useEffect(() => {
    const fetchAuthor = async () => {
      const { author } = await getAuthorById(authorId);
      setAuthor(author);
    };
    fetchAuthor();
  }, [authorId]);


  const [authorData, setAuthorData] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => {
        setAuthorData(data);
      });
  }, []);

  console.log(authorData);

  // Toggle follow/unfollow:
  const toggleFollow = () => {
    setFollowing(!following);
  };

  return (
    <div>
     <h1>Data: {authorData.length}</h1>
      <div className="container mx-auto">
        <div className="h-80 w-full rounded-md lg:flex lg:gap-6">
          <div>
            <Image
              className="mt-20 size-32 rounded-full border-8 border-gray-200 bg-red-300 object-cover object-cover shadow-xl shadow-blue-200"
              src={image}
              alt="Author Photo"
              width={600}
              height={600}
            />


            <Button
              onClick={toggleFollow}
              className={`ml-4 mt-6 border-[1px] px-4 ${
                following
                  ? "border-red-500 bg-red-500 text-white"
                  : "border-blue-500 bg-blue-500 text-white"
              }`}
            >
              {following ? "Unfollow" : "+ Follow"}
            </Button>
          </div>
          <div className="mr-4 lg:mt-24 lg:w-4/5">
            <h1 className="text-xl font-bold">{name}</h1>
            <p className="text-justify">{biography}</p>
          </div>
        </div>
      </div>

      {/*Famous Work of Author Card*/}
      <div className="container mx-auto mt-32">
        <hr className="my-4 border-gray-300" />
        <h1 className="text-center text-2xl font-bold">{name}&apos;s Books</h1>
        <div className="mb-12 mt-8 grid grid-cols-6">
          <div className="h-32 w-24 rounded-md bg-green-200">Book Card</div>
        </div>
      </div>

      {/*Filtering Author's Book*/}
      <div className="container mx-auto"></div>

      {/*Author*/}
      <div className="container mx-auto">
        <hr className="my-4 border-gray-300" />
        <div className="flex justify-center">
          <Image
            className="h-20 w-20 rounded-full bg-red-300 object-cover object-cover shadow-2xl shadow-blue-400"
            src={image}
            alt="Author Photo"
            width={600}
            height={600}
          />
        </div>
        <h1 className="mt-4 text-center text-xl font-bold">Eran Ben-Joseph</h1>
        <button
          onClick={toggleFollow}
          className="mx-auto mb-4 mt-4 block border-[1px] border-black px-28"
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
