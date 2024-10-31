"use client";

import CircleLoading from "@/components/CircleLoading";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { getUser, updateProfile } from "@/services/getUserData";
import { queryClient } from "@/services/Providers";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon } from "@radix-ui/react-icons";
import { useMutation, useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
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
  dob: z.date(),
});

const ProfileForm = () => {
  const { data: session } = useSession() || {};

  const {
    data: userData = {},
    isPending: isUserDataLoading,
    isFetching,
  } = useQuery({
    queryKey: ["userId", session?.user?.email],
    queryFn: async () => {
      const { user } = await getUser(session?.user?.email);
      return user;
    },
    enabled: !!session?.user?.email,
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (profileData) => {
      const res = await updateProfile(userData?._id, profileData);
      return res;
    },
    onSuccess: () => {
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
      dob: new Date(),
    },
  });

  useEffect(() => {
    if (userData && Object.keys(userData).length > 0) {
      form.reset({
        name: userData.name || "",
        email: userData.email || "",
        phone: userData.phone || "",
        address: userData.address || "",
        dob: userData.dob? new Date(userData.dob) : new Date(),
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* Name field */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
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
        {/* Dob field */}
        <FormField
          control={form.control}
          name="dob"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Date of birth</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <>Pick a date</>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormDescription>
                Your date of birth is used to calculate your age.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          className="w-full md:w-1/4"
          disabled={isFetching || isPending || !form.formState.isDirty}
          type="submit"
        >
          {isPending ? (
            <CgSpinnerTwo className="animate-spin text-2xl" />
          ) : (
            <p>Update profile</p>
          )}
        </Button>
      </form>
    </Form>
  );
};

export default ProfileForm;
