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

  const { data: { _id: userId } = {}, isFetching: l2 } = useQuery({
    queryKey: ["userId", session?.user?.email],
    queryFn: async () => {
      const { user } = await getUser(session?.user?.email);
      return user;
    },
    enabled: !!session?.user?.email,
  });

  const { data: followStatus, isFetching: l3 } = useQuery({
    queryKey: ["follow-status", authorId],
    queryFn: async () => {
      const { status } = await followStatusForUser(authorId, userId);
      console.log(status);
      return status;
    },
    enabled: !!userId && !!authorId,
  });

  const { data: authorBooks, isFetching: l4 } = useQuery({
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

  if (l1 || l2 || l3 || l4) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <BookLoading />
      </div>
    );
  }

  return (
    <div>
      <div className="container mx-auto">
        <div className="h-80 w-full rounded-md lg:flex lg:gap-6">
          <div>
            <Image
              className="mt-20 size-32 rounded-full border-8 border-gray-200 bg-red-300 object-cover shadow-xl shadow-blue-200"
              src={image}
              alt="Author Photo"
              width={150}
              height={150}
            />

            <Button
              onClick={mutate}
              className={`ml-4 mt-6 border-[1px] px-4 ${
                followStatus
                  ? "border-red-500 bg-red-500 text-white"
                  : "border-blue-500 bg-blue-500 text-white"
              }`}
            >
              {followStatus ? "Unfollow" : "+ Follow"}
            </Button>
          </div>
          <div className="mr-4 lg:mt-24 lg:w-4/5">
            <h1 className="text-xl font-bold">{name}</h1>
            <p className="text-justify">{biography}</p>
          </div>
        </div>
      </div>

      {/*Famous Work of Author Card*/}
      <div className="container mx-auto mt-32">
        <hr className="my-4 border-gray-300" />
        <h1 className="text-center text-2xl font-bold">{name}&apos;s Books</h1>
        <div className="mb-12 mt-8 grid grid-cols-6">
          {authorBooks?.length > 0 &&
            authorBooks?.map((book) => (
              <div key={book._id} className="h-32 w-24 rounded-md bg-green-200">
                Book Card
              </div>
            ))}
        </div>
      </div>

      {/*Filtering Author's Book*/}
      <div className="container mx-auto"></div>

      {/*Author*/}
      {/* <div className="container mx-auto">
        <hr className="my-4 border-gray-300" />
        <div className="flex justify-center">
          <Image
            className="h-20 w-20 rounded-full bg-red-300 object-cover shadow-2xl shadow-blue-400"
            src={image}
            alt="Author Photo"
            width={150}
            height={150}
          />
        </div>
        <h1 className="mt-4 text-center text-xl font-bold">Eran Ben-Joseph</h1>
        <button
          onClick={toggleFollow}
          className="mx-auto mb-4 mt-4 block border-[1px] border-black px-28"
        >
          {following ? "Following" : "+ Follow"}
        </button>
        <p className="mx-auto mb-12 w-72 text-center">
          Follow to get new release updates, special offers (including
          promotional offers) and improved recommendations.
        </p>
        <hr className="my-4 border-gray-300" />
      </div> */}
    </div>
  );
};

export default AuthorDetails;
