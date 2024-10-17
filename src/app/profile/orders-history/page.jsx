"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { getReadListBooks } from "@/services/getBooksData";
import { MdDetails } from "react-icons/md";

const OrdersHistory = () => {
//   const [readListBooks, setReadListBooks] = useState([]);
//   const { data: session } = useSession();

//   useEffect(() => {
//     if (session?.user.email) {
//       const fetchReadList = async () => {
//         const res = await getReadListBooks(session?.user.email);
//         setReadListBooks(res.books);
//       };
//       fetchReadList();
//     }
//   }, [session?.user.email]);

//   console.log(readListBooks);
  const ordersHistory = [
    {
      _id: "3435",
       date: "October 8, 2024",
       total: 30.99,
       status: "Delivered"
    },
    {
        _id: "3495",
       date: "October 9, 2025",
       total: 20.99,
       status: "Processing"
    }]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your orders history</CardTitle>
      </CardHeader>
      <CardContent className="mx-6 mb-6 rounded-lg border p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="hidden sm:table-cell">
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
            {ordersHistory?.map((order) => (
              <TableRow key={order._id}>
                <TableCell className="hidden sm:table-cell">
                  #{order._id}.
                </TableCell>
                <TableCell className="flex items-center gap-2 font-medium">
                  {order?.date}
                </TableCell>
                <TableCell>{order.total}</TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className="bg-green-50 text-green-600"
                  >
                    {order?.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Button size="sm">
                    <MdDetails className="mr-2 size-5" /> Details
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

export default OrdersHistory;
