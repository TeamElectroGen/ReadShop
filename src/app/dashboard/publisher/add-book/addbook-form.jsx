"use client";

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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
// import { toast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { authorName } from "@/services/authorsCRUD";
import { postBookData } from "@/services/publisherRelated";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import toast from "react-hot-toast";

const addBookFormSchema = z.object({
  BookName: z
    .string()
    .min(2, {
      message: "Name must be at least 2 characters.",
    })
    .max(50, {
      message: "Name must not be longer than 30 characters.",
    }),
  authorId: z
    .string({
      required_error: "Please select an author name.",
    })
    .min(1, "Please select an author name."),
  Description: z.string().min(11, { message: "Write more Description" }),
  CoverImage: z.string().url({ message: "Please enter a valid image URL" }),
  Genre: z.string().refine(
    (value) => {
      if (value.includes(" ")) {
        return value.includes(",");
      }
      return true;
    },
    { message: "Multiple genres must be separated by commas" }
  ),
  Price: z.string(),
  PublicationName: z.string(),
  wishList: z.array(),
  readList: z.array(),
});

const AddBookForm = () => {
  const { data: session } = useSession() || {};

  const { data: authors } = useQuery({
    queryKey: ["authors"],
    queryFn: async () => {
      const res = await authorName();
      return res.authorNames;
    },
  });

  const form = useForm({
    resolver: zodResolver(addBookFormSchema),
    defaultValues: {
      BookName: "",
      authorId: "",
      CoverImage: "",
      Description: "",
      PublicationName: "",
      Genre: "",
      Price: "",
      wishList: [],
      readList: [],
    },
    // mode: "onChange",
  });

  useEffect(() => {
    form.reset({
      BookName: "",
      authorId: "",
      CoverImage: "",
      Description: "",
      PublicationName: session?.user?.name,
      Genre: "",
      Price: "",
      wishList: [],
      readList: [],
    });
  }, [form, session?.user?.email, session?.user?.name]);

  const { mutate, isPending } = useMutation({
    queryKey: ["add-book"],
    mutationFn: async (bookData) => {
      const res = await postBookData(session?.user?.email, bookData);
      return res;
    },
    onSuccess: (data) => {
      if (data.success) {
        form.reset();
        toast.success("Book published successfully");
      }
      console.log(data);
    },
  });

  const onSubmit = (data) => {
    mutate(data);
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
          name="authorId"
          render={({ field }) => (
            <FormItem className="col-span-full sm:col-span-3">
              <FormLabel>Author Name</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Author Name" />
                  </SelectTrigger>
                  <SelectContent>
                    {authors?.map((author) => (
                      <SelectItem key={author._id} value={author._id}>
                        {author?.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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
        {/* <FormField
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
        /> */}
        {/* Publication email */}
        {/* <FormField
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
        /> */}
        <div className="col-span-4 flex md:items-end md:justify-end">
          <Button disabled={isPending} type="submit" className="">
            Send publish request
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default AddBookForm;
