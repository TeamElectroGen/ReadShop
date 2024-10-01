"use client";
import { useEffect, useState } from "react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import Image from "next/image";
import { MdDelete } from "react-icons/md";
import { Button } from "./ui/button";
import { FaCircle, FaCircleArrowRight } from "react-icons/fa6";
import { getBookDetails } from "@/services/getBooksData";

const ProductCart = ({ isOpen, onClose }) => {
  const [cartBooks, setCartBooks] = useState([]);

  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem("cartBooks")) || [];
    fetchCartBookDetails(storedCartItems);
  }, []);

  const fetchCartBookDetails = async (storedCartItems) => {
    try {
      const bookDetailsPromises = storedCartItems.map(async (item) => {
        const book = await getBookDetails(item.id); // Use item.id here
        return { ...book, quantity: item.quantity }; // Include the quantity
      });

      const bookDetails = await Promise.all(bookDetailsPromises);
      setCartBooks(bookDetails);
    } catch (error) {
      console.log("Error fetching book details:", error);
    }
  };

  const totalPrice = cartBooks.reduce(
    (total, book) => total + book.Price * book.quantity,
    0
  );

  const removeItem = (bookId) => {
    const updatedCartItems = cartBooks.filter((item) => item.id !== bookId);
    setCartBooks(updatedCartItems);
    localStorage.setItem("cartBooks", JSON.stringify(updatedCartItems));
  };

  return (
    <div>
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent className="scroll w-[400px]">
          <div className="border-b border-primary">
            <h2 className="w-fit rounded-t-sm bg-primary px-2 py-1 text-lg font-semibold">
              Your Cart
            </h2>
          </div>
          {/* Cart Item */}
          {cartBooks.length > 0 ? (
            <ul className="mt-4 flex flex-col gap-2">
              {cartBooks.map((book) => (
                <li
                  key={book.id}
                  className="flex min-h-20 items-center justify-between gap-5 rounded-sm border-b border-primary bg-primary/10 p-2"
                >
                  <div className="flex w-full gap-2">
                    <div>
                      <Image
                        src={book.CoverImage}
                        alt="Book Cover"
                        className="min-h-10"
                        width={40}
                        height={30}
                      />
                    </div>
                    <div>
                      <h3 className="text-xs font-bold">{book.BookName}</h3>
                      <p className="text-[0.5rem]">By: {book.AuthorName}</p>
                      <p className="text-sm">Quantity: {book.quantity}</p>
                    </div>
                  </div>
                  <p className="text-sm">
                    ${(book.Price * book.quantity).toFixed(2)}
                  </p>
                  <button
                    onClick={() => removeItem(book.id)} // Pass book.id to removeItem
                    className="h-fit w-fit rounded-sm p-1 hover:underline"
                  >
                    <MdDelete />
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="flex h-40 items-center justify-center">
              Your cart is currently empty.
            </p>
          )}
          {/* Total Price */}
          {cartBooks.length > 0 && (
            <div className="mt-4 flex justify-between rounded-sm border-t border-primary bg-primary-foreground/20 px-4 py-2">
              <h3 className="text-lg font-semibold">Total Price:</h3>
              <h3 className="pr-6 text-lg font-semibold">
                ${totalPrice.toFixed(2)}
              </h3>
            </div>
          )}
          {/* Checkout and Details Button */}
          <div className="mt-4 flex justify-between gap-4">
            <Button className="flex w-full gap-2 bg-primary-foreground text-white hover:bg-primary-foreground/90">
              <FaCircle />
              Cart Details
            </Button>
            <Button className="flex w-full gap-2 bg-primary">
              Checkout
              <FaCircleArrowRight />
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default ProductCart;
