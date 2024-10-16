import { NextResponse } from "next/server";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export const POST = async (request) => {
  const { price } = await request.json();
  const amount = parseInt(price);

  const { client_secret } = await stripe.paymentIntents.create({
    amount: amount,
    currency: "usd",
    payment_method_types: ["card"],
  });
  return NextResponse.json({ client_secret });
};
