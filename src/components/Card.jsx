import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import RatingStar from "./RatingStar";
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
      href={`/view-details/${book?._id}`}
      className="z-20 mb-4 flex h-full w-full max-w-[212px] flex-col space-y-3 overflow-hidden rounded-xl border-2 border-white/70 bg-background/50 p-4 backdrop-blur-md transition-all duration-300 ease-in hover:shadow-md"
    >
      {/* Book Cover Image */}
      <div className="relative h-[260px] overflow-hidden rounded-md bg-[#f3f2f2] shadow-sm">
        <Image
          src={book?.CoverImage}
          alt={book?.BookName}
          className="h-full w-full object-cover"
          height={228}
          width={168}
        />
        <WishlistBtn
          wishListed={wishListed}
          onWishlistClick={handleWishlistClick}
        />
      </div>
      {/* Book Info */}
      <div className="flex flex-1 flex-col">
        {/* Book Name & Author */}
        <div className="h-16 flex-grow">
          <p className="line-clamp-2 text-sm font-bold">{book.BookName}</p>
          <p className="line-clamp-1 text-xs text-muted-foreground">
            {book.AuthorName}
          </p>
        </div>
        <div>
          <p className="text-sm">
            <span className="font-medium">$</span> {book.Price}
          </p>
          <div className="mt-2">
            <RatingStar rating={book?.Rating || 0} />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Card;
