"use client";
import BookLoading from "@/components/BookLoading";
import EmptyCart from "@/components/EmptyCart";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { getCouponCode } from "@/services/couponCode";
import { getUser } from "@/services/getUserData";
import { postPaymentData } from "@/services/payment";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { CgSpinnerTwo } from "react-icons/cg";
import { z } from "zod";
import { useCart } from "../context/CartContext";
import ShippingInfoForm from "./shippingInfo-form";

const checkoutFormSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Name must be at least 2 characters.",
    })
    .max(30, {
      message: "Name must not be longer than 30 characters.",
    }),
  email: z
    .string({
      required_error: "Please give an email address.",
    })
    .email(),
  phone: z
    .string()
    .min(11, { message: "Phone number must be at least 11 digits" })
    .max(20, { message: "Phone number must not exceed 15 digits" }),
  emergencyPhone: z
    .string()
    .min(11, { message: "Phone number must be at least 11 digits" })
    .max(20, { message: "Phone number must not exceed 15 digits" }),
  district: z.string(),
  upazila: z.string(),
  address: z.string().max(160).min(4),
});

const Checkout = () => {
  const { cart } = useCart();
  const { data: session } = useSession() || {};
  const [isMounted, setIsMounted] = useState(false);

  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const [error, setError] = useState("");
  // const [isLoading, setIsLoading] = useState(false);

  const shippingFee = 5;
  const subtotalPrice = cart.reduce(
    (total, book) => total + book.price * book.quantity,
    0
  );

  const discountAmount = (subtotalPrice * discount) / 100;
  const discountedPrice = subtotalPrice - discountAmount;
  const totalPrice = (discountedPrice + shippingFee).toFixed(2);

  // const totalPrice = (subtotalPrice + shippingFee).toFixed(2);

  const form = useForm({
    resolver: zodResolver(checkoutFormSchema),
    values: {
      name: session?.user?.name || "",
      email: session?.user?.email || "",
      phone: "",
      emergencyPhone: "",
      district: "",
      upazila: "",
      address: "",
    },
    mode: "onChange",
  });

  const { data: { _id: userId } = {} } = useQuery({
    queryKey: ["userId", session?.user?.email],
    queryFn: async () => {
      const { user } = await getUser(session?.user?.email);
      return user;
    },
    enabled: !!session?.user?.email,
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const {
    mutate: applyCoupon,
    isPending,
    data: couponDetails = {},
  } = useMutation({
    mutationKey: ["get-coupon", coupon],
    mutationFn: async () => {
      const { coupon: couponData } = await getCouponCode(coupon);
      return couponData;
    },
    onSuccess: (couponData) => {
      if (couponData && couponData.couponCode === coupon) {
        setDiscount(couponData.discount);
        toast.success("Coupon applied successfully!");
        setError("");
      } else {
        setError("Invalid coupon code.");
        setDiscount(0);
      }
    },
    onError: () => {
      setError("Error applying coupon. Please try again.");
      setDiscount(0);
    },
  });

  const onSubmit = async (paymentIntent) => {
    const bookIds = JSON.parse(localStorage.getItem("cart"));

    const paymentInfo = {
      ...form.watch(),
      userId,
      bookIds,
      subtotalPrice: subtotalPrice.toFixed(2),
      shippingFee,
      couponDetails,
      totalPrice,
      payTime: new Date(),
      status: "pending",
      txnId: paymentIntent.id,
    };
    console.log(paymentInfo);
    const res = await postPaymentData(paymentInfo);

    if (res.insertedId) {
      localStorage.removeItem("cart");
      window.location.href = `/checkout/success/${paymentInfo.txnId}`;
    }
  };

  if (!isMounted) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <BookLoading />
      </div>
    );
  }

  return (
    <>
      <section className="container my-12 mb-16 space-y-6">
        <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">Checkout</h2>
          <p className="text-muted-foreground">
            Make sure to check all the information before placing order
          </p>
        </div>
        {cart?.length === 0 ? (
          <EmptyCart
            title="Can't checkout! your cart is empty"
            desc="Add books to cart before checkout"
          />
        ) : (
          <div className="flex flex-col gap-6 md:flex-row md:gap-7 lg:gap-14">
            {/* Shipping info form */}
            <div className="w-full rounded-lg md:flex-1">
              <ShippingInfoForm
                form={form}
                totalPrice={totalPrice}
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
                          <Link
                            href={`/view-details/${book?.id}`}
                            className="min-h-14"
                          >
                            <Image
                              className="max-h-12 min-h-12 min-w-8 max-w-8 bg-primary object-contain"
                              src={book?.coverImage}
                              width={50}
                              height={100}
                              alt={book.name}
                            ></Image>
                          </Link>
                          <div>
                            <Link
                              href={`/view-details/${book?.id}`}
                              className="text-xs font-bold"
                            >
                              <span className="hover:underline">
                                {book.name}{" "}
                              </span>
                              <span className="ml-1.5 text-xs font-normal">
                                x{book.quantity}
                              </span>
                            </Link>
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

                {!discount && (
                  <div className="flex w-full max-w-sm items-center space-x-2">
                    <Input
                      type="text"
                      placeholder="Coupon code"
                      className="input-field"
                      value={coupon}
                      onChange={(e) => setCoupon(e.target.value)}
                    />
                    <Button
                      type="submit"
                      size="sm"
                      onClick={() => applyCoupon()}
                      className="w-20"
                    >
                      {isPending ? (
                        <CgSpinnerTwo className="mx-2 animate-spin text-xl" />
                      ) : (
                        "Apply"
                      )}
                    </Button>
                  </div>
                )}
                {error && (
                  <p className="!mt-2 ml-2 text-sm text-red-500">{error}</p>
                )}

                <div className="">
                  <div className="flex items-center justify-between border-b border-dashed py-3">
                    <p>Subtotal</p>
                    <p className="text-sm font-semibold">
                      $ {subtotalPrice.toFixed(2)}
                    </p>
                  </div>
                  {!!discount && (
                    <div className="flex items-center justify-between border-b border-dashed py-3">
                      <p className="">Discount ({discount}%)</p>
                      <p className="text-sm font-semibold">
                        -$ {discountAmount.toFixed(2)}
                      </p>
                    </div>
                  )}

                  <div className="flex items-center justify-between border-b border-dashed py-3">
                    <p className="">Shipping</p>
                    <p className="text-sm font-semibold">
                      $ {shippingFee.toFixed(2)}
                    </p>
                  </div>

                  <div className="flex items-center justify-between border-dashed py-3">
                    <p className="">Total</p>
                    <p className="text-sm font-semibold">$ {totalPrice}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </section>
    </>
  );
};

export default Checkout;
