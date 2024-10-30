"use client";
import CircleLoading from "@/components/CircleLoading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
// import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getOrderHistoryOfUser } from "@/services/payment";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
// import { MdDetails } from "react-icons/md";

const Page = () => {
  const { data: session } = useSession() || {};

  const { data: ordersHistory = [], isLoading } = useQuery({
    queryKey: ["user-orders"],
    queryFn: async () => {
      const { orders } = await getOrderHistoryOfUser(session?.user?.email);
      return orders;
    },
    enabled: !!session?.user?.email,
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your orders history</CardTitle>
      </CardHeader>
      {isLoading ? (
        <CircleLoading />
      ) : ordersHistory.length > 0 ? (
        <CardContent className="mx-6 mb-6 rounded-lg border p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="hidden sm:table-cell">Order ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
                {/* <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead> */}
              </TableRow>
            </TableHeader>
            <TableBody>
              {ordersHistory?.map((order) => (
                <TableRow key={order._id} className="text-nowrap">
                  <TableCell className="hidden sm:table-cell">
                    #{order.txnId}
                  </TableCell>
                  <TableCell className="flex items-center gap-2 font-medium">
                    {new Date(order.payTime).toLocaleString()}
                  </TableCell>
                  <TableCell>{order.totalPrice} $</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className="bg-green-50 text-green-600"
                    >
                      {order?.status}
                    </Badge>
                  </TableCell>
                  {/* <TableCell>
                  <Button size="sm">
                    <MdDetails className="mr-2 size-5" /> Details
                  </Button>
                </TableCell> */}
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
                Your order history is empty
              </h3>
              <p className="text-xs text-muted-foreground sm:text-sm">
                If you want to buy books, please click the button below
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

export default Page;
