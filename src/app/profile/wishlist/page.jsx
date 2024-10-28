"use client";
import CircleLoading from "@/components/CircleLoading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { deleteRWList, getWishlistBooks } from "@/services/getBooksData";
import { queryClient } from "@/services/Providers";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Trash2 } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";

const WishlistPage = () => {
  const { data: session } = useSession() || {};

  const {
    data: wishlistBooks = [],
    isPending,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["wishlist", session?.user?.email],
    queryFn: () =>
      getWishlistBooks(session?.user?.email).then((res) => res.books),
    enabled: !!session?.user?.email,
  });

  const { mutate: handleRemoveWish, isPending: loading } = useMutation({
    mutationFn: (bookId) => {
      toast.loading("Removing from wishlist...");
      return deleteRWList("wish", bookId, session?.user?.email);
    },
    onSuccess: () => {
      toast.dismiss();
      toast.success("Removed from wishlist");
      queryClient.invalidateQueries(["wishlist", session?.user?.email]);
    },
    onError: (error) => {
      toast.dismiss();
      toast.error("Failed to remove from wishlist");
      console.log(error);
    },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Wishlist</CardTitle>
        <CardDescription>Manage your wishlist.</CardDescription>
      </CardHeader>
      {isPending || isLoading ? (
        <CircleLoading />
      ) : wishlistBooks.length > 0 ? (
        <CardContent className="mx-6 mb-6 rounded-lg border p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="hidden sm:table-cell">
                  <span className="sr-only">Serial Number</span>
                </TableHead>
                <TableHead>Book</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            {/* Table content */}
            <TableBody>
              {wishlistBooks?.map((book, idx) => (
                <TableRow key={book._id}>
                  <TableCell className="hidden sm:table-cell">
                    {idx + 1}.
                  </TableCell>
                  <TableCell className="flex items-center gap-2 font-medium">
                    <Image
                      alt="Product image"
                      className="rounded-md border object-cover"
                      height="64"
                      src={book.CoverImage}
                      width="64"
                    />
                    <div className="space-y-1">
                      <Link
                        href={`/view-details/${book?._id}`}
                        className="text-foreground hover:underline"
                      >
                        {book.BookName}
                      </Link>
                      <p className="text-xs text-gray-500">{book.AuthorName}</p>
                    </div>
                  </TableCell>
                  <TableCell className="font-semibold text-red-600">
                    ${book.Price}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className="bg-green-50 text-green-600"
                    >
                      In stock
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button
                      disabled={isFetching || loading}
                      onClick={() => handleRemoveWish(book._id)}
                      size="icon"
                      variant="outline"
                    >
                      <Trash2 className="size-5 text-destructive" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      ) : (
        <>
          <section
            className="flex h-full flex-1 items-center justify-center rounded-lg border border-dashed bg-background py-16 shadow-sm"
            x-chunk="dashboard-02-chunk-1"
          >
            <div className="flex flex-col items-center gap-1 text-center">
              <Image
                src={"/assets/not-found.svg"}
                alt="not found"
                width={74}
                height={64}
              />
              <h3 className="mt-4 text-lg font-semibold tracking-tight md:text-xl">
                Your reading list is empty
              </h3>
              <p className="text-xs text-muted-foreground sm:text-sm">
                You can add books to wishlist from book details page.
              </p>
              <Button size="sm" asChild className="mt-4 font-semibold">
                <Link href={"/all-books"}>Browse books</Link>
              </Button>
            </div>
          </section>
        </>
      )}
      {/* <CardFooter>
        <div className="text-xs text-muted-foreground">
          Showing <strong>1-10</strong> of <strong>32</strong> products
        </div>
      </CardFooter> */}
    </Card>
  );
};

export default WishlistPage;
