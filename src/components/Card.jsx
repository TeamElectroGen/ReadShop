import React from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

const Card = ({ book }) => {
  return (
    <div className="mx-auto flex h-full w-[164px] flex-col overflow-hidden rounded-lg shadow-lg">
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
      <div className="flex flex-grow flex-col justify-between">
        <div className="mt-5 space-y-1 ml-2">
          <p className="text-sm font-bold">{book.BookName}</p>
          <p className="text-sm">
            <span className="font-medium">AuthorName:</span> {book.AuthorName}
          </p>
          {/* <p className="text-sm "><span className="font-medium">PublicationName:</span> {book.PublicationName}</p> */}
          {/* <p className="text-sm "><span className="font-medium">Description:</span> {book.Description}</p> */}
          {/* <p className="text-sm "><span className="font-medium">PublishDate:</span> {book.PublishDate}</p> */}
          <p className="text-sm">
            <span className="font-medium">Price:</span> {book.Price}
          </p>
          <p className="text-sm">
            <span className="font-medium">Rating:</span> {book.Rating}
          </p>
        </div>
        <Link href={`/view-details/${book._id}`}>
          <Button variant="outline" className="mt-2 w-full">View Details</Button>
        </Link>
      </div>
    </div>
  );
};

export default Card;
