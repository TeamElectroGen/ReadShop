import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import RatingStar from "./RatingStar";
import { FaRegHeart } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa6";
import WishlistBtn from "./WishlistBtn";

const Card = ({ book }) => {
  const [wishListed, setWishListed] = useState(false);

  const handleWishlistClick = (event) => {
    event.preventDefault();
    console.log("wishlist got clicked");
    setWishListed(!wishListed);
  };

  return (
    <Link
      href={`/view-details/${book._id}`}
      className="z-50 transition-all ease-in duration-300 mb-4 flex h-full w-full max-w-[212px] flex-col space-y-3 overflow-hidden rounded-xl border-2 border-white/70 bg-background/50 p-4 backdrop-blur-md hover:shadow-md"
    >
      {/* Book Cover Image */}
      <div className="relative h-[260px] overflow-hidden rounded-md bg-[#f3f2f2] shadow-sm">
        <Image
          src={book.CoverImage}
          alt={book.BookName}
          className="h-full w-full object-cover"
          height={228}
          width={168}
        />
        <WishlistBtn wishListed={wishListed} onWishlistClick={handleWishlistClick}/>
      </div>
      {/* Book Info */}
      <div className="flex flex-1 flex-col justify-between">
        {/* Book Name & Author */}
        <div className="h-24 flex-grow">
          <p className="line-clamp-2 text-sm font-bold">{book.BookName}</p>
          <p className="line-clamp-1 text-sm text-muted-foreground">
            {book.AuthorName}
          </p>
          <p className="text-sm">
            <span className="font-medium">$</span> {book.Price}
          </p>
          <div className="mt-2">
            <RatingStar rating={book.Rating} />
          </div>
        </div>
        {/* View Details Button */}
        {/* <Button variant="outline" className="mt-4 w-full hidden group-hover:block transition-all ease-linear duration-500">
          Add to cart
        </Button> */}
      </div>
    </Link>
  );
};

export default Card;
