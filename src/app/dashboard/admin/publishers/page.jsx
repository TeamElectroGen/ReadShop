"use client";
import { Button } from "@/components/ui/button";
// import { useQuery } from "@tanstack/react-query";
import DashboardHeading from "@/components/DashboardHeading";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CircleXIcon } from "lucide-react";
import Image from "next/image";

const Publishers = () => {
  // fetch all publishers
  //   const { data: publishers, isLoading } = useQuery({
  //     queryKey: ["publishers"],
  //     queryFn: async () => {
  //       const { publishers } = await getPublishers();
  //       return publishers;
  //     },
  //   });
  //   console.log(publishers);

  //   if (isLoading) {
  //     return (
  //       <p className="mt-16 text-center text-lg font-medium text-mediumGray-500">
  //         Loading...
  //       </p>
  //     );
  //   }
  const publishers = [
    { _id: 1, name: "Bookworm Publishing", email: "bookworm@gmail.com" },
    { _id: 2, name: "Sukun Publication", email: "sukun@gmail.com" },
  ];

  return (
    <section className="flex h-full flex-1 flex-col gap-4 lg:gap-6">
      <DashboardHeading heading="Manage Publishers" />
      {publishers ? (
        <>
          <div className="w-full self-start rounded-lg border bg-background shadow-sm">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="py-3 pl-5">Name</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>
                    <span className="sr-only">Actions</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {publishers?.map((publisher) => (
                  <TableRow key={publisher._id} className="">
                    <TableCell className="flex items-center gap-2 pl-4 font-medium">
                      <Image
                        alt="Product image"
                        className="rounded-full border object-contain shadow-md"
                        src={publisher?.image || "/assets/profile.png"}
                        width={40}
                        height={40}
                      />
                      <p className="h-full text-foreground">{publisher.name}</p>
                    </TableCell>
                    <TableCell className="">
                      <Badge
                        variant="outline"
                        className="bg-green-50 text-green-600"
                      >
                        {publisher?.isActive ? "active" : "offline"}
                      </Badge>
                    </TableCell>
                    <TableCell>{publisher?.email}</TableCell>
                    <TableCell>
                      <Button size="icon" variant="ghost">
                        <CircleXIcon className="text-destructive" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="px-5 py-4 text-xs text-muted-foreground">
              Showing <strong>{publishers?.length}</strong> of{" "}
              <strong>{publishers.length}</strong> products
            </div>
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

export default Publishers;
