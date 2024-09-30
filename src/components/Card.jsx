import React from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import RatingStar from "./RatingStar";

const Card = ({ book }) => {
  return (
    <div className="mx-auto h-full flex w-full max-w-[200px] flex-col overflow-hidden shadow-md mb-5 rounded-md">
      {/* Book Cover Image */}
      <div className="h-[229px] bg-[#f3f2f2] relative overflow-hidden">
        <Image
          src={book.CoverImage}
          alt={book.BookName}
          className="h-full w-full object-cover"
          height={228}
          width={168}
        />
      </div>
      {/* Book Info */}
      <div className="flex flex-1 flex-col justify-between p-4">
        {/* Book Name & Author */}
        <div className="flex-grow h-24">
          <p className="text-sm font-bold line-clamp-2">{book.BookName}</p>
          <p className="text-sm text-muted-foreground line-clamp-1">{book.AuthorName}</p>
          <p className="text-sm">
            <span className="font-medium">$</span> {book.Price}
          </p>
          <div className="mt-2">
            <RatingStar rating={book.Rating} />
          </div>
        </div>
        {/* View Details Button */}
        <div className="mt-4">
          <Link href={`/view-details/${book._id}`}>
            <Button variant="outline" className="w-full">
              View Details
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Card;
