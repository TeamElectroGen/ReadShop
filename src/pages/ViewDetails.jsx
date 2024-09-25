"use client";
import { getBookDetails } from "@/services/getBooksData";
import React, { useEffect, useState } from "react";

const ViewDetails = ({ bookid }) => {
  const [detailsBook, setDetailsBook] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const { bookDetails } = await getBookDetails(bookid);
      setDetailsBook(bookDetails);
    };
    fetch();
  }, [bookid]);
  console.log(detailsBook);
  return (
    <div>
      <p className="text-red-700">view details page</p>
    </div>
  );
};

export default ViewDetails;
