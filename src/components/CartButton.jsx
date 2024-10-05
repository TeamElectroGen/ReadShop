import React from 'react';
import { Button } from "./ui/button";
import { FaCartShopping } from "react-icons/fa6";
import { useCart } from "@/app/context/CartContext";

const CartButton = ({ onClick }) => {
  const { cart } = useCart();

  return (
    <Button
      variant="ghost"
      size="icon"
      className="relative"
      onClick={onClick}
    >
      <FaCartShopping className="size-7" />
      {cart.length > 0 && (
        <span className="absolute right-0 top-0 size-4 rounded-sm bg-primary text-xs font-bold text-black">
          {cart.length}
        </span>
      )}
    </Button>
  );
};

export default CartButton;
