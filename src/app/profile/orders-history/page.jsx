"use client";
import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
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
import { getOrderHistoryOfUser } from "@/services/payment";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
// import { MdDetails } from "react-icons/md";

const Page = () => {
  const { data: session } = useSession() || {};

  const { data: ordersHistory } = useQuery({
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
              <TableRow key={order._id}>
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
      <CardFooter>
        <div className="text-xs text-muted-foreground">
          Showing <strong>1-10</strong> of <strong>32</strong> products
        </div>
      </CardFooter>
    </Card>
  );
};

export default Page;
