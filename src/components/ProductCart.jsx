import { useCart } from "@/app/context/CartContext";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import Image from "next/image";
import Link from "next/link";
import { FaCircle, FaCircleArrowRight } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import { Button } from "./ui/button";

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

  // const logCartProductIds = () => {
  //   const productIds = cart.map((book) => book.id);
  //   console.log("Cart Product IDs:", productIds);
  // };

  return (
    <div>
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent className="scroll w-[400px]">
          <div className="border-b border-primary">
            <SheetTitle className="w-fit rounded-t-sm bg-primary px-2 py-1 text-lg font-semibold">
              Your Cart
            </SheetTitle>
          </div>

          {/* Cart Item */}
          {cart.length > 0 ? (
            <ul className="mt-4 flex flex-col gap-2">
              {cart.map((book) => (
                <li
                  key={book.id}
                  className="flex min-h-20 items-center justify-between gap-3 rounded-sm border-b border-primary bg-primary/10 p-2"
                >
                  <div className="flex w-full gap-2">
                    <div className="min-h-14">
                      <Image
                        className="max-h-14 min-h-14 min-w-10 max-w-10 bg-primary object-cover"
                        src={book?.coverImage}
                        width={50}
                        height={100}
                        alt={book.name}
                      ></Image>
                    </div>
                    <div>
                      <h3 className="text-xs font-bold">{book.name}</h3>
                      <p className="text-[0.5rem]">By: {book.author}</p>
                      <p className="text-[.5rem] font-semibold text-primary-foreground">
                        ${book.price}/item
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center rounded-sm bg-primary/20 px-1 py-0.5">
                    <Button
                      className="h-5 w-5 rounded bg-secondary p-0 text-lg"
                      onClick={() =>
                        handleQuantityChange(book.id, book.quantity - 1)
                      }
                    >
                      -
                    </Button>
                    <p className="flex h-5 w-5 items-center justify-center rounded p-0 text-lg">
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
                  <div className="flex flex-col items-end">
                    <p className="text-sm font-bold">
                      ${(book.price * book.quantity).toFixed(2)}
                    </p>
                  </div>
                  <button
                    onClick={() => handleRemove(book.id)}
                    className="h-fit w-fit rounded-sm p-1 hover:underline"
                  >
                    <MdDelete />
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="flex h-40 items-center justify-center">
              Your cart is currently empty.
            </p>
          )}

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
              <Link href={"/cart"}>
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
