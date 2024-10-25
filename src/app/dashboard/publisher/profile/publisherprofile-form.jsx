"use client";

import { Button } from "@/components/ui/button";
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
import { useToast } from "@/hooks/use-toast";
import { getUser, updateProfile } from "@/services/getUserData";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const profileFormSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Name must be at least 2 characters.",
    })
    .max(30, {
      message: "Name must not be longer than 30 characters.",
    }),
  phone: z
    .string()
    .min(11, { message: "Phone number must be at least 11 digits" })
    .max(20, { message: "Phone number must not exceed 15 digits" }),
  address: z.string().max(160).min(4),
});

const PublisherProfileForm = () => {
  const { data: session } = useSession() || {};
  console.log(session);
  // eslint-disable-next-line no-unused-vars
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // eslint-disable-next-line no-unused-vars
  const { data: userData = {}, isLoading: isUserDataLoading } = useQuery({
    queryKey: ["userId", session?.user?.email],
    queryFn: async () => {
      const { user } = await getUser(session?.user?.email);
      return user;
    },
    enabled: !!session?.user?.email,
  });

  const { mutateAsync } = useMutation({
    mutationFn: async (profileData) => {
      console.log(profileData);
      const { data } = await updateProfile(userData?._id, profileData);
      console.log(data);
      return data;
    },
    onSuccess: () => {
      console.log("Profile updated");
      toast({
        title: "Profile Updated Successfully",
      });
    },
  });

  console.log(userData);

  const form = useForm({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: userData ? userData?.name : "",
      phone: userData ? userData?.phone : "",
      address: userData ? userData?.address : "",
      dob: userData ? userData?.dob : "",
    },
    mode: "onChange",
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    console.log(data);
    try {
      console.log(data);
      await mutateAsync(data);
    } catch (err) {
      console.log(err);
      toast(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-8">
        {/* Name field */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Publication Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Your name"
                  {...field}
                  value={userData?.name}
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
                  {...field}
                  value={userData?.email}
                  disabled
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Phone field */}
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input
                  placeholder="Your number"
                  value={userData?.phone}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Address field */}
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Office Address</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Your specific address"
                  className="resize-none"
                  value={userData?.address}
                  {...field}
                />
              </FormControl>
              <FormDescription>Address should be specific.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end">
          <Button type="submit">Update profile</Button>
        </div>
      </form>
    </Form>
  );
};

export default PublisherProfileForm;
