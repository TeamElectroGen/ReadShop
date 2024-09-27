"use client";
import { useEffect, useState } from "react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import Image from "next/image";
import { MdDelete } from "react-icons/md";
import { Button } from "./ui/button";
import { FaCircle, FaCircleArrowRight } from "react-icons/fa6";

const ProductCart = ({ isOpen, onClose }) => {
    const [cartItems, setCartItems] = useState([]);

    // Get Cart items from local storage
    useEffect(() => {
        const storedCartItems = JSON.parse(localStorage.getItem("cartBooks")) || [];
        setCartItems(storedCartItems);
    }, []);

    // Total price
    const totalPrice = cartItems.reduce((total, book) => total + book.Price, 0);

    // Remove item from Local Storage by BookName
    const removeItem = (bookName) => {
        const updatedCartItems = cartItems.filter(book => book.BookName !== bookName);
        setCartItems(updatedCartItems);
        localStorage.setItem("cartBooks", JSON.stringify(updatedCartItems));
    };

    return (
        <div>
            <Sheet open={isOpen} onOpenChange={onClose}>
                <SheetContent className="w-[400px] scroll">
                    <div className="border-b border-primary">
                        <h2 className="text-lg font-semibold bg-primary w-fit px-2 rounded-t-sm py-1">Your Cart</h2>
                    </div>
                    {/* Cart Item */}
                    {cartItems.length > 0 ? (
                        <ul className="flex flex-col gap-2 mt-4">
                            {cartItems.map((book) => (
                                <li key={book.BookName} className="p-2 border-b border-primary flex justify-between gap-5 min-h-20 items-center bg-primary/10 rounded-sm">
                                    <div className="flex gap-2 w-full">
                                        <div>
                                            <Image src={book.CoverImage} alt="Book Cover" className="min-h-10" width={40} height={30} />
                                        </div>
                                        <div>
                                            <h3 className="text-xs font-bold">{book.BookName}</h3>
                                            <p className="text-[0.5rem]">By: {book.AuthorName}</p>
                                        </div>
                                    </div>
                                    <p className="text-sm">${book.Price.toFixed(2)}</p>
                                    <button
                                        onClick={() => removeItem(book.BookName)}
                                        className="w-fit h-fit p-1 rounded-sm hover:underline"
                                    >
                                        <MdDelete />
                                    </button>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="h-40 flex items-center justify-center">Your cart is currently empty.</p>
                    )}
                    {/* Total Price */}
                    {cartItems.length > 0 && (
                        <div className="mt-4 border-t border-primary flex justify-between bg-primary-foreground/20 px-4 py-2 rounded-sm">
                            <h3 className="text-lg font-semibold">Total Price:</h3>
                            <h3 className="pr-6 text-lg font-semibold">${totalPrice.toFixed(2)}</h3>
                        </div>
                    )}
                    {/* Checkout and Details Button */}
                    <div className="flex justify-between mt-4 gap-4">
                        <Button className="w-full bg-primary-foreground text-white flex gap-2 hover:bg-primary-foreground/90"><FaCircle />Cart Details</Button>
                        <Button className="w-full bg-primary flex gap-2">Checkout <FaCircleArrowRight /></Button>
                    </div>
                </SheetContent>
            </Sheet>
        </div>
    );
};

export default ProductCart;
