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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
// import { toast } from "@/hooks/use-toast";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { useSession } from "next-auth/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast, useToast } from "@/hooks/use-toast";
import { getUser, updateProfile } from "@/services/getUserData";
import { useState } from "react";

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
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

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
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
              <FormLabel>Address</FormLabel>
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
        <Button type="submit">Update profile</Button>
      </form>
    </Form>
  );
};

export default ProfileForm;
