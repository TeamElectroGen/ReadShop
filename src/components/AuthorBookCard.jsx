import React from "react";
// import { Card } from "./ui/card";
import Link from "next/link";
import Image from "next/image";
// import WishlistBtn from "./WishlistBtn";
import RatingStar from "./RatingStar";

const AuthorBookCard = ({ book }) => {
    console.log(book);
    
  return (
    <Link
      href={`/view-details/${book?._id}`}
      className="z-20 flex gap-5 h-full w-full overflow-hidden rounded-xl glassmorphism p-4 transition-all duration-300 ease-in hover:shadow-md"
    >
      {/* Book Cover Image */}
      <div className="relative overflow-hidden rounded-md bg-[#f3f2f2] shadow-sm">
        <Image
          src={book?.CoverImage}
          alt={book?.BookName}
          className="h-full w-full object-cover shadow-lg"
          height={128}
          width={84}
        />
        {/* <WishlistBtn
          wishListed={wishListed}
          onWishlistClick={handleWishlistClick}
        /> */}
      </div>
      {/* Book Info */}
      <div className="flex flex-1 flex-col">
        {/* Book Name & Author */}
        <div className="h-16 flex-grow">
          <p className="line-clamp-2 text-sm md:text-lg font-bold">{book.BookName}</p>
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

export default AuthorBookCard;
