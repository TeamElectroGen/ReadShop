import React from "react";
import { Button } from "@/components/ui/button"



const Card = ({ book }) => {
  return (
    <div className="mx-auto w-[164px] flex flex-col h-full">
     {/* Book Cover Image */}
     <div className="h-[229px] bg-[#f3f2f2]">
        <img src={book.CoverImage} alt={book.BookName} className="h-full w-full object-cover" />
        
      </div>
      {/* Book Info */}
      <div className="flex flex-col flex-grow justify-between">
      <div className="mt-5 space-y-1">
        <p className="text-sm font-bold">{book.BookName}</p>
        <p className="text-sm"><span className="font-medium">AuthorName:</span> {book.AuthorName}</p>
        {/* <p className="text-sm "><span className="font-medium">PublicationName:</span> {book.PublicationName}</p> */}
        {/* <p className="text-sm "><span className="font-medium">Description:</span> {book.Description}</p> */}
        {/* <p className="text-sm "><span className="font-medium">PublishDate:</span> {book.PublishDate}</p> */}
        <p className="text-sm "><span className="font-medium">Price:</span> {book.Price}</p>
        <p className="text-sm "><span className="font-medium">Rating:</span> {book.Rating}</p>
      </div>
      <Button variant="outline">View Details</Button>
      </div>

    </div>
  );
};

export default Card;
