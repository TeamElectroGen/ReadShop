"use client";
import {
  Card,
  CardContent,
  // CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import React from "react";
import { useForm } from "react-hook-form";

import { z } from "zod";
// import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
// import { Label } from "@/components/ui/label";
// import { CreditCardIcon } from "lucide-react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "@/components/CheckoutForm";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

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
  phoneNumber: z
    .string()
    .min(11, { message: "Phone number must be at least 11 digits" })
    .max(15, { message: "Phone number must not exceed 15 digits" })
    .regex(/^\+?[0-9]+$/, {
      message:
        "Phone number must contain only digits and optionally + can be added before country code ",
    }),
  emergencyPhone: z
    .string()
    .min(11, { message: "Phone number must be at least 11 digits" })
    .max(15, { message: "Phone number must not exceed 15 digits" })
    .regex(/^\+?[0-9]+$/, {
      message:
        "Phone number must contain only digits and optionally + can be added before country code ",
    }),
  district: z.string(),
  upazila: z.string(),
  address: z.string().max(160).min(4),
});

const ShippingInfoForm = ({ totalPrice, shippingFee, onSubmit }) => {
  const { data: session } = useSession() || {};
  const form = useForm({
    resolver: zodResolver(checkoutFormSchema),
    mode: "onChange",
  });

  return (
    <Form {...form}>
      <div className="space-y-5">
        {/* contact info */}
        <Card>
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-8">
            {/* Name field */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Your name"
                      defaultValue={session?.user?.name}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Email field */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="name@gmail.com"
                      defaultValue={session?.user?.email}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex w-full flex-col gap-4 *:w-full md:flex-row md:*:w-1/2">
              {/* Phone field */}
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input placeholder="" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Emergency number field */}
              <FormField
                control={form.control}
                name="emergencyPhone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Emergency number</FormLabel>
                    <FormControl>
                      <Input placeholder="" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>
        {/* Shipping Address */}
        <Card>
          <CardHeader>
            <CardTitle>Shipping Address</CardTitle>
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="flex w-full flex-col gap-4 *:w-full md:flex-row md:*:w-1/2">
              {/* District field */}
              <FormField
                control={form.control}
                name="district"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>District</FormLabel>
                    <FormControl>
                      <Input placeholder="" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Upazila field */}
              <FormField
                control={form.control}
                name="upazila"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Area/Upazila</FormLabel>
                    <FormControl>
                      <Input placeholder="" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {/* Address field */}
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Your specific address"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>Address should be specific.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>
        {/* Payment */}
        <Card>
          <CardHeader>
            <CardTitle>Payment</CardTitle>
          </CardHeader>
          <div>
            <Elements stripe={stripePromise}>
              <CheckoutForm
                totalPrice={totalPrice}
                shippingFee={shippingFee}
              ></CheckoutForm>
            </Elements>
          </div>
        </Card>
      </div>
    </Form>
  );
};

export default ShippingInfoForm;
