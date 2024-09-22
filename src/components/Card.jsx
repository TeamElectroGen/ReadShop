import React from "react";

const Card = ({ book }) => {
  return (
    <div className="mx-auto w-[164px]">
     {/* Book Cover Image */}
     <div className="h-[229px] bg-[#f3f2f2]">
        <img src={book.CoverImage} alt={book.BookName} className="h-full w-full object-cover" />
        
      </div>
      {/* Book Info */}
      <div className="mt-5 space-y-1">
        <p className="text-sm font-bold">{book.BookName}</p>
        <p className="text-sm">AuthorName: {book.AuthorName}</p>
        <p className="text-sm ">PublicationName: {book.PublicationName}</p>
        <p className="text-sm ">Description: {book.Description}</p>
        <p className="text-sm ">PublicationName: {book.PublicationName}</p>
        <p className="text-sm ">PublishDate: {book.PublishDate}</p>
        <p className="text-sm ">Price: {book.Price}</p>
        <p className="text-sm ">Rating: {book.Rating}</p>
      </div>
    </div>
  );
};

export default Card;
