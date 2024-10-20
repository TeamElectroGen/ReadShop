"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
import { getReadListBooks } from "@/services/getBooksData";
import { Trash2 } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";

const ReadingList = () => {
  const [readListBooks, setReadListBooks] = useState([]);
  const { data: session } = useSession() || {};

  useEffect(() => {
    if (session?.user.email) {
      const fetchReadList = async () => {
        const res = await getReadListBooks(session?.user.email);
        setReadListBooks(res.books);
      };
      fetchReadList();
    }
  }, [session?.user.email]);

  console.log(readListBooks);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Reading List</CardTitle>
        <CardDescription>Manage your reading list.</CardDescription>
      </CardHeader>
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
          <TableBody>
            {readListBooks?.map((book, idx) => (
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
                    <p className="font-medium text-foreground">
                      {book.BookName}
                    </p>
                    <p className="text-xs text-gray-500">{book.AuthorName}</p>
                  </div>
                </TableCell>
                <TableCell>${book.Price}</TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className="bg-green-50 text-green-600"
                  >
                    In stock
                  </Badge>
                </TableCell>
                <TableCell>
                  <Button size="icon" variant="outline">
                    <Trash2 className="size-5 text-destructive" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        <div className="text-xs text-muted-foreground">
          Showing <strong>1-10</strong> of <strong>32</strong> products
        </div>
      </CardFooter>
    </Card>
  );
};

export default ReadingList;
