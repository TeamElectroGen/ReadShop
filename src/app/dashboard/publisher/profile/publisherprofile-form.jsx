"use client";

import CircleLoading from "@/components/CircleLoading";
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
import { getUser, updateProfile } from "@/services/getUserData";
import { queryClient } from "@/services/Providers";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { CgSpinnerTwo } from "react-icons/cg";
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

  const {
    data: userData = {},
    isLoading: isUserDataLoading,
    isFetching,
  } = useQuery({
    queryKey: ["userId", session?.user?.email],
    queryFn: async () => {
      const res = await getUser(session?.user?.email);
      return res.user;
    },
    enabled: !!session?.user?.email,
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (profileData) => {
      const data = await updateProfile(userData?._id, profileData);
      return data;
    },
    onSuccess: () => {
      console.log("Profile updated");
      toast.success("Profile Updated Successfully");
      queryClient.invalidateQueries(["userId", session?.user?.email]);
    },
  });

  const form = useForm({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
    },
    // mode: "onChange",
  });

  useEffect(() => {
    if (userData && Object.keys(userData).length > 0) {
      form.reset({
        name: userData?.name || "",
        email: userData?.email || "",
        phone: userData?.phone || "",
        address: userData?.address || "",
      });
    }
  }, [userData, form]);

  const onSubmit = async (data) => {
    try {
      await mutateAsync(data);
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
  };

  if (isUserDataLoading) {
    return <CircleLoading />;
  }

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
                <Input placeholder="Your name" {...field} />
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
                <Input placeholder="name@gmail.com" {...field} disabled />
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
                <Input placeholder="Your number" {...field} />
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
                  {...field}
                />
              </FormControl>
              <FormDescription>Address should be specific.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end">
          <Button
            className="w-full md:w-2/6 lg:w-1/4"
            disabled={isFetching || isPending || !form.formState.isDirty}
            type="submit"
          >
            {isPending ? (
              <CgSpinnerTwo className="animate-spin text-2xl" />
            ) : (
              <p>Update profile</p>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default PublisherProfileForm;
