"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCart } from "../context/CartContext";
import Image from "next/image";
import ShippingInfoForm from "./shippingInfo-form";

const Page = () => {
  const { cart } = useCart();
  const shippingFee = 5;
  const totalPrice = cart.reduce(
    (total, book) => total + book.price * book.quantity,
    0
  );

  const onSubmit = (data) => {
    console.log('data');
  };

  return (
    <>
      <section className="container my-12 mb-16 space-y-6">
        <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">Checkout</h2>
          <p className="text-muted-foreground">
            Make sure to check all the information before placing order
          </p>
        </div>
        {/* flex container */}
        <div className="flex flex-col gap-6 md:flex-row md:gap-16">
          {/* Shipping info form */}
          <div className="w-full rounded-lg md:flex-1">
            <ShippingInfoForm
              totalPrice={totalPrice}
              shippingFee={shippingFee}
              onSubmit={onSubmit}
            />
          </div>
          {/* summary card */}
          <Card className="w-full self-start md:w-2/6">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              {cart.length > 0 && (
                <ul className="mt-4 flex flex-col gap-2">
                  {cart.map((book) => (
                    <li
                      key={book.id}
                      className="flex items-start justify-between gap-3 rounded-sm border-b border-primary bg-primary/10 p-2"
                    >
                      <div className="flex w-full gap-2">
                        <div className="min-h-14">
                          <Image
                            className="max-h-12 min-h-12 min-w-8 max-w-8 bg-primary object-contain"
                            src={book?.coverImage}
                            width={50}
                            height={100}
                            alt={book.name}
                          ></Image>
                        </div>
                        <div>
                          <h3 className="text-xs font-bold">
                            {book.name}{" "}
                            <span className="ml-1.5 text-xs font-normal">
                              x{book.quantity}
                            </span>
                          </h3>
                          <p className="text-[0.5rem]">By: {book.author}</p>
                        </div>
                      </div>
                      <div className="flex flex-col items-end">
                        <p className="text-xs font-semibold">
                          ${(book.price * book.quantity).toFixed(2)}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
              <div className="mb-4 flex w-full max-w-sm items-center space-x-2">
                <Input type="email" placeholder="Coupon code" />
                <Button type="submit" size="sm">
                  Apply
                </Button>
              </div>

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
      </section>
    </>
  );
};

export default Page;
