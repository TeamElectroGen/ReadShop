"use client";
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
import { getAllOrders } from "@/services/payment";
import { useQuery } from "@tanstack/react-query";

const ManageOrders = () => {
  // fetch all orders history
  const { data: orders, isLoading } = useQuery({
    queryKey: ["all-orders"],
    queryFn: async () => {
      const { orders } = await getAllOrders();
      return orders;
    },
  });

  //   console.log(orders);

  if (isLoading) {
    return (
      <p className="mt-16 text-center text-lg font-medium text-mediumGray-500">
        Loading...
      </p>
    );
  }

  return (
    <section className="flex h-full flex-1 flex-col gap-4 lg:gap-6">
      <DashboardHeading heading="Manage Orders" />
      {orders ? (
        <>
          <div className="w-full self-start rounded-lg border bg-background shadow-sm">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="hidden py-3 pl-5 sm:table-cell">
                    Order ID
                  </TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>
                    <span className="sr-only">Actions</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders?.map((order) => (
                  <TableRow key={order._id}>
                    <TableCell className="pl-5 font-medium">
                      #{order.txnId}
                    </TableCell>
                    <TableCell className="flex items-center gap-2 font-medium">
                      {new Date(order.payTime).toLocaleString()}
                    </TableCell>
                    <TableCell className="font-xs font-semibold text-red-600">
                      ${order.totalPrice}
                    </TableCell>
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
            <div className="px-5 py-4 text-xs text-muted-foreground">
              Showing <strong>{orders?.length}</strong> of{" "}
              <strong>{orders.length}</strong> products
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

export default ManageOrders;
