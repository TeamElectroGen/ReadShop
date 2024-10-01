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

const ReadingList = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Reading List</CardTitle>
        <CardDescription>
          Manage your reading list.
        </CardDescription>
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
            <TableRow>
              <TableCell className="hidden sm:table-cell">1.</TableCell>
              <TableCell className="flex items-center gap-2 font-medium">
                <Image
                  alt="Product image"
                  className="aspect-square rounded-md border object-cover"
                  height="64"
                  src="/placeholder.svg"
                  width="64"
                />
                <p>The Alchemist</p>
              </TableCell>
              <TableCell>$499.99</TableCell>
              <TableCell>
                <Badge variant="outline" className="bg-green-50 text-green-600">
                  In stock
                </Badge>
              </TableCell>
              <TableCell>
                <Button size="icon" variant="outline">
                  <Trash2 className="size-5 text-destructive" />
                </Button>
              </TableCell>
            </TableRow>
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
