"use client";
// import { getUser } from "@/services/getUserData";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { CgSpinner } from "react-icons/cg";
import { Button } from "./ui/button";
import axios from "axios";
// import { useRouter } from "next/navigation";
import { CardFooter } from "./ui/card";

const CheckoutForm = ({ totalPrice }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession() || {};
  // const router = useRouter();

  // get clientSecret from server
  const { data: clientSecret = "" } = useQuery({
    queryKey: ["paymentIntent", totalPrice],
    queryFn: async () => {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/checkout/api/payment-intent`,
        {
          price: totalPrice,
        }
      );
      return data.client_secret;
    },
  });

  // get userInfo
  // const { data: user = {} } = useQuery({
  //   queryKey: ["user"],
  //   queryFn: async () => {
  //     const { user } = await getUser(session?.user?.email);
  //     return user;
  //   },
  //   enabled: !!session?.user?.email,
  // });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);
    if (!card) {
      return;
    }

    setLoading(true);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setLoading(false);
      console.log("error", error);
      return;
    } else {
      console.log("paymentMethod", paymentMethod);
    }

    const { paymentIntent, error: cardError } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: card,
          billing_details: {
            name: session?.user?.name || "Anonymous",
            email: session?.user?.email || "Anonymous",
          },
        },
      }
    );

    if (cardError) {
      setLoading(false);
      console.log("cardError", cardError);
    } else {
      console.log("payment intent", paymentIntent);
      if (paymentIntent.status === "succeeded") {
        setLoading(false);
        // router.push(`checkout/success/${paymentIntent.id}`);
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="w-full">
        <CardElement
          className="rounded-md bg-white p-4"
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <CardFooter className="flex justify-end">
          <Button
            type="submit"
            disabled={!stripe || !clientSecret || loading || !session?.user}
            className="mt-4"
          >
            {loading ? (
              <CgSpinner className="w-8 animate-spin text-xl" />
            ) : (
              `Confirm Order $${totalPrice}`
            )}
          </Button>
        </CardFooter>
      </form>
    </div>
  );
};

export default CheckoutForm;
