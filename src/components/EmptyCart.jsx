import React from "react";
import Lottie from "lottie-react";
import emptyCartAnimation from "../../public/emptyCart";
import { Button } from "./ui/button";
import Link from "next/link";

const EmptyCart = ({title="", desc=""}) => {
  return (
    <div className="flex min-h-96 items-center justify-center rounded-lg border border-dashed bg-background shadow-sm">
      <div className="flex flex-col items-center gap-1 text-center">
        <Lottie
          className="size-44"
          animationData={emptyCartAnimation}
          loop={true}
        />
        <h3 className="-mt-7 text-xl font-bold tracking-tight">
          {title}
        </h3>
        <p className="text-sm text-muted-foreground">
          {desc}
        </p>
        <Button asChild className="mt-4 font-semibold">
          <Link href={"/"}>Browser books</Link>
        </Button>
      </div>
    </div>
  );
};

export default EmptyCart;
