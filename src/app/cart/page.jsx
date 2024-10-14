"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";
import { useCart } from "../context/CartContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { CircleXIcon, TicketPercentIcon, Trash2 } from "lucide-react";

const Cart = () => {
  const { cart, removeFromCart, updateQuantity } = useCart();
  console.log(cart);

  const shippingFee = 5;
  const totalPrice = cart.reduce(
    (total, book) => total + book.price * book.quantity,
    0
  );

  const handleRemove = (id) => {
    removeFromCart(id);
  };

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity > 0) {
      updateQuantity(id, newQuantity);
    }
  };

  return (
    <section className="container my-12 mb-16 space-y-6">
      <div className="space-y-0.5 text-center">
        <h2 className="text-2xl font-bold tracking-tight">My Shopping Cart</h2>
      </div>
      {/* flex container */}
      <div className="flex flex-col gap-6 md:flex-row md:gap-7 lg:gap-14">
        {/* Cart items table*/}
        <div className="glassmorphism w-full md:flex-1">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="hidden sm:table-cell">PRODUCT</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Subtotal</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            {/* Table content */}
            <TableBody>
              {cart?.map((book) => (
                <TableRow key={book._id}>
                  <TableCell className="flex items-start gap-2 font-medium">
                    <Image
                      alt="Product image"
                      className="rounded-md border object-contain shadow-md"
                      height="64"
                      src={book.coverImage}
                      width="44"
                    />
                    <div className="space-y-1">
                      <p className="text-foreground">{book.name}</p>
                      <p className="text-xs text-gray-500">{book.author}</p>
                    </div>
                  </TableCell>
                  <TableCell className="font-semibold text-red-600">
                    ${book.price}
                  </TableCell>
                  <TableCell>
                    <div className="flex w-16 items-center rounded-sm bg-primary/20 px-1 py-0.5">
                      <Button
                        className="h-5 w-5 rounded bg-secondary p-0 text-lg"
                        onClick={() =>
                          handleQuantityChange(book.id, book.quantity - 1)
                        }
                      >
                        -
                      </Button>
                      <p className="flex h-5 w-5 items-center justify-center rounded p-0 text-xs">
                        {book.quantity}
                      </p>
                      <Button
                        className="h-5 w-5 rounded bg-secondary p-0 text-lg"
                        onClick={() =>
                          handleQuantityChange(book.id, book.quantity + 1)
                        }
                      >
                        +
                      </Button>
                    </div>
                  </TableCell>
                  <TableCell>
                    ${(book.price * book.quantity).toFixed(2)}
                  </TableCell>
                  <TableCell>
                    <Button onClick={() => handleRemove(book.id)} size="icon" variant="ghost">
                      <CircleXIcon className="size-5 text-mediumGray-500 hover:text-destructive" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        {/* summary card */}
        <Card className="w-full self-start md:w-2/6">
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="">
              <div className="flex items-center justify-between border-b border-dashed py-3">
                <p>Subtotal</p>
                <p className="text-sm font-semibold">
                  ${totalPrice.toFixed(2)}
                </p>
              </div>
              <div className="flex items-center justify-between border-b border-dashed py-3">
                <p className="">Shipping</p>
                <p className="text-sm font-semibold">$5.00</p>
              </div>
              <div className="flex items-center justify-between border-dashed py-3">
                <p className="">Total</p>
                <p className="text-sm font-semibold">${totalPrice + 5}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Coupon code */}
      <div className="pb-16 pt-14">
        <h3 className="mb-4 text-xl font-medium">Have a coupon?</h3>
        <form className="mb-4 flex w-full max-w-sm items-center justify-start space-x-2">
          <div className="relative ml-auto w-full flex-1">
            <TicketPercentIcon className="absolute left-2.5 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Coupon code"
              className="w-full rounded-lg bg-background py-5 pl-8"
            />
            <Button className="absolute right-2 font-semibold top-1" type="submit" size="sm">
              Apply
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Cart;
