"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
// import { toast } from "@/hooks/use-toast";
import { Textarea } from "@/components/ui/textarea";
import { useSession } from "next-auth/react";

const addBookFormSchema = z.object({
  BookName: z
    .string()
    .min(2, {
      message: "Name must be at least 2 characters.",
    })
    .max(50, {
      message: "Name must not be longer than 30 characters.",
    }),
  AuthorName: z.string({
    required_error: "Please give an author name.",
  }),
  Description: z.string().min(11, { message: "Write more Description" }),
  CoverImage: z.string(),
  Genre: z.string(),
  Price: z.string(),
  PublicationName: z.string(),
});

// This can come from your database or API.

const AddBookForm = () => {
  const { data: session } = useSession();
  const defaultValues = {
    PublicationName: session?.user?.name,
    PublicationEmail: session?.user?.email,
  };

  const form = useForm({
    resolver: zodResolver(addBookFormSchema),
    defaultValues,
    mode: "onChange",
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid w-full grid-cols-6 gap-4"
      >
        {/* Book Name field */}
        <FormField
          control={form.control}
          name="BookName"
          render={({ field }) => (
            <FormItem className="col-span-full sm:col-span-3">
              <FormLabel>Book Name</FormLabel>
              <FormControl>
                <Input placeholder="Book name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Author name field */}
        <FormField
          control={form.control}
          name="AuthorName"
          render={({ field }) => (
            <FormItem className="col-span-full sm:col-span-3">
              <FormLabel>Author Name</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Description field */}
        <FormField
          control={form.control}
          name="Description"
          render={({ field }) => (
            <FormItem className="col-span-full">
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Book Description"
                  className="min-h-32 resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Image URL field */}
        <FormField
          control={form.control}
          name="CoverImage"
          render={({ field }) => (
            <FormItem className="col-span-full">
              <FormLabel>Image URL</FormLabel>
              <FormControl>
                <Input placeholder="CoverImage URL" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Genre field */}
        <FormField
          control={form.control}
          name="Genre"
          render={({ field }) => (
            <FormItem className="col-span-full">
              <FormLabel>Genre</FormLabel>
              <FormControl>
                <Input placeholder="Genre names" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Price field */}
        <FormField
          control={form.control}
          name="Price"
          render={({ field }) => (
            <FormItem className="col-span-3 sm:col-span-2">
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input placeholder="Book price" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Publication name */}
        <FormField
          control={form.control}
          name="PublicationName"
          render={({ field }) => (
            <FormItem className="col-span-3 sm:col-span-2">
              <FormLabel>Publication Name</FormLabel>
              <FormControl>
                <Input placeholder="Bookworm Publication" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Publication email */}
        <FormField
          control={form.control}
          name="PublicationEmail"
          render={({ field }) => (
            <FormItem className="col-span-full sm:col-span-2">
              <FormLabel>Publication Email</FormLabel>
              <FormControl>
                <Input placeholder="Bookworm Publication" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="col-span-full flex justify-end">
          <Button type="submit" className="">
            Send publish request
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default AddBookForm;
