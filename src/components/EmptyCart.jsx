import React from "react";
import Lottie from "lottie-react";
import emptyCartAnimation from "../../public/emptyCart";
import { Button } from "./ui/button";

const EmptyCart = () => {
  return (
    <div className="flex min-h-96 items-center justify-center rounded-lg border border-dashed bg-background shadow-sm">
      <div className="flex flex-col items-center gap-1 text-center">
        <Lottie className="size-44" animationData={emptyCartAnimation} loop={true} />
        <h3 className="text-xl -mt-5 font-bold tracking-tight">
          Your cart is currently empty
        </h3>
        <p className="text-sm text-muted-foreground">
          You can start selling as soon as you add a product.
        </p>
        <Button className="mt-4 font-semibold">Browser books</Button>
      </div>
    </div>
  );
};

export default EmptyCart;
