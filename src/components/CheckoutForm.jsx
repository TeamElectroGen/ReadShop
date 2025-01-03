"use client";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";
import { CgSpinner } from "react-icons/cg";
import { Button } from "./ui/button";
import { CardFooter } from "./ui/card";

const CheckoutForm = ({ totalPrice, onSubmit, isLoading, setIsLoading }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { data: session } = useSession() || {};

  // get clientSecret from server
  const { data: clientSecret = "" } = useQuery({
    queryKey: ["paymentIntent", totalPrice],
    queryFn: async () => {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/checkout/api/payment-intent`,
        {
          price: Math.round(totalPrice * 100),
        }
      );
      return data.client_secret;
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);
    if (!card) {
      return;
    }
    setIsLoading(true);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setIsLoading(false);
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
      setIsLoading(false);
      console.log("cardError", cardError);
    } else {
      console.log("payment intent", paymentIntent);
      if (paymentIntent.status === "succeeded") {
        onSubmit(paymentIntent);
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
            disabled={!stripe || !clientSecret || isLoading || !session?.user}
            className="mt-4 font-semibold"
          >
            {isLoading ? (
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
