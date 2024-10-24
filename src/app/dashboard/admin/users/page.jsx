"use client";
import CircleLoading from "@/components/CircleLoading";
import DashboardHeading from "@/components/DashboardHeading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getUsers } from "@/services/getUserData";
import { useQuery } from "@tanstack/react-query";
import { CircleXIcon } from "lucide-react";
import Image from "next/image";

const Users = () => {
  // fetch all users
  const { data: users, isLoading } = useQuery({
    queryKey: ["all-users"],
    queryFn: async () => {
      const { users } = await getUsers();
      return users;
    },
  });

  if (isLoading) {
    return (
      <p className="mt-16">
        <CircleLoading />
      </p>
    );
  }

  return (
    <section className="flex h-full flex-1 flex-col gap-4 lg:gap-6">
      <DashboardHeading heading="Manage Users" />
      {users ? (
        <>
          <div className="w-full self-start rounded-lg border bg-background shadow-sm">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="py-3 pl-5">Name</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>
                    <span className="sr-only">Actions</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users?.map((user) => (
                  <TableRow key={user._id} className="">
                    <TableCell className="flex items-center gap-2 pl-4 font-medium">
                      <Image
                        alt="Product image"
                        className="rounded-full border object-contain shadow-md"
                        src={user?.image || "/assets/profile.png"}
                        width={40}
                        height={40}
                      />
                      <p className="h-full text-foreground">{user.name}</p>
                    </TableCell>
                    <TableCell className="">
                      <Badge
                        variant="outline"
                        className="bg-green-50 text-green-600"
                      >
                        {user?.isActive ? "active" : "offline"}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-xs font-medium">
                      {user?.role}
                    </TableCell>
                    <TableCell>{user?.email}</TableCell>
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
              Showing <strong>{users?.length}</strong> of{" "}
              <strong>{users.length}</strong> products
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

export default Users;
