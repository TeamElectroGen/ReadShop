"use client";
import CircleLoading from "@/components/CircleLoading";
import DashboardHeading from "@/components/DashboardHeading";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getPublisherBooks } from "@/services/publisherRelated";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

const Books = () => {
  const { data: session } = useSession();

  const {
    data: books,
    isLoading,
    isPending,
  } = useQuery({
    queryKey: ["publisher-books"],
    queryFn: async () => {
      const { books } = await getPublisherBooks(session?.user?.email);
      return books;
    },
    enabled: !!session?.user?.email,
  });

  return (
    <section className="flex h-full flex-1 flex-col gap-4 lg:gap-6">
      <DashboardHeading heading="Published books" />
      {isLoading || isPending ? (
        <CircleLoading />
      ) : books ? (
        <>
          <div className="w-full self-start rounded-lg border bg-background shadow-sm md:flex-1">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="hidden py-3 pl-5 sm:table-cell">
                    Book
                  </TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Rating</TableHead>
                  {/* <TableHead>
                    <span className="sr-only">Actions</span>
                  </TableHead> */}
                </TableRow>
              </TableHeader>
              {/* Table content */}
              <TableBody>
                {books?.map((book, index) => (
                  <TableRow key={index}>
                    <TableCell className="flex items-start gap-2 pl-5 font-medium">
                      <div className="space-y-1">
                        <p className="text-foreground">{book.BookName}</p>
                        <p className="text-xs text-gray-500">
                          {book.AuthorName}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell className="font-xs font-semibold text-red-600">
                      ${book.Price}
                    </TableCell>
                    <TableCell className="text-xs sm:text-sm">
                      {book.rating || 0}
                    </TableCell>
                    {/* TODO: make the delete and edit functional */}
                    {/* <TableCell>
                      <div className="flex gap-3">
                        <Button size="icon" variant="outline">
                          <Trash2 className="size-4 text-destructive" />
                        </Button>
                        <Button size="icon" variant="outline">
                          <EditIcon className="size-4" />
                        </Button>
                      </div>
                    </TableCell> */}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </>
      ) : (
        <>
          {/* No book found */}
          <div
            className="flex flex-1 items-center justify-center rounded-lg border border-dashed bg-background shadow-sm"
            x-chunk="dashboard-02-chunk-1"
          >
            <div className="flex flex-col items-center gap-1 text-center">
              <h3 className="text-2xl font-bold tracking-tight">
                You have no books
              </h3>
              <p className="text-sm text-muted-foreground">
                You can start selling as soon as you add a book.
              </p>
              <Button className="mt-4">Add Book</Button>
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default Books;
