"use client";
import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "@/components/CheckoutForm";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

const Page = () => {
  const totalPrice = 90;
  return (
    <div>
      <Elements stripe={stripePromise}>
        <CheckoutForm totalPrice={totalPrice}></CheckoutForm>
      </Elements>
    </div>
  );
};

export default Page;
