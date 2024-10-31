import { useCart } from "@/app/context/CartContext";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { CircleXIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FaCircle, FaCircleArrowRight } from "react-icons/fa6";
import { Button } from "./ui/button";
import { Table, TableBody, TableCell, TableRow } from "./ui/table";

const ProductCart = ({ isOpen, onClose }) => {
  const { cart, removeFromCart, updateQuantity } = useCart();

  const totalPrice = cart.reduce(
    (total, book) => total + book.price * book.quantity,
    0
  );

  const handleRemove = (id) => {
    removeFromCart(id);
  };

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity > 0) {
      updateQuantity(id, newQuantity);
    }
  };

  return (
    <div>
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent className="w-[350px] sm:w-[400px]">
          <div className="border-b border-primary">
            <SheetTitle className="w-fit rounded-t-sm bg-primary px-2 py-1 text-lg font-semibold">
              Your Cart
            </SheetTitle>
          </div>
          <div className="max-h-[70vh] max-w-fit overflow-y-auto overflow-x-hidden">
            <Table>
              {/* Table content */}
              <TableBody>
                {cart?.map((book, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Link
                        href={`/view-details/${book.id}`}
                        className="flex items-start gap-2 pl-4 font-medium"
                        key={index}
                      >
                        <Image
                          alt="Product image"
                          className="rounded-md border object-contain shadow-md"
                          height="64"
                          src={book.coverImage}
                          width="44"
                        />
                        <div className="space-y-1">
                          <p className="max-w-20 truncate text-foreground">
                            {book.name}
                          </p>
                          <p className="text-xs text-gray-500">{book.author}</p>
                          <div>
                            <p className="text-[.5rem]">
                              ${book.price}/per item
                            </p>
                          </div>
                        </div>
                      </Link>
                    </TableCell>
                    <TableCell className="flex flex-col items-center justify-center gap-1">
                      <p className="font-semibold text-red-600">
                        ${(book.price * book.quantity).toFixed(2)}
                      </p>
                      <div className="flex w-16 items-center rounded-sm bg-primary/20 px-1 py-0.5">
                        <Button
                          className="h-5 w-5 rounded bg-secondary p-0 text-lg"
                          onClick={() =>
                            handleQuantityChange(book.id, book.quantity - 1)
                          }
                        >
                          -
                        </Button>
                        <p className="flex h-5 w-5 items-center justify-center rounded p-0 text-xs">
                          {book.quantity}
                        </p>
                        <Button
                          className="h-5 w-5 rounded bg-secondary p-0 text-lg"
                          onClick={() =>
                            handleQuantityChange(book.id, book.quantity + 1)
                          }
                        >
                          +
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell></TableCell>

                    <TableCell>
                      <Button
                        onClick={() => handleRemove(book.id)}
                        size="icon"
                        variant="ghost"
                      >
                        <CircleXIcon className="size-5 text-mediumGray-500 hover:text-destructive" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          {/* Total Price */}
          {cart.length > 0 && (
            <div className="mt-4 flex justify-between rounded-sm border-t border-primary bg-primary-foreground/20 px-4 py-2">
              <h3 className="text-lg font-semibold">Total Price:</h3>
              <h3 className="pr-6 text-lg font-semibold">
                ${totalPrice.toFixed(2)}
              </h3>
            </div>
          )}
          {/* Checkout and Details Button */}
          <div className="mt-4 flex justify-between gap-4">
            <Button
              asChild
              className="flex w-full gap-2 bg-primary-foreground text-white hover:bg-primary-foreground/90"
            >
              <Link onClick={onClose} href={"/cart"}>
                <FaCircle />
                Cart Details
              </Link>
            </Button>
            <Button asChild className="flex w-full gap-2 bg-primary">
              <Link onClick={onClose} href={"/checkout"}>
                Checkout
                <FaCircleArrowRight />
              </Link>
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default ProductCart;
