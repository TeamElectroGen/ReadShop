"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { getAuthorById } from "@/services/getBooksData";
import { useMutation, useQuery } from "@tanstack/react-query";
import BookLoading from "@/components/BookLoading";
import {
  authorToggleFollow,
  followStatusForUser,
  getAuthorBooks,
} from "@/services/authorsCRUD";
import { getUser } from "@/services/getUserData";
import { useSession } from "next-auth/react";
import { queryClient } from "@/services/Providers";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { Separator } from "@/components/ui/separator";
import AuthorBookCard from "@/components/AuthorBookCard";

const AuthorDetails = ({ authorId }) => {
  const { data: session } = useSession() || {};

  const {
    data: {
      name,
      // username,
      image,
      biography,
      // birthDate,
      // birthPlace,
      // nationality,
      // famousWork,
      // awards,
      // booksWrittenIds,
      // bestAuthor,
      // socialLinks,
      // totalBooksSold,
      // followers,
      // isFeatured,
      // authorQuotes,
    } = {},
    isFetching: l1,
  } = useQuery({
    queryKey: ["author", authorId],
    queryFn: async () => {
      const { author } = await getAuthorById(authorId);
      return author;
    },
  });

  const { data: { _id: userId } = {} } = useQuery({
    queryKey: ["userId", session?.user?.email],
    queryFn: async () => {
      const { user } = await getUser(session?.user?.email);
      return user;
    },
    enabled: !!session?.user?.email,
  });

  const { data: followStatus } = useQuery({
    queryKey: ["follow-status", authorId],
    queryFn: async () => {
      const { status } = await followStatusForUser(authorId, userId);
      console.log(status);
      return status;
    },
    enabled: !!userId && !!authorId,
  });

  const { data: authorBooks } = useQuery({
    queryKey: ["author-books", authorId],
    queryFn: async () => {
      const { authorBooks } = await getAuthorBooks(authorId);
      return authorBooks;
    },
    enabled: !!authorId,
  });

  const { mutate } = useMutation({
    mutationKey: ["toggle-follow", authorId],
    mutationFn: async () => {
      const { message } = await authorToggleFollow(authorId, userId);
      console.log(message);
      return message;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["follow-status", authorId] });
    },
  });

  if (l1) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <BookLoading />
      </div>
    );
  }

  return (
    <section className="container mt-20">
      <Card className="">
        {/* Author introduction */}
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center gap-4">
            <Image
              className="size-32 rounded-full object-cover drop-shadow-xl"
              src={image}
              alt="Author Photo"
              width={100}
              height={100}
            />
            <div>
              <h2 className="mb-2 font-serif text-sm font-semibold md:text-lg">
                {name}
                <RiVerifiedBadgeFill className="-mt-1 ml-2 inline-block text-blue-400" />
              </h2>
              <p className="text-xs text-mediumGray-500 sm:text-sm">
                {authorBooks?.length} books • 10k followers
              </p>
            </div>
          </div>
          <Button
            onClick={mutate}
            className={`font-semibold ${followStatus && "bg-gr"}`}
          >
            {followStatus ? "Unfollow" : "+ Follow"}
          </Button>
        </CardHeader>

        <CardContent className="">
          <p className="max-w-2xl text-justify text-sm font-normal text-darkGray-800">
            {biography}
          </p>
        </CardContent>
      </Card>

      {/*Famous Work of Author Card*/}
      <div className="mt-12">
        <h1 className="text-lg font-bold">{name}&apos;s Books</h1>
        <Separator />
        <div className="mb-12 mt-6 grid gap-5 md:grid-cols-2">
          {authorBooks?.length > 0 &&
            authorBooks?.map((book) => (
              <AuthorBookCard key={book.id} book={book} />
            ))}
        </div>
      </div>
    </section>
  );
};

export default AuthorDetails;

{
  /*Filtering Author's Book*/
}
{
  /* <div className=""></div> */
}
