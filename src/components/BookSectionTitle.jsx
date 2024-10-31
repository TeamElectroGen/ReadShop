import React from "react";

const BookSectionTitle = ({ title }) => {
  return (
    <div className="mb-5 border-b border-primary">
      <h2 className="w-fit rounded-t-sm bg-primary px-2 py-1 font-bold md:px-4 md:text-2xl md:uppercase">
        {title}
      </h2>
    </div>
  );
};

export default BookSectionTitle;
