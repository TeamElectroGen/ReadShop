"use client";
import BookSectionTitle from "@/components/BookSectionTitle";
import Card from "@/components/Card";
import { getBooksByCategory } from "@/services/getBooksData";
import React, { useEffect, useState } from "react";

const BookOfCategory = ({ genre }) => {
  console.log(genre.genre);
  const category = genre.genre;
  const decodeText = decodeURIComponent(category);
  const [booksByCategory, setBooksByCategory] = useState([]);
  useEffect(() => {
    if (genre.genre) {
      const fetchBooksByCategory = async () => {
        try {
          const { books } = await getBooksByCategory(genre.genre);
          setBooksByCategory(books);
        } catch (error) {
          console.log(error);
        }
      };
      fetchBooksByCategory();
    }
  }, [genre]);
  console.log("booksByCategory", booksByCategory);

  return (
    <section className="container">
      <BookSectionTitle title={decodeText} />
      <div className="mb-10 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
        {booksByCategory.map((book) => (
          <Card key={book._id} book={book} />
        ))}
      </div>
    </section>
  );
};

export default BookOfCategory;
